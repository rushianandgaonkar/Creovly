const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');

const compiled = ts.transpileModule(fs.readFileSync('lib/image-compression.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = new Module('image-compression');
loaded._compile(compiled, 'image-compression.cjs');
const { validateImage, compressImage, downloadName } = loaded.exports;

function png(width, height, animation = false) {
  const header = Buffer.alloc(33);
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]).copy(header);
  header.writeUInt32BE(13, 8); header.write('IHDR', 12);
  header.writeUInt32BE(width, 16); header.writeUInt32BE(height, 20);
  if (!animation) return header;
  const chunk = Buffer.alloc(20); chunk.writeUInt32BE(8); chunk.write('acTL', 4);
  return Buffer.concat([header, chunk]);
}
function file(bytes, name = 'thumbnail.png', type = 'image/png') { return new File([bytes], name, { type }); }

test('detects the image signature rather than trusting extension or MIME', async () => {
  assert.equal(await validateImage(file(png(1280, 720), 'wrong.txt', 'text/plain')), 'image/png');
  await assert.rejects(validateImage(file(Buffer.from('not a PNG'))), /Unsupported or damaged/);
});
test('rejects empty, oversized, and unsafe-dimension inputs', async () => {
  await assert.rejects(validateImage(file(Buffer.alloc(0))), /empty/);
  await assert.rejects(validateImage(file(Buffer.alloc(20_000_001))), /under 20 MB/);
  await assert.rejects(validateImage(file(png(9000, 100))), /too large/);
  await assert.rejects(validateImage(file(png(6000, 5000))), /too large/);
  await assert.rejects(validateImage(file(png(0, 100))), /too large/);
});
test('rejects animation instead of silently exporting its first frame', async () => {
  await assert.rejects(validateImage(file(png(320, 180, true))), /Animated/);
  const webp = Buffer.alloc(30); webp.write('RIFF'); webp.write('WEBP', 8); webp.write('VP8X', 12); webp.writeUInt32LE(10, 16); webp[20] = 2;
  await assert.rejects(validateImage(file(webp, 'animation.webp', 'image/webp')), /Animated/);
});
test('validates targets and cancellation before decoding', async () => {
  const input = file(png(1280, 720));
  await assert.rejects(compressImage(input, { format: 'image/jpeg', targetBytes: NaN, maxQuality: .9 }), /target/);
  await assert.rejects(compressImage(input, { format: 'image/jpeg', targetBytes: 2_000_000, maxQuality: 1 }), /quality/);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(compressImage(input, { format: 'image/jpeg', targetBytes: 2_000_000, maxQuality: .9 }, controller.signal), { name: 'AbortError' });
});
test('download names match the requested format and remove path separators', () => {
  assert.equal(downloadName('my-thumbnail.png', 'image/jpeg'), 'my-thumbnail-compressed.jpg');
  assert.equal(downloadName('../test.png', 'image/webp'), '---test-compressed.webp');
});
