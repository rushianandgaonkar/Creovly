const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const compiled = ts.transpileModule(fs.readFileSync('config/artwork-presets.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = new Module('artwork-presets'); loaded._compile(compiled, 'artwork-presets.cjs');
const { artworkPresets, artworkGuide, artworkWarnings } = loaded.exports;

test('creator presets preserve existing sizes and select suitable export defaults', () => {
  for (const [id, w, h] of [['thumbnail',1280,720],['full-hd',1920,1080],['4k',3840,2160],['shorts',1080,1920],['banner',2560,1440],['profile',800,800],['watermark',150,150]]) {
    const p = artworkPresets.find(p => p.id === id); assert.equal(p.width,w); assert.equal(p.height,h);
  }
  const watermark = artworkPresets.find(p => p.id === 'watermark');
  assert.equal(watermark.format,'image/png'); assert.equal(watermark.fit,'contain'); assert.equal(watermark.background,'transparent');
  assert.equal(new Set(artworkPresets.map(p=>p.id)).size, artworkPresets.length);
});
test('banner guide scales official minimum-canvas area and stays centered at recommended size', () => {
  const g = artworkGuide('banner');
  assert.equal(g.shape,'rectangle');
  assert.equal(g.width,1235/2048*100); assert.equal(g.height,338/1152*100);
  assert.equal(g.left,(100-g.width)/2); assert.equal(g.top,(100-g.height)/2);
  assert.ok(Math.abs(2560*g.width/100-1543.75)<.001);
  assert.equal(artworkGuide('profile').shape,'circle');
  assert.equal(artworkGuide('thumbnail'),undefined); assert.equal(artworkGuide('custom'),undefined);
});
test('output advisories use actual size/format and platform boundary rules', () => {
  assert.equal(artworkWarnings('banner',6_000_000,'image/png').length,0);
  assert.match(artworkWarnings('banner',6_000_001,'image/jpeg').join(' '),/6 MB/);
  assert.equal(artworkWarnings('watermark',999_999,'image/png').length,0);
  assert.match(artworkWarnings('watermark',1_000_000,'image/png').join(' '),/1 MB/);
  for (const id of ['banner','profile','watermark']) assert.match(artworkWarnings(id,100,'image/webp').join(' '),/JPEG or PNG/);
  assert.deepEqual(artworkWarnings('custom',20_000_000,'image/webp'),[]);
});
