const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadTs(file) {
  const code = fs.readFileSync(path.resolve(file), 'utf8');
  const compiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'require', 'module', compiled);
  fn(mod.exports, () => ({}), mod);
  return mod.exports;
}

const { buildDescription, TEMPLATE_DEFAULTS } = loadTs('lib/description-generator.ts');

test('buildDescription generates valid descriptions for all 6 templates', () => {
  const templates = ['tutorial', 'review', 'vlog', 'gaming', 'podcast', 'educational'];

  for (const t of templates) {
    const defaults = TEMPLATE_DEFAULTS[t];
    assert.ok(defaults, `Template defaults missing for ${t}`);
    const result = buildDescription(defaults);

    assert.ok(result.fullText.length > 0, `fullText is empty for ${t}`);
    assert.ok(result.totalChars <= 5000, `totalChars exceeded 5,000 for ${t}`);
    assert.equal(result.isOverLimit, false);
    assert.ok(result.aboveTheFoldChars <= 180, `aboveTheFoldChars should be <= 180 for ${t}`);
    assert.ok(result.fullText.startsWith(defaults.hookSummary.trim()), `Hook should be first section for ${t}`);
  }
});

test('buildDescription handles subscription links and channel handles cleanly', () => {
  const custom = {
    template: 'tutorial',
    videoTitle: 'Test Video',
    hookSummary: 'This is a test summary for YouTube description generator.',
    keyPoints: ['Point A', 'Point B'],
    timestamps: '00:00 Intro\n01:00 Demo',
    channelHandle: '@MyTestChannel',
    websiteUrl: 'https://creovly.com',
    twitterHandle: '@CreovlyApp',
    includeDisclaimer: true,
    hashtags: '#Test #Coding',
  };

  const result = buildDescription(custom);
  assert.ok(result.fullText.includes('https://youtube.com/@MyTestChannel?sub_confirmation=1'));
  assert.ok(result.fullText.includes('https://x.com/CreovlyApp'));
  assert.ok(result.fullText.includes('DISCLAIMER:'));
  assert.ok(result.fullText.includes('#Test #Coding'));
  assert.equal(result.isOverLimit, false);
});

test('buildDescription detects overLimit correctly when > 5000 characters', () => {
  const longText = 'x'.repeat(5050);
  const result = buildDescription({
    template: 'vlog',
    videoTitle: 'Long Video',
    hookSummary: longText,
    keyPoints: [],
    timestamps: '',
  });

  assert.ok(result.totalChars > 5000);
  assert.equal(result.isOverLimit, true);
});
