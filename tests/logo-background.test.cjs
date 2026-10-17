const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const code = ts.transpileModule(fs.readFileSync('lib/logo-background.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = new Module('logo-background');
loaded.require = () => ({ decodeImage: async () => { throw new Error('Decode should not be reached'); } });
loaded._compile(code, 'logo-background.cjs');
const { eraseLogoBackground, validateLogoSize, removeLogoBackground } = loaded.exports;
function image(rows) {
  const colors = { w: [255,255,255,255], b: [0,0,0,255], g: [240,240,240,255], t: [255,255,255,0], s: [0,0,0,128] };
  return new Uint8ClampedArray(rows.join('').split('').flatMap((v) => colors[v]));
}
test('removes border-connected background while preserving enclosed white and foreground alpha', async () => {
  const pixels = image(['wwwww', 'wbbbw', 'wbwbw', 'wbsbw', 'wwwww']);
  const original = pixels.slice();
  assert.equal(await eraseLogoBackground(pixels, 5, 5, '#ffffff', 0), 16);
  assert.equal(pixels[(2*5+2)*4+3], 255);
  assert.equal(pixels[(3*5+2)*4+3], 128);
  for (let i=0; i<pixels.length; i++) if (i%4!==3) assert.equal(pixels[i],original[i]);
});
test('tolerance, border row boundaries, transparent routes and no matching color behave correctly', async () => {
  const low = image(['ggg','gbg','ggg']);
  assert.equal(await eraseLogoBackground(low,3,3,'#ffffff',5),0);
  assert.equal(await eraseLogoBackground(low,3,3,'#ffffff',6),8);
  const transparent = image(['ttt','twt','ttt']);
  assert.equal(await eraseLogoBackground(transparent,3,3,'#ffffff',0),1);
  const all = image(['ww','ww']);
  assert.equal(await eraseLogoBackground(all,2,2,'#ffffff',0),4);
  const black = image(['bbb','bwb','bbb']);
  assert.equal(await eraseLogoBackground(black,3,3,'#ffffff',100),9);
});
test('rejects invalid sizes, settings and cancellation', async () => {
  for (const dimensions of [[0,2],[8193,1],[4000,3000],[1.5,2],[NaN,1]]) assert.throws(()=>validateLogoSize(...dimensions));
  for (const [color,tolerance] of [['white',12],['#fff',12],['#ffffff',-1],['#ffffff',101],['#ffffff',NaN]]) await assert.rejects(eraseLogoBackground(image(['w']),1,1,color,tolerance));
  await assert.rejects(eraseLogoBackground(new Uint8ClampedArray(3),1,1,'#ffffff',12));
  const controller = new AbortController(); controller.abort();
  await assert.rejects(removeLogoBackground(new File(['x'],'x.png'),'#ffffff',12,controller.signal), {name:'AbortError'});
  await assert.rejects(eraseLogoBackground(image(['w']),1,1,'#ffffff',12,controller.signal), {name:'AbortError'});
});
