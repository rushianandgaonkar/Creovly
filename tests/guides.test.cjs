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
  'youtube-banner-size',
  'youtube-title-checker',
  'youtube-revenue-calculator',
  'youtube-rpm-calculator',
  'youtube-watch-hours-calculator',
  'youtube-monetization-calculator',
]);

test('guide registry contains approved guides with valid slugs and metadata', () => {
  assert.equal(guides.length, 7);
  const expectedSlugs = [
    'youtube-thumbnail-blueprint',
    'decoding-youtube-rpm',
    'youtube-shorts-safe-zone',
    'youtube-banner-size',
    'youtube-monetization-requirements',
    'how-to-change-youtube-thumbnail',
    'how-much-does-youtube-pay-per-1000-views',
  ];
  assert.deepEqual(guides.map((g) => g.slug), expectedSlugs);

  for (const guide of guides) {
    assert.ok(guide.title && guide.title.length > 10);
    assert.ok(guide.category && guide.category.length > 0);
    assert.ok(guide.readTime && guide.readTime.includes('min read'));
    assert.ok(guide.lastVerified && (guide.lastVerified.includes('October 2026') || guide.lastVerified.includes('November 2026')));
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
  assert.equal(getGuideBySlug('youtube-banner-size')?.slug, 'youtube-banner-size');
  assert.equal(getGuideBySlug('youtube-monetization-requirements')?.slug, 'youtube-monetization-requirements');
  assert.equal(getGuideBySlug('how-to-change-youtube-thumbnail')?.slug, 'how-to-change-youtube-thumbnail');
  assert.equal(getGuideBySlug('how-much-does-youtube-pay-per-1000-views')?.slug, 'how-much-does-youtube-pay-per-1000-views');
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

test('RPM guide addresses "what is rpm on youtube" search intent with definition, formula and FAQ', () => {
  const guide = getGuideBySlug('decoding-youtube-rpm');
  assert.ok(guide);

  // Direct H2 heading for search query
  const firstSection = guide.contentSections[0];
  assert.ok(firstSection.heading.toLowerCase().includes('what is rpm on youtube'), `Heading must contain 'what is rpm on youtube': ${firstSection.heading}`);
  assert.ok(firstSection.body.includes('(Estimated Total Revenue / Total Views) × 1,000'));
  assert.ok(firstSection.body.includes('/tools/youtube-rpm-calculator') || firstSection.body.includes('YouTube RPM Calculator'));

  // FAQ entity in config/guides-i18n.ts across locales
  const guidesConfig = load('config/guides-i18n.ts');
  const enGuide = guidesConfig.getLocalizedGuide('decoding-youtube-rpm', 'en');
  assert.ok(enGuide.faqs.some((f) => f.question.toLowerCase().includes('what is rpm on youtube')), 'en FAQ missing "what is rpm on youtube"');

  for (const loc of ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    const locGuide = guidesConfig.getLocalizedGuide('decoding-youtube-rpm', loc);
    assert.ok(locGuide.faqs.length >= 4, `Expected at least 4 FAQs for decoding-youtube-rpm in ${loc}`);
  }
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
