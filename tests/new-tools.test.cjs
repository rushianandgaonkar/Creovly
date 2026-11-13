const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');

function load(file, deps = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = new Module(file);
  mod.require = (id) => { if (id in deps) return deps[id]; throw new Error(`Unexpected import ${id}`); };
  mod._compile(compiled, `${file}.cjs`);
  return mod.exports;
}

const links = load('lib/youtube-links.ts');
const engagement = load('lib/engagement.ts');
const resize = load('lib/image-resize.ts', { './image-compression': { MAX_PIXELS: 24_000_000 } });
const profile = load('lib/profile-picture.ts', { './image-compression': { MAX_PIXELS: 24_000_000, MAX_INPUT_BYTES: 20_000_000 }, './image-resize': resize });

test('all six video URL forms produce the same video ID', () => {
  for (const url of [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s',
    'https://youtu.be/dQw4w9WgXcQ?t=10',
    'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    'https://www.youtube.com/live/dQw4w9WgXcQ?si=abc',
    'https://www.youtube.com/embed/dQw4w9WgXcQ?start=30',
    'm.youtube.com/watch?v=dQw4w9WgXcQ&feature=share',
  ]) assert.equal(links.parseVideoId(url), 'dQw4w9WgXcQ', url);
  assert.equal(links.parseVideoId('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  for (const bad of ['', 'https://vimeo.com/123', 'https://www.youtube.com/watch?v=short', 'https://www.youtube.com/@channel']) {
    assert.equal(links.parseVideoId(bad), null, bad);
  }
});

test('1:30, 90 and 1m30s all produce t=90; bad input is rejected', () => {
  for (const input of ['90', '1:30', '01:30', '1m30s', '1m 30s', '90s', '90.7']) assert.deepEqual(links.parseTimestamp(input), { seconds: 90 }, input);
  assert.deepEqual(links.parseTimestamp('1:02:03'), { seconds: 3723 });
  assert.deepEqual(links.parseTimestamp('1h'), { seconds: 3600 });
  assert.deepEqual(links.parseTimestamp('-5'), { error: 'negative' });
  assert.deepEqual(links.parseTimestamp(''), { error: 'empty' });
  for (const bad of ['abc', '1:75', '1:60:00', '1.5m', 'm']) assert.deepEqual(links.parseTimestamp(bad), { error: 'invalid' }, bad);
  assert.equal(links.formatTimestamp(90), '1:30');
  assert.equal(links.formatTimestamp(3723), '1:02:03');
  const out = links.timestampLinks('dQw4w9WgXcQ', 90);
  assert.equal(out.short, 'https://youtu.be/dQw4w9WgXcQ?t=90');
  assert.equal(out.full, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=90s');
  assert.match(out.embed, /src="https:\/\/www\.youtube\.com\/embed\/dQw4w9WgXcQ\?start=90"/);
});

test('subscribe links append sub_confirmation and keep /c/ and /user/ names', () => {
  const sub = (input) => { const ref = links.parseChannel(input); return ref && links.subscribeLink(ref); };
  assert.equal(sub('@yourchannel'), 'https://www.youtube.com/@yourchannel?sub_confirmation=1');
  assert.equal(sub('https://www.youtube.com/@yourchannel/videos'), 'https://www.youtube.com/@yourchannel?sub_confirmation=1');
  assert.equal(sub('youtube.com/channel/UC1234567890abcdefghijkl'), 'https://www.youtube.com/channel/UC1234567890abcdefghijkl?sub_confirmation=1');
  assert.equal(sub('UC1234567890abcdefghijkl'), 'https://www.youtube.com/channel/UC1234567890abcdefghijkl?sub_confirmation=1');
  assert.equal(sub('https://www.youtube.com/c/OldName'), 'https://www.youtube.com/c/OldName?sub_confirmation=1');
  assert.equal(sub('https://m.youtube.com/user/legacy?sub_confirmation=1'), 'https://www.youtube.com/user/legacy?sub_confirmation=1');
  assert.equal(sub('https://www.youtube.com/@%E3%81%B2%E3%81%AA%E3%81%9F'), 'https://www.youtube.com/@ひなた?sub_confirmation=1');
  for (const bad of ['', 'yourchannel', '@a', 'https://example.com/@x', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ']) assert.equal(sub(bad), null, bad);
});

test('engagement: 10,000 views, 400 likes, 50 comments, 50 shares returns 5.00%', () => {
  const outcome = engagement.calculateEngagement('youtube', 'views', { views: '10000', likes: '400', comments: '50', shares: '50' });
  assert.equal(outcome.ok, true);
  assert.equal(outcome.result.rate.toFixed(2), '5.00');
  assert.deepEqual(outcome.result.parts.map((p) => [p.key, p.share]), [['likes', 80], ['comments', 10], ['shares', 10]]);
  assert.equal(outcome.result.commentsPer100Likes, 12.5);
});

test('engagement: shared values survive a platform switch and division by zero is an error, not NaN', () => {
  const shared = { views: '10000', likes: '400', comments: '50', shares: '50', saves: '20', followers: '0' };
  assert.equal(engagement.calculateEngagement('tiktok', 'views', shared).result.rate.toFixed(2), '5.20');
  assert.deepEqual(engagement.calculateEngagement('instagram', 'followers', shared), { ok: false, error: 'zero', fields: ['followers'] });
  assert.deepEqual(engagement.calculateEngagement('youtube', 'views', { ...shared, views: '0' }), { ok: false, error: 'zero', fields: ['views'] });
  assert.deepEqual(engagement.calculateEngagement('youtube', 'views', { likes: '4' }), { ok: false, error: 'missing', fields: ['views', 'comments'] });
  assert.deepEqual(engagement.calculateEngagement('youtube', 'views', { views: '-1', likes: '1', comments: '1' }), { ok: false, error: 'invalid', fields: ['views'] });
  const reach = engagement.calculateEngagement('instagram', 'reach', { followers: '1000', likes: '90', comments: '10', reach: '500' });
  assert.equal(reach.result.rate, 20);
});

test('engagement: multi-post average is the mean of per-post rates', () => {
  const avg = engagement.calculateAverage('youtube', 'views', '10,000\t400\t50\t50\n1000;20;5\nViews Likes Comments\n2.000 10 10');
  assert.equal(avg.count, 3);
  assert.deepEqual(avg.skipped, [3]);
  assert.equal(avg.rate.toFixed(2), ((5 + 2.5 + 1) / 3).toFixed(2));
  assert.equal(avg.summary.total, 545);
  assert.equal(engagement.calculateAverage('youtube', 'views', Array(25).fill('100 1 1').join('\n')).truncated, true);
});

test('profile picture: crop geometry with zoom and GIF frame counting', () => {
  const g = resize.resizeGeometry(4000, 3000, 800, 800, 'cover', 50, 50, 2);
  assert.equal(g.drawHeight, 1600);
  assert.equal(g.top, -400);
  assert.equal(800 / g.scale, 1500); // a 2× zoom on a 4000 × 3000 photo still samples 1,500 source px
  const header = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 1, 0, 1, 0, 0x80, 0, 0, 0, 0, 0, 255, 255, 255];
  const frame = [0x21, 0xf9, 4, 0, 10, 0, 0, 0, 0x2c, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 0x44, 0x01, 0];
  assert.equal(profile.countGifFrames(Uint8Array.from([...header, ...frame, 0x3b])), 1);
  assert.equal(profile.countGifFrames(Uint8Array.from([...header, ...frame, ...frame, 0x3b])), 2);
});
