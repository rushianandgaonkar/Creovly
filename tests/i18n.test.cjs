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
  fn(mod.exports, (id) => {
    if (id === '@/types') return {};
    throw new Error(`Mock not found: ${id}`);
  }, mod);
  return mod.exports;
}

const i18n = loadTs('config/i18n.ts');

test('all 8 requested languages exist with exact codes, native labels, and English names', () => {
  const expected = [
    { code: 'es', label: 'Español', name: 'Spanish' },
    { code: 'ja', label: '日本語', name: 'Japanese' },
    { code: 'fr', label: 'Français', name: 'French' },
    { code: 'de', label: 'Deutsch', name: 'German' },
    { code: 'pt', label: 'Português', name: 'Portuguese' },
    { code: 'ko', label: '한국어', name: 'Korean' },
    { code: 'it', label: 'Italiano', name: 'Italian' },
    { code: 'en', label: 'English', name: 'English' },
  ];

  for (const item of expected) {
    const lang = i18n.languages[item.code];
    assert.ok(lang, `Language ${item.code} missing from languages`);
    assert.equal(lang.label, item.label);
    assert.equal(lang.name, item.name);
    assert.equal(lang.code, item.code);
  }

  assert.equal(i18n.defaultLocale, 'en');
  assert.equal(i18n.selectorLanguages.length, 8);
  assert.deepEqual(
    i18n.selectorLanguages.map((l) => l.code),
    ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it', 'en']
  );
});

test('getLocaleFromPath extracts locale correctly', () => {
  assert.equal(i18n.getLocaleFromPath('/'), 'en');
  assert.equal(i18n.getLocaleFromPath('/tools'), 'en');
  assert.equal(i18n.getLocaleFromPath('/studio'), 'en');
  assert.equal(i18n.getLocaleFromPath('/es'), 'es');
  assert.equal(i18n.getLocaleFromPath('/es/tools'), 'es');
  assert.equal(i18n.getLocaleFromPath('/ja/studio'), 'ja');
  assert.equal(i18n.getLocaleFromPath('/ko/checklist'), 'ko');
  assert.equal(i18n.getLocaleFromPath('/fr/tools/youtube-thumbnail-compressor'), 'fr');
  assert.equal(i18n.getLocaleFromPath('/unknown/path'), 'en');
});

test('stripLocale removes locale prefix and returns canonical base path', () => {
  assert.equal(i18n.stripLocale('/'), '/');
  assert.equal(i18n.stripLocale('/tools'), '/tools');
  assert.equal(i18n.stripLocale('/es'), '/');
  assert.equal(i18n.stripLocale('/es/tools'), '/tools');
  assert.equal(i18n.stripLocale('/ja/tools/youtube-thumbnail-compressor'), '/tools/youtube-thumbnail-compressor');
  assert.equal(i18n.stripLocale('/ko/about'), '/about');
});

test('translatePath preserves default language URLs and prefixes non-default languages', () => {
  assert.equal(i18n.translatePath('/tools', 'es'), '/es/tools');
  assert.equal(i18n.translatePath('/es/tools', 'en'), '/tools');
  assert.equal(i18n.translatePath('/es/tools', 'fr'), '/fr/tools');
  assert.equal(i18n.translatePath('/', 'es'), '/es');
  assert.equal(i18n.translatePath('/es', 'en'), '/');
  assert.equal(i18n.translatePath('/ja/studio', 'de'), '/de/studio');
});

test('getLanguageAlternates produces complete bidirectional hreflang mapping', () => {
  const alts = i18n.getLanguageAlternates('/tools/youtube-thumbnail-compressor');
  assert.equal(alts['en'], 'https://creovly.com/tools/youtube-thumbnail-compressor');
  assert.equal(alts['es'], 'https://creovly.com/es/tools/youtube-thumbnail-compressor');
  assert.equal(alts['ja'], 'https://creovly.com/ja/tools/youtube-thumbnail-compressor');
  assert.equal(alts['fr'], 'https://creovly.com/fr/tools/youtube-thumbnail-compressor');
  assert.equal(alts['de'], 'https://creovly.com/de/tools/youtube-thumbnail-compressor');
  assert.equal(alts['pt'], 'https://creovly.com/pt/tools/youtube-thumbnail-compressor');
  assert.equal(alts['ko'], 'https://creovly.com/ko/tools/youtube-thumbnail-compressor');
  assert.equal(alts['it'], 'https://creovly.com/it/tools/youtube-thumbnail-compressor');
  assert.equal(alts['x-default'], 'https://creovly.com/tools/youtube-thumbnail-compressor');
});

test('translations dictionary covers all 8 languages with all 9 tools', () => {
  const tools = [
    'logo-background-remover',
    'youtube-thumbnail-compressor',
    'youtube-thumbnail-resizer',
    'youtube-shorts-safe-zone',
    'youtube-title-checker',
    'youtube-revenue-calculator',
    'youtube-rpm-calculator',
    'youtube-watch-hours-calculator',
    'youtube-monetization-calculator',
  ];

  for (const locale of ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    const data = i18n.translations[locale];
    assert.ok(data, `Translation data missing for locale ${locale}`);
    assert.ok(data.nav.tools, `Nav tools missing for ${locale}`);
    assert.ok(data.home.title, `Home title missing for ${locale}`);
    assert.ok(data.studio.title, `Studio title missing for ${locale}`);

    for (const toolSlug of tools) {
      const toolTrans = data.tools[toolSlug];
      assert.ok(toolTrans, `Tool ${toolSlug} missing in translations for ${locale}`);
      assert.ok(toolTrans.title && toolTrans.title.length > 3, `Invalid tool title for ${toolSlug} in ${locale}`);
      assert.ok(toolTrans.description && toolTrans.description.length > 10, `Invalid description for ${toolSlug} in ${locale}`);
      assert.ok(toolTrans.keywords && toolTrans.keywords.length >= 3, `Keywords missing for ${toolSlug} in ${locale}`);
    }
  }
});

