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

const chapters = load('lib/youtube-chapters.ts');
const script = load('lib/script-length.ts');

test('chapters are read with the timestamp before or after the title', () => {
  const { chapters: list, skipped } = chapters.parseChapters('0:00 Intro\n01:45 - Setup\nTesting the mic (5:20)\n\nno time here\n[1:02:03] Outro | wrap-up');
  assert.deepEqual(list.map((c) => [c.seconds, c.title]), [[0, 'Intro'], [105, 'Setup'], [320, 'Testing the mic'], [3723, 'Outro | wrap-up']]);
  assert.deepEqual(skipped, [5]);
  assert.equal(chapters.parseChapters('1:75 bad seconds').chapters.length, 0);
});

test('YouTube chapter rules are checked', () => {
  const parse = (text) => chapters.parseChapters(text).chapters;
  assert.deepEqual(chapters.validateChapters(parse('0:00 A\n0:30 B\n1:00 C')), []);
  const kinds = (text, video) => chapters.validateChapters(parse(text), video).map((issue) => issue.kind);
  assert.deepEqual(kinds('0:05 A\n0:30 B\n1:00 C'), ['first-not-zero']);
  assert.deepEqual(kinds('0:00 A\n0:30 B'), ['too-few']);
  assert.deepEqual(kinds('0:00 A\n0:30 B\n0:20 C'), ['not-ascending']);
  assert.deepEqual(kinds('0:00 A\n0:05 B\n1:00 C'), ['too-short']);
  assert.deepEqual(kinds('0:00 A\n0:30 B\n1:00 C', 65), ['too-short']);
  assert.deepEqual(kinds('0:00 A\n0:30 B\n1:00 C', 50), ['past-end']);
  assert.deepEqual(kinds('0:00\n0:30 B\n1:00 C'), ['empty-title']);
});

test('chapters are formatted consistently and durations computed', () => {
  const list = chapters.parseChapters('0:00 Intro\n1:45 Setup\n65:00 Outro').chapters;
  assert.equal(chapters.formatChapters(list, ' - ', false), '0:00:00 - Intro\n0:01:45 - Setup\n1:05:00 - Outro');
  const short = list.slice(0, 2);
  assert.equal(chapters.formatChapters(short, ' ', false), '0:00 Intro\n1:45 Setup');
  assert.equal(chapters.formatChapters(short, ' | ', true), '00:00 | Intro\n01:45 | Setup');
  assert.deepEqual(chapters.chapterDurations(list), [105, 3795, null]);
  assert.deepEqual(chapters.chapterDurations(list, 4000), [105, 3795, 100]);
  assert.deepEqual(chapters.sortChapters(chapters.parseChapters('1:00 B\n0:00 A').chapters).map((c) => c.title), ['A', 'B']);
});

test('script length counts words or characters and converts to time', () => {
  assert.equal(script.countWords('Hello world, this is   a test.\n\n— 2026'), 7);
  assert.equal(script.countCharacters('こんにちは、 世界\n'), 8);
  assert.equal(script.countParagraphs('One.\n\nTwo.\n  \nThree.'), 3);
  assert.equal(script.detectUnit('This is English.'), 'words');
  assert.equal(script.detectUnit('今日はいい天気ですね。'), 'characters');
  assert.equal(script.detectUnit('안녕하세요 반갑습니다'), 'characters');
  assert.equal(script.speakingSeconds(150, 150), 60);
  assert.equal(script.speakingSeconds(1500, 150, 5, 2), 608);
  assert.equal(script.speakingSeconds(0, 150), 0);
  assert.equal(script.countForDuration(600, 150), 1500);
  assert.equal(script.formatDuration(75), '1:15');
  assert.equal(script.formatDuration(3723), '1:02:03');
});
