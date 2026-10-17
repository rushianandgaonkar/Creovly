const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
function load(path, mocks = {}) {
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const loaded = new Module(path);
  loaded.require = id => { if (id in mocks) return mocks[id]; throw new Error(`Unexpected import ${id}`); };
  loaded._compile(code, path + '.cjs'); return loaded.exports;
}
const titles = load('lib/title-analysis.ts');
const shorts = load('lib/shorts-guide.ts', { './image-compression': {} });
const { emptyStudioDraft, parseStudioDraft, studioChecks, studioConfirmations, studioReport } = load('lib/studio.ts', { './title-analysis': titles, './shorts-guide': shorts });
const { createStudioZip } = load('lib/studio-zip.ts');
const asset = { width: 1280, height: 720, bytes: 150000, format: 'image/jpeg', name: 'my-image.jpg' };
const complete = () => ({ ...emptyStudioDraft(), title: 'A useful title', description: 'An accurate description.', confirmations: Object.fromEntries(studioConfirmations.map(item => [item.id, true])) });

test('Studio starts with no fabricated passes and distinguishes user confirmations', () => {
  assert.equal(studioChecks(emptyStudioDraft()).filter(check => check.passed).length, 0);
  const report = studioReport(complete(), asset);
  assert.equal(report.completed, report.total);
  assert.equal(report.checks.filter(check => check.source === 'manual').length, 5);
  assert.match(report.limitations, /not a prediction/);
});
test('Studio title, description, file targets, and framing track actual input', () => {
  const draft = complete();
  const failed = (d, a = asset) => studioChecks(d, a).filter(check => !check.passed).map(check => check.id);
  assert.deepEqual(failed({ ...draft, title: 'x'.repeat(101) }), ['title']);
  assert.deepEqual(failed({ ...draft, title: '<A title>' }), ['title']);
  assert.deepEqual(failed({ ...draft, description: 'x'.repeat(5001) }), ['description-length']);
  assert.deepEqual(failed({ ...draft, description: '' }), ['description-length']);
  assert.deepEqual(failed(draft, { ...asset, bytes: 2000001 }), ['image-size']);
  assert.deepEqual(failed({ ...draft, uploadDevice: 'desktop' }, { ...asset, bytes: 2000001 }), []);
  assert.deepEqual(failed(draft, { ...asset, width: 600, height: 338 }), ['framing']);
  assert.deepEqual(failed(draft, { ...asset, format: 'image/webp' }), ['image-format']);
});
test('Studio Shorts reports overlapping or invalid planning boxes', () => {
  const draft = { ...complete(), kind: 'shorts' }; const frame = { ...asset, width: 1080, height: 1920 };
  assert.ok(studioChecks(draft, frame).every(check => check.passed));
  const outside = { ...draft, box: { x: 0, y: 0, width: 100, height: 100 } };
  assert.equal(studioChecks(outside, frame).find(check => check.id === 'guide').passed, false);
  assert.match(studioChecks({ ...draft, box: { ...draft.box, x: 99 } }, frame).find(check => check.id === 'guide').detail, /within/);
});
test('saved Studio drafts validate settings and reset confirmations', () => {
  const parsed = parseStudioDraft(JSON.stringify({ ...complete(), extra: 'ignored' }));
  assert.equal(parsed.title, 'A useful title');
  assert.deepEqual(parsed.confirmations, {});
  assert.equal('extra' in parsed, false);
  for (const bad of [null, {}, { ...complete(), version: 2 }, { ...complete(), kind: 'unknown' }, { ...complete(), title: 42 }, { ...complete(), description: 'x'.repeat(10001) }, { ...complete(), margins: { top: '10' } }, { ...complete(), box: { x: 99, y: 0, width: 10, height: 10 } }]) assert.throws(() => parseStudioDraft(JSON.stringify(bad)));
});
test('Studio ZIP uses valid CRC, offsets, sizes, and file payloads', async () => {
  const blob = await createStudioZip([{ name: 'metadata.txt', blob: new Blob(['123456789']) }, { name: 'project.json', blob: new Blob(['{"title":"🎥"}']) }]);
  assert.equal(blob.type, 'application/zip');
  const buffer = Buffer.from(await blob.arrayBuffer());
  assert.equal(buffer.readUInt32LE(0), 0x04034b50);
  assert.equal(buffer.readUInt32LE(14), 0xcbf43926);
  assert.equal(buffer.readUInt32LE(18), 9);
  assert.equal(buffer.subarray(30, 42).toString(), 'metadata.txt');
  assert.equal(buffer.subarray(42, 51).toString(), '123456789');
  const end = buffer.length - 22;
  assert.equal(buffer.readUInt32LE(end), 0x06054b50);
  assert.equal(buffer.readUInt16LE(end + 10), 2);
  const directory = buffer.readUInt32LE(end + 16);
  assert.equal(buffer.readUInt32LE(directory), 0x02014b50);
  assert.equal(buffer.readUInt32LE(directory + 42), 0);
  assert.equal(buffer.readUInt32LE(directory + 58 + 42), 51);
  assert.equal(directory + buffer.readUInt32LE(end + 12), end);
});
test('Studio ZIP rejects traversal, duplicate names, empty and oversized packages', async () => {
  for (const files of [[], [{ name: '../file', blob: new Blob(['x']) }], [{ name: 'x', blob: new Blob() }, { name: 'x', blob: new Blob() }], [{ name: 'big', blob: { size: 64000001 } }]]) await assert.rejects(createStudioZip(files));
});
