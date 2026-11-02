const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

function loadTsModule(filePath, customRequire = null) {
  const code = fs.readFileSync(path.resolve(filePath), 'utf8');
  const compiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('exports', 'require', 'module', compiled);
  const req =
    customRequire ||
    ((id) => {
      if (id.startsWith('./') || id.startsWith('../')) {
        const dir = path.dirname(filePath);
        return loadTsModule(path.join(dir, id.endsWith('.ts') ? id : id + '.ts'), req);
      }
      if (id === '@/types') return {};
      if (id === '@/config/i18n') return loadTsModule('config/i18n.ts', req);
      if (id === '@/config/site') return loadTsModule('config/site.ts', req);
      return {};
    });
  fn(mod.exports, req, mod);
  return mod.exports;
}

const LOCALES = ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const TOOLS = [
  'youtube-thumbnail-compressor',
  'youtube-thumbnail-resizer',
  'logo-background-remover',
  'youtube-shorts-safe-zone',
  'youtube-title-checker',
  'youtube-revenue-calculator',
  'youtube-rpm-calculator',
  'youtube-watch-hours-calculator',
  'youtube-monetization-calculator',
];

const OG_LOCALES = {
  en: 'en_US',
  es: 'es_ES',
  ja: 'ja_JP',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
  ko: 'ko_KR',
  it: 'it_IT',
};

const i18nConfig = loadTsModule('config/i18n.ts');
const metadataLib = loadTsModule('lib/metadata.ts');

function getMessages(locale) {
  const dict = loadTsModule(`messages/${locale}/index.ts`);
  return dict.default || dict.messages || dict[`messages${locale.charAt(0).toUpperCase() + locale.slice(1)}`] || dict;
}

test('all 8 languages generate complete page metadata with canonical URLs and reciprocal hreflangs', () => {
  for (const locale of LOCALES) {
    const meta = metadataLib.createPageMetadata({
      title: 'Creovly Test Title',
      description: 'Creovly Test Description',
      path: '/privacy',
      locale,
    });

    const expectedCanonical =
      locale === 'en' ? 'https://creovly.com/privacy' : `https://creovly.com/${locale}/privacy`;
    assert.equal(meta.alternates.canonical, expectedCanonical);

    // Verify reciprocal hreflang entries
    for (const altLocale of LOCALES) {
      const expectedHref =
        altLocale === 'en'
          ? 'https://creovly.com/privacy'
          : `https://creovly.com/${altLocale}/privacy`;
      assert.equal(
        meta.alternates.languages[altLocale],
        expectedHref,
        `Missing/mismatched hreflang ${altLocale} on ${locale} page`
      );
    }
    assert.equal(meta.alternates.languages['x-default'], 'https://creovly.com/privacy');

    // Verify OpenGraph locale
    assert.equal(meta.openGraph.locale, OG_LOCALES[locale]);
  }
});

test('all 9 tool pages generate unique, localized metadata across all 8 languages', () => {
  for (const toolSlug of TOOLS) {
    for (const locale of LOCALES) {
      const meta = metadataLib.createToolMetadata(toolSlug, locale);
      const dict = i18nConfig.translations[locale];
      const toolTrans = dict.tools[toolSlug];

      assert.ok(toolTrans, `Tool translation missing for ${toolSlug} in ${locale}`);
      assert.ok(meta.title, `Metadata title missing for ${toolSlug} in ${locale}`);
      assert.ok(meta.description, `Metadata description missing for ${toolSlug} in ${locale}`);
      assert.ok(
        meta.keywords && meta.keywords.length >= 3,
        `Keywords missing for ${toolSlug} in ${locale}`
      );

      const expectedCanonical =
        locale === 'en'
          ? `https://creovly.com/tools/${toolSlug}`
          : `https://creovly.com/${locale}/tools/${toolSlug}`;
      assert.equal(meta.alternates.canonical, expectedCanonical);

      // Verify hreflang mapping
      for (const altLocale of LOCALES) {
        const expectedHref =
          altLocale === 'en'
            ? `https://creovly.com/tools/${toolSlug}`
            : `https://creovly.com/${altLocale}/tools/${toolSlug}`;
        assert.equal(meta.alternates.languages[altLocale], expectedHref);
      }
      assert.equal(
        meta.alternates.languages['x-default'],
        `https://creovly.com/tools/${toolSlug}`
      );
    }
  }
});

