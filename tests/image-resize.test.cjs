const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
const compiled = ts.transpileModule(fs.readFileSync('lib/image-resize.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const loaded = new Module('image-resize');
loaded.require = (id) => { if (id === './image-compression') return { MAX_PIXELS: 24_000_000, decodeImage: async () => { throw new Error('Decode should not be reached'); } }; throw new Error(id); };
loaded._compile(compiled, 'image-resize.cjs');
const { resizeGeometry, validateResize, resizeImage } = loaded.exports;
const defaults = { width: 1280, height: 720, fit: 'cover', x: 50, y: 50, background: 'white', format: 'image/jpeg', quality: .9 };

test('cover crops across the full available travel on either axis', () => {
  assert.deepEqual(resizeGeometry(400, 200, 100, 100, 'cover', 0, 50), { scale: .5, drawWidth: 200, drawHeight: 100, left: -0, top: 0 });
  assert.equal(resizeGeometry(400, 200, 100, 100, 'cover', 50, 50).left, -50);
  assert.equal(resizeGeometry(400, 200, 100, 100, 'cover', 100, 50).left, -100);
  assert.equal(resizeGeometry(200, 400, 100, 100, 'cover', 50, 100).top, -100);
});
test('contain preserves every source edge with centered padding', () => {
  assert.deepEqual(resizeGeometry(400, 200, 100, 100, 'contain'), { scale: .25, drawWidth: 100, drawHeight: 50, left: 0, top: 25 });
  const portrait = resizeGeometry(200, 400, 100, 100, 'contain');
  assert.equal(portrait.left, 25); assert.equal(portrait.top, 0);
  assert.equal(resizeGeometry(1280, 720, 3840, 2160, 'cover').scale, 3);
});
test('output allocation guards reject invalid and excessive canvas sizes', () => {
  for (const [width, height] of [[0, 720], [NaN, 720], [1280.5, 720], [8193, 1], [6000, 5000]]) {
    assert.throws(() => validateResize({ ...defaults, width, height }), /dimensions/);
  }
  assert.doesNotThrow(() => validateResize({ ...defaults, width: 6000, height: 4000 }));
  assert.throws(() => validateResize({ ...defaults, x: 101 }), /position/);
  assert.throws(() => validateResize({ ...defaults, quality: 1 }), /quality/);
});
test('invalid settings and cancellation are rejected before decoding', async () => {
  await assert.rejects(resizeImage(new File(['x'], 'x.png'), { ...defaults, width: 0 }), /dimensions/);
  const controller = new AbortController(); controller.abort();
  await assert.rejects(resizeImage(new File(['x'], 'x.png'), defaults, controller.signal), { name: 'AbortError' });
});
