const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');

function load(path, mocks = {}) {
  const compiled = ts.transpileModule(fs.readFileSync(path, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loaded = new Module(path);
  loaded.require = (id) => {
    if (id in mocks) return mocks[id];
    throw new Error(`Unexpected import ${id}`);
  };
  loaded._compile(compiled, path + '.cjs');
  return loaded.exports;
}

const { guides, getGuideBySlug } = load('lib/guides.ts');

const VALID_TOOL_IDS = new Set([
  'youtube-thumbnail-compressor',
  'youtube-thumbnail-resizer',
  'logo-background-remover',
  'youtube-shorts-safe-zone',
  'youtube-title-checker',
  'youtube-revenue-calculator',
  'youtube-rpm-calculator',
  'youtube-watch-hours-calculator',
  'youtube-monetization-calculator',
]);

test('guide registry contains exactly three approved guides with valid slugs and metadata', () => {
  assert.equal(guides.length, 3);
  const expectedSlugs = [
    'youtube-thumbnail-blueprint',
    'decoding-youtube-rpm',
    'youtube-shorts-safe-zone',
  ];
  assert.deepEqual(guides.map((g) => g.slug), expectedSlugs);

  for (const guide of guides) {
    assert.ok(guide.title && guide.title.length > 10);
    assert.ok(guide.category && guide.category.length > 0);
    assert.ok(guide.readTime && guide.readTime.includes('min read'));
    assert.ok(guide.lastVerified && guide.lastVerified.includes('October 2026'));
    assert.ok(guide.officialSources && guide.officialSources.length > 0);
    assert.ok(guide.workedExample && guide.workedExample.title && guide.workedExample.steps.length > 0);
    assert.ok(guide.checklist && guide.checklist.length >= 3);
    assert.ok(guide.relatedToolIds && guide.relatedToolIds.length >= 2);
    for (const toolId of guide.relatedToolIds) {
      assert.ok(VALID_TOOL_IDS.has(toolId), `Unknown tool ID: ${toolId}`);
    }
    assert.ok(guide.contentSections && guide.contentSections.length >= 3);
  }
});

test('getGuideBySlug returns the matching guide or undefined', () => {
  assert.equal(getGuideBySlug('youtube-thumbnail-blueprint')?.slug, 'youtube-thumbnail-blueprint');
  assert.equal(getGuideBySlug('decoding-youtube-rpm')?.slug, 'decoding-youtube-rpm');
  assert.equal(getGuideBySlug('youtube-shorts-safe-zone')?.slug, 'youtube-shorts-safe-zone');
  assert.equal(getGuideBySlug('non-existent-guide'), undefined);
});

test('thumbnail guide contains verified platform limits and avoids guaranteed CTR claims', () => {
  const guide = getGuideBySlug('youtube-thumbnail-blueprint');
  const allText = JSON.stringify(guide).toLowerCase();

  // Platform limits verified
  assert.ok(allText.includes('1280×720') || allText.includes('1280x720'));
  assert.ok(allText.includes('640'));
  assert.ok(allText.includes('2 mb') || allText.includes('2mb'));
  assert.ok(allText.includes('50 mb') || allText.includes('50mb'));

  // Official source linked
  assert.ok(guide.officialSources.some((s) => s.url.includes('support.google.com/youtube/answer/72431')));

  // No guaranteed CTR claims or unsupported audience percentage claims
  assert.ok(!allText.includes('guaranteed ctr'));
  assert.ok(!allText.includes('boost your ctr by'));
  assert.ok(!allText.includes('over 70%'));
});

test('RPM guide prevents double revenue share deduction and distinguishes Shorts', () => {
  const guide = getGuideBySlug('decoding-youtube-rpm');
  const allText = JSON.stringify(guide).toLowerCase();

  // Explains formula and included revenues
  assert.ok(allText.includes('cpm'));
  assert.ok(allText.includes('rpm'));
  assert.ok(allText.includes('memberships') || allText.includes('premium'));

  // Warns against double deduction
  assert.ok(allText.includes('double') || allText.includes('already deducted') || allText.includes('do not subtract'));

  // Distinguishes Shorts pooled revenue from long-form
  assert.ok(allText.includes('shorts'));
  assert.ok(allText.includes('pool'));

  // Official source linked
  assert.ok(guide.officialSources.some((s) => s.url.includes('support.google.com/youtube/answer/9314357')));
});

test('Shorts guide labels margins as recommendations and notes interface variations', () => {
  const guide = getGuideBySlug('youtube-shorts-safe-zone');
  const allText = JSON.stringify(guide).toLowerCase();

  // Mentions 9:16 and overlays
  assert.ok(allText.includes('9:16') || allText.includes('1080×1920'));
  assert.ok(allText.includes('overlay'));

  // Labels margins as recommendations / heuristics with device variance
  assert.ok(allText.includes('recommendation') || allText.includes('practical'));
  assert.ok(allText.includes('device') || allText.includes('screen') || allText.includes('aspect ratio'));

  // Official source linked
  assert.ok(guide.officialSources.some((s) => s.url.includes('support.google.com/youtube')));
});