test('all 8 languages render complete Privacy content with verified legal disclosures', () => {
  const REQUIRED_STORAGE_KEYS = [
    'creovly-studio-draft-v1',
    'creovly-checklist',
    'creovly-theme',
    'creovly-analytics-consent',
  ];

  for (const locale of LOCALES) {
    const messages = getMessages(locale);
    const privacy = messages.pages.privacy;

    assert.ok(privacy, `Privacy page translations missing for ${locale}`);
    assert.ok(privacy.heading && privacy.heading.length > 3);
    assert.ok(privacy.subheading && privacy.subheading.length > 10);
    assert.ok(privacy.lastUpdated && privacy.lastUpdated.length > 3);

    const sections = privacy.sections;
    assert.ok(sections, `Privacy sections missing for ${locale}`);

    // Verify 6 distinct legal sections
    assert.ok(sections.clientSideTitle);
    assert.ok(sections.dataCollectTitle);
    assert.ok(sections.storageTitle);
    assert.ok(sections.analyticsTitle);
    assert.ok(sections.platformTitle);
    assert.ok(sections.contactTitle);

    // Verify localStorage inventory contains all 4 required keys
    const lsContent = JSON.stringify(sections.storageKeys);
    for (const key of REQUIRED_STORAGE_KEYS) {
      assert.ok(
        lsContent.includes(key),
        `Privacy section 3 in locale '${locale}' must disclose key '${key}'`
      );
    }

    // Verify Google Analytics disclosure
    const analyticsContent = JSON.stringify(sections.analyticsBody);
    assert.ok(
      analyticsContent.includes('Google Analytics') || analyticsContent.includes('GA4'),
      `Privacy section 4 in locale '${locale}' must reference Google Analytics`
    );

    // Verify contact form link
    assert.ok(
      sections.contactFormLink && sections.contactFormLink.length > 2,
      `Privacy section 6 in locale '${locale}' must provide contact form link`
    );
  }
});

test('all 8 languages render complete Terms of Service with verified legal clauses', () => {
  for (const locale of LOCALES) {
    const messages = getMessages(locale);
    const terms = messages.pages.terms;

    assert.ok(terms, `Terms page translations missing for ${locale}`);
    assert.ok(terms.heading && terms.heading.length > 3);
    assert.ok(terms.subheading && terms.subheading.length > 10);

    const sections = terms.sections;
    assert.ok(sections, `Terms sections missing for ${locale}`);

    // Verify 6 legal sections
    assert.ok(sections.purposeTitle);
    assert.ok(sections.ipTitle);
    assert.ok(sections.disclaimerTitle);
    assert.ok(sections.trademarksTitle);
    assert.ok(sections.liabilityTitle);
    assert.ok(sections.contactTitle);

    // Verify contact form link in terms
    assert.ok(
      sections.contactFormLink && sections.contactFormLink.length > 2,
      `Terms section 6 in locale '${locale}' must provide contact form link`
    );
  }
});

test('all 8 languages render complete About and Contact page content', () => {
  for (const locale of LOCALES) {
    const messages = getMessages(locale);

    // About Page
    const about = messages.pages.about;
    assert.ok(about, `About translations missing for ${locale}`);
    assert.ok(about.breadcrumb && about.breadcrumb.length >= 2);
    assert.ok(about.sections.missionTitle && about.sections.missionTitle.length > 3);
    assert.ok(about.sections.principlesTag && about.sections.principlesTag.length > 3);
    assert.ok(about.sections.differenceTitle && about.sections.differenceTitle.length > 3);
    assert.ok(about.sections.privacyTitle && about.sections.privacyTitle.length > 3);
    assert.ok(about.sections.supportTitle && about.sections.supportTitle.length > 3);
    assert.ok(about.sections.ctaHeading && about.sections.ctaHeading.length > 3);

    // Contact Page
    const contact = messages.pages.contact;
    assert.ok(contact, `Contact translations missing for ${locale}`);
    assert.ok(contact.sidebar.directTitle && contact.sidebar.directTitle.length > 3);
    assert.ok(contact.sidebar.responseTitle && contact.sidebar.responseTitle.length > 3);
    assert.ok(contact.sidebar.featuresTitle && contact.sidebar.featuresTitle.length > 3);
    assert.ok(contact.form.launchEmailApp && contact.form.launchEmailApp.length > 3);
    assert.ok(contact.form.copiedNotification && contact.form.copiedNotification.length > 1);
  }
});

