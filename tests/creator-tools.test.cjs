const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
function load(path, mocks = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loaded = new Module(path);
  loaded.require = (id) => { if (id in mocks) return mocks[id]; throw new Error(`Unexpected import ${id}`); };
  loaded._compile(compiled, path + '.cjs'); return loaded.exports;
}
const { calculateCreator: calc, calculatorDefinitions: defs, formatCalculatorMetric: format } = load('lib/creator-calculators.ts');
const { analyzeTitle } = load('lib/title-analysis.ts');
const { checkShortsGuide, starterMargins, starterBox, exportShortsGuide } = load('lib/shorts-guide.ts', { './image-compression': { decodeImage: async () => { throw new Error('Decode should not be reached'); } } });
const values = (result) => result.metrics.map((m) => m.value);

test('revenue uses creator RPM directly without another platform deduction', () => {
  assert.deepEqual(values(calc('revenue', { views:'150000', low:'2', high:'5' })), [300,750,3600,9000]);
  assert.deepEqual(values(calc('revenue', { views:'0', low:'0', high:'0' })), [0,0,0,0]);
  assert.throws(() => calc('revenue', { views:'100', low:'5', high:'2' }), /Lower RPM/);
});
test('RPM uses same-period revenue and views and rejects zero denominator', () => {
  assert.equal(values(calc('rpm', {revenue:'1850',views:'420000'}))[0], 1850 / 420000 * 1000);
  assert.equal(values(calc('rpm', {revenue:'0',views:'100'}))[0], 0);
  assert.throws(() => calc('rpm', {revenue:'1',views:'0'}), /Views/);
});
test('watch hours handles pace, zero growth, reached goal, and rounded-up views', () => {
  const input = {current:'1820',goal:'4000',monthly:'340',duration:'4.5'};
  const result = values(calc('watch-hours', input));
  assert.equal(result[0], 2180); assert.equal(result[1], 45.5); assert.equal(result[2], 2180 / 340); assert.equal(result[3], 29067);
  assert.equal(values(calc('watch-hours', {...input,monthly:'0'}))[2], null);
  assert.deepEqual(values(calc('watch-hours', {...input,current:'5000',monthly:'0'})), [0,100,0,0]);
  assert.throws(() => calc('watch-hours', {...input,duration:'0'}), /duration/);
});
test('income includes every stream and subtracts costs exactly once', () => {
  assert.deepEqual(values(calc('monetization', defs.monetization.example)), [3150,2650,600,2200,350,0,500,31800]);
  const result = calc('monetization', {...defs.monetization.example,costs:'4000'});
  assert.equal(result.metrics[1].value, -850); assert.equal(result.metrics[7].value, -10200); assert.match(result.explanation, /loss/);
});
test('calculators reject blanks, negatives, nonfinite, excessive, fractional counts', () => {
  for (const kind of Object.keys(defs)) {
    for (const field of defs[kind].fields) {
      for (const invalid of ['', ' ', '-1', 'Infinity', 'NaN', '1000000000001']) {
        assert.throws(() => calc(kind,{...defs[kind].example,[field.key]:invalid}));
      }
      if (field.integer) assert.throws(() => calc(kind,{...defs[kind].example,[field.key]:'1.5'}));
    }
  }
});
test('small positive timelines are not displayed as zero and negative income stays negative', () => {
  assert.equal(format({value:.01,unit:'months'}), '<0.1 months');
  assert.equal(format({value:null,unit:'months'}), 'No progress');
  assert.equal(format({value:-850,unit:'money'}), '-$850.00');
});
test('title limits include whitespace and use conservative UTF-16 units', () => {
  assert.equal(analyzeTitle('x'.repeat(100)).withinLimit,true);
  assert.equal(analyzeTitle('x'.repeat(101)).withinLimit,false);
  assert.equal(analyzeTitle('😀').length,2);
  assert.throws(() => analyzeTitle('   '), /Enter a title/);
  assert.throws(() => analyzeTitle('x'.repeat(2001)), /2,000/);
});
test('title heuristics report actual issues and case-insensitive exact phrases', () => {
  const result = analyzeTitle('  HELLO  WORLD!! ', 'world');
  assert.ok(result.notes.some(n=>n.includes('whitespace'))); assert.ok(result.notes.some(n=>n.includes('punctuation'))); assert.ok(result.notes.some(n=>n.includes('uppercase'))); assert.ok(result.notes.some(n=>n.includes('character unit 10')));
  assert.ok(analyzeTitle('A calm title','absent').notes.some(n=>n.includes('not found')));
  assert.equal(analyzeTitle('A calm title').notes.length,1);
});
test('Shorts guide checks the marked rectangle, including all sides and exact boundary', () => {
  assert.equal(checkShortsGuide(starterMargins,starterBox).overlaps.length,0);
  assert.deepEqual(checkShortsGuide(starterMargins,{x:0,y:0,width:100,height:100}).overlaps,['left','top','right','bottom']);
  const center = checkShortsGuide(starterMargins).center;
  assert.deepEqual(checkShortsGuide(starterMargins,{...center}).overlaps,[]);
  assert.deepEqual(center,{x:5,y:10,width:77,height:65});
});
test('Shorts guide rejects collapsed margins and off-canvas rectangles', () => {
  assert.throws(()=>checkShortsGuide({...starterMargins,left:90}), /Margins/);
  assert.throws(()=>checkShortsGuide({...starterMargins,top:NaN}), /Margins/);
  assert.throws(()=>checkShortsGuide(starterMargins,{x:90,y:0,width:20,height:30}), /within/);
  assert.throws(()=>checkShortsGuide(starterMargins,{x:0,y:0,width:0,height:30}), /within/);
});
test('Shorts export cancellation occurs before decode', async () => {
  const abort = new AbortController(); abort.abort();
  await assert.rejects(exportShortsGuide(new File(['x'],'frame.png'),starterMargins,undefined,abort.signal),{name:'AbortError'});
});
