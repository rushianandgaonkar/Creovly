const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');

function load(file) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = new Module(file);
  mod.require = (id) => { throw new Error(`Unexpected import ${id}`); };
  mod._compile(compiled, `${file}.cjs`);
  return mod.exports;
}

const hashtags = load('lib/hashtags.ts');
const postTime = load('lib/post-time.ts');
const thumb = load('lib/thumbnail-size.ts');
const calc = load('lib/creator-calculators.ts');

test('hashtags: phrases become CamelCase, dedupe, keep brand casing, skip digits', () => {
  assert.equal(hashtags.toHashtag('home workout'), '#HomeWorkout');
  assert.equal(hashtags.toHashtag('iPhone 16 review'), '#iPhone16Review');
  assert.equal(hashtags.toHashtag('2026'), null);
  assert.equal(hashtags.toHashtag('  !!  '), null);
  const { hashtags: list } = hashtags.generateHashtags('home workout, Home Workout\nworkout for beginners');
  assert.deepEqual(list, ['#HomeWorkout', '#WorkoutForBeginners', '#Home', '#Workout', '#Beginners']);
});

test('hashtags: cap applies and #Shorts survives it', () => {
  const input = Array.from({ length: 30 }, (_, i) => `topic${i}`).join(',');
  const result = hashtags.generateHashtags(input, { shorts: true, max: 15 });
  assert.equal(result.hashtags.length, 15);
  assert.equal(result.hashtags.at(-1), '#Shorts');
  assert.equal(result.dropped, 16);
});

test('post time: zone conversion handles offsets and DST', () => {
  // 2026-03-08 is US DST start: 18:00 New York is EDT (UTC-4).
  assert.equal(postTime.zonedTimeToUtc(2026, 3, 8, 18, 0, 'America/New_York').toISOString(), '2026-03-08T22:00:00.000Z');
  assert.equal(postTime.zonedTimeToUtc(2026, 3, 7, 18, 0, 'America/New_York').toISOString(), '2026-03-07T23:00:00.000Z');
  assert.equal(postTime.zonedTimeToUtc(2026, 6, 1, 20, 0, 'Asia/Kolkata').toISOString(), '2026-06-01T14:30:00.000Z');
});

test('post time: seven daily slots, publish = peak minus lead', () => {
  const slots = postTime.publishPlan({ peakZone: 'UTC', peakHour: 17, leadMinutes: 120, from: new Date('2026-11-20T09:00:00Z') });
  assert.equal(slots.length, 7);
  assert.equal(slots[0].peak.toISOString(), '2026-11-20T17:00:00.000Z');
  assert.equal(slots[0].publish.toISOString(), '2026-11-20T15:00:00.000Z');
  assert.equal(slots[6].peak.toISOString(), '2026-11-26T17:00:00.000Z');
  assert.throws(() => postTime.publishPlan({ peakZone: 'Not/AZone', peakHour: 1, leadMinutes: 0, from: new Date() }));
  assert.throws(() => postTime.publishPlan({ peakZone: 'UTC', peakHour: 24, leadMinutes: 0, from: new Date() }));
});

test('thumbnail size: checks follow YouTube rules', () => {
  const level = (checks, id) => checks.find((c) => c.id === id).level;
  const good = thumb.checkThumbnail({ width: 3840, height: 2160, bytes: 1_500_000, type: 'image/jpeg' }, 'video');
  assert.ok(good.every((c) => c.level === 'pass'));
  const hd = thumb.checkThumbnail({ width: 1280, height: 720, bytes: 3_000_000, type: 'image/webp' }, 'video');
  assert.equal(level(hd, 'minimum'), 'pass');
  assert.equal(level(hd, 'resolution'), 'info');
  assert.equal(level(hd, 'format'), 'warn');
  assert.equal(level(hd, 'size'), 'warn');
  const tiny = thumb.checkThumbnail({ width: 600, height: 600, bytes: 60 * 1024 * 1024, type: 'image/png' }, 'video');
  assert.equal(level(tiny, 'minimum'), 'fail');
  assert.equal(level(tiny, 'ratio'), 'warn');
  assert.equal(level(tiny, 'size'), 'fail');
  const short = thumb.checkThumbnail({ width: 1080, height: 1920, bytes: 500_000, type: 'image/png' }, 'shorts');
  assert.equal(level(short, 'ratio'), 'pass');
  assert.equal(thumb.describeRatio(1280, 720), '16:9');
  assert.equal(thumb.describeRatio(1601, 1000), '1.60:1');
});

test('cpm calculator: playbacks, gross, creator share and RPM', () => {
  const r = calc.calculateCreator('cpm', { views: '100000', rate: '60', cpm: '8', share: '55' });
  const v = Object.fromEntries(r.metrics.map((m) => [m.label, m.value]));
  assert.equal(v['Monetized playbacks'], 60000);
  assert.equal(v['Gross ad revenue'], 480);
  assert.ok(Math.abs(v['Estimated creator ad revenue'] - 264) < 1e-9);
  assert.ok(Math.abs(v['Effective ad RPM'] - 2.64) < 1e-9);
  assert.throws(() => calc.calculateCreator('cpm', { views: '100', rate: '101', cpm: '1', share: '55' }));
});

const banner = load('lib/banner-maker.ts');

test('banner maker: safe area, cover fit and text fitting', () => {
  assert.deepEqual(banner.centeredRect(1546, 423), { x: 507, y: 508.5, width: 1546, height: 423 });
  const square = banner.coverRect(1000, 1000);
  assert.equal(square.width, 2560); assert.equal(square.x, 0); assert.equal(square.y, (1440 - 2560) / 2);
  const wide = banner.coverRect(4000, 1000);
  assert.equal(wide.height, 1440); assert.equal(wide.y, 0);
  assert.equal(banner.fitFontSize((s) => s * 10, 1000, 150), 100);
  assert.equal(banner.fitFontSize(() => 99999, 1000, 150, 24), 24);
  const measure = (text, size) => text.length * size * 0.6;
  const long = banner.textLayout({ ...banner.DEFAULT_DESIGN, title: 'A very long channel name that will not fit', align: 'left' }, measure);
  assert.ok(long.titleSize < 150 && long.titleSize * 0.6 * 42 <= long.maxWidth);
  assert.equal(long.x, 507 + 48);
  const none = banner.textLayout({ ...banner.DEFAULT_DESIGN, tagline: '' }, measure);
  assert.equal(none.taglineSize, 0);
  assert.equal(none.titleY, 720 - none.titleSize / 2);
});