test('all 8 languages render educational guidance and interactive UI strings', () => {
  const GUIDANCE_KEYS = [
    'compressor',
    'resizer',
    'logoRemover',
    'shorts',
    'titleChecker',
  ];

  for (const locale of LOCALES) {
    const messages = getMessages(locale);

    // Tool guidance
    for (const toolKey of GUIDANCE_KEYS) {
      const guidance = messages.tools.guidance[toolKey];
      assert.ok(guidance, `Tool guidance missing for ${toolKey} in ${locale}`);
      assert.ok(guidance.p1 && guidance.p1.length > 10, `p1 missing/short for ${toolKey} in ${locale}`);
      assert.ok(guidance.p2 && guidance.p2.length > 10, `p2 missing/short for ${toolKey} in ${locale}`);
    }

    // Home Carousel
    const carousel = messages.home.carousel;
    assert.ok(carousel, `Carousel translations missing for ${locale}`);
    assert.ok(carousel.heading && carousel.heading.length > 3);
    assert.ok(carousel.viewDirectory && carousel.viewDirectory.length > 3);

    // Checklist
    const checklist = messages.checklist;
    assert.ok(checklist.hero.tag && checklist.hero.tag.length >= 2);
    assert.ok(checklist.status.auditReadiness && checklist.status.auditReadiness.length >= 2);
    assert.ok(checklist.status.completeLabel && checklist.status.completeLabel.length >= 2);
    assert.ok(checklist.status.storageNotice && checklist.status.storageNotice.length > 5);

    // Guides
    const guides = messages.guides;
    assert.ok(guides.index.readGuide && guides.index.readGuide.length > 2);
    assert.ok(guides.article.author && guides.article.author.length > 3);
    assert.ok(guides.article.sourcesDescription && guides.article.sourcesDescription.length > 5);

    // Studio Hero Workspace
    const ws = messages.home.studioWorkspace;
    assert.ok(ws, `studioWorkspace missing for ${locale}`);
    assert.ok(ws.colTitle && ws.colTitle.length > 3, `colTitle missing in ${locale}`);
    assert.ok(ws.videoTitleLabel && ws.videoTitleLabel.length > 3, `videoTitleLabel missing in ${locale}`);
    assert.ok(ws.sampleTitle1 && ws.sampleTitle1.length > 10, `sampleTitle1 missing in ${locale}`);
    assert.ok(ws.sampleTitle2 && ws.sampleTitle2.length > 10, `sampleTitle2 missing in ${locale}`);
    assert.ok(ws.sampleTitle3 && ws.sampleTitle3.length > 10, `sampleTitle3 missing in ${locale}`);
    assert.ok(ws.colThumbnail && ws.colThumbnail.length > 3, `colThumbnail missing in ${locale}`);
    assert.ok(ws.colChecklist && ws.colChecklist.length > 3, `colChecklist missing in ${locale}`);
    assert.ok(ws.checkAspect && ws.checkAspect.length > 3, `checkAspect missing in ${locale}`);
    assert.ok(ws.checkFileSize && ws.checkFileSize.length > 3, `checkFileSize missing in ${locale}`);
    assert.ok(ws.checkSafeZone && ws.checkSafeZone.length > 3, `checkSafeZone missing in ${locale}`);
    assert.ok(ws.exportZip && ws.exportZip.length > 5, `exportZip missing in ${locale}`);
  }
});
