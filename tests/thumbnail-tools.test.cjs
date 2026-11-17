const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');

function load(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = new Module(file);
  mod._compile(compiled, `${file}.cjs`);
  return mod.exports;
}

const thumbs = load('lib/youtube-thumbnails.ts');

test('thumbnail sizes run largest first and build i.ytimg.com URLs', () => {
  assert.deepEqual(thumbs.THUMBNAIL_SIZES.map((size) => size.key), ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default']);
  assert.equal(thumbs.thumbnailUrl('dQw4w9WgXcQ', 'maxresdefault'), 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg');
  assert.equal(thumbs.thumbnailFileName('dQw4w9WgXcQ', 'hqdefault'), 'youtube-thumbnail-dQw4w9WgXcQ-hqdefault.jpg');
});

test('the 120 × 90 placeholder marks a missing size, except for the small size itself', () => {
  assert.equal(thumbs.isPlaceholderImage('maxresdefault', 120), true);
  assert.equal(thumbs.isPlaceholderImage('maxresdefault', 1280), false);
  assert.equal(thumbs.isPlaceholderImage('default', 120), false);
  assert.equal(thumbs.isPlaceholderImage('sddefault', 0), false);
});

test('16:9 check allows small rounding and rejects other ratios', () => {
  assert.equal(thumbs.isSixteenByNine(1280, 720), true);
  assert.equal(thumbs.isSixteenByNine(1920, 1080), true);
  assert.equal(thumbs.isSixteenByNine(1366, 768), true);
  assert.equal(thumbs.isSixteenByNine(1280, 800), false);
  assert.equal(thumbs.isSixteenByNine(1080, 1920), false);
  assert.equal(thumbs.isSixteenByNine(0, 0), false);
});
