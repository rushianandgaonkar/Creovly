import fs from 'fs';
import path from 'path';
import ts from 'typescript';

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
        const resolved = path.resolve(dir, id.endsWith('.ts') ? id : id + '.ts');
        return loadTsModule(resolved, req);
      }
      return {};
    });
  fn(mod.exports, req, mod);
  return mod.exports;
}

function extractLeaves(obj, prefix = '') {
  const leaves = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(leaves, extractLeaves(value, fullPath));
    } else if (Array.isArray(value)) {
      leaves[fullPath] = value;
      value.forEach((item, idx) => {
        if (typeof item === 'object' && item !== null) {
          Object.assign(leaves, extractLeaves(item, `${fullPath}[${idx}]`));
        } else {
          leaves[`${fullPath}[${idx}]`] = item;
        }
      });
    } else {
      leaves[fullPath] = value;
    }
  }
  return leaves;
}

function findPlaceholders(str) {
  if (typeof str !== 'string') return [];
  const matches = str.match(/\{[a-zA-Z0-9_]+\}/g);
  return matches ? matches.map((m) => m.slice(1, -1)).sort() : [];
}

const locales = ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
const nonEnLocales = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];

console.log('='.repeat(70));
console.log('Creovly Strengthened Multilingual & Regression Validator (Priority 1–5)');
console.log('='.repeat(70));

let totalErrors = 0;
const report = {
  timestamp: new Date().toISOString(),
  canonicalLocale: 'en',
  totalKeys: 0,
  languages: {},
  astScan: {},
  routingChecks: {},
};

// ---------------------------------------------------------------------
// 1. AST Analysis: Detect hardcoded user-visible English in JSX/TSX
// ---------------------------------------------------------------------
console.log(`\n[1/7] AST Analysis: Scanning JSX/TSX components for hardcoded English...`);

const AST_COMPONENTS_TO_CHECK = [
  'components/pages/PrivacyContent.tsx',
  'components/pages/TermsContent.tsx',
  'components/pages/AboutContent.tsx',
  'components/contact/ContactContent.tsx',
  'components/contact/ContactForm.tsx',
  'components/tools/ToolWorkspaceLayout.tsx',
  'components/tools/ToolsDirectoryContent.tsx',
  'components/guides/ActionChecklist.tsx',
  'components/guides/WorkedExampleCard.tsx',
  'components/guides/GuideArticle.tsx',
  'components/guides/GuidesContent.tsx',
  'components/form/DropZone.tsx',
  'app/checklist/ChecklistClient.tsx',
  'components/home/StudioHeroWorkspace.tsx',
];

const ALLOWED_LITERAL_REGEX = [
  /^[0-9\s.,\/#!$%\^&\*;:{}=\-_`~()><\[\]+|?@·•—–✓✗✉→←*+&\\^]+$/,
  /^(https?:\/\/|mailto:|tel:|\/)/,
  /^(support@creovly\.com)$/,
  /^(YouTube™|YouTube|Creovly|Google Analytics|Google LLC|Alphabet Inc\.)$/,
  /^(creovly-[a-z0-9\-]+)$/,
  /^(Ctrl\+S|⌘S|16:9|9:16|4:3|1:1|24fps|30fps|60fps)$/,
  /^(&copy;|&middot;|&rarr;|&mdash;|&quot;|&bull;|&lt;|&gt;)$/,
  /^(01|02|03|04|05|06|JPG|PNG|WebP|MB|KB|px|HD|4K)$/,
  /^(JPG|PNG|WebP|SVG|GIF)(,\s*(JPG|PNG|WebP|SVG|GIF))*\s*[·•\-–]?$/,
];

function isAllowedLiteral(text) {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return ALLOWED_LITERAL_REGEX.some((re) => re.test(trimmed));
}

let astViolationsCount = 0;

for (const relPath of AST_COMPONENTS_TO_CHECK) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');
  const sourceFile = ts.createSourceFile(fullPath, content, ts.ScriptTarget.Latest, true);
  const fileViolations = [];

  function visit(node) {
    if (ts.isJsxText(node)) {
      const text = node.getText(sourceFile).trim();
      if (text.length > 2 && !isAllowedLiteral(text)) {
        const { line } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
        fileViolations.push({ line: line + 1, text, type: 'JsxText' });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (fileViolations.length > 0) {
    console.error(`  ❌ [AST] Found ${fileViolations.length} potential hardcoded string(s) in ${relPath}:`);
    for (const v of fileViolations.slice(0, 5)) {
      console.error(`     L${v.line}: "${v.text}"`);
    }
    astViolationsCount += fileViolations.length;
  }
}

if (astViolationsCount === 0) {
  console.log(`  ✓ All ${AST_COMPONENTS_TO_CHECK.length} audited components clean of hardcoded user-facing English.`);
} else {
  totalErrors += astViolationsCount;
}

// ---------------------------------------------------------------------
// 2. Translation-key parity and placeholders across all 8 languages
// ---------------------------------------------------------------------
console.log(`\n[2/7] Key Parity & Placeholders: Checking 8 languages against English truth...`);

const enModule = loadTsModule('messages/en/index.ts');
const enMessages = enModule.messagesEn || enModule.messages || enModule.default || enModule;
const enLeaves = extractLeaves(enMessages);
const enKeyCount = Object.keys(enLeaves).length;
report.totalKeys = enKeyCount;

console.log(`      Canonical leaf translation keys: ${enKeyCount}`);
console.log(`      Categories: ${Object.keys(enMessages).join(', ')}`);

for (const loc of locales) {
  if (loc === 'en') {
    report.languages['en'] = {
      code: 'en',
      totalKeys: enKeyCount,
      translatedKeys: enKeyCount,
      missingKeys: 0,
      coveragePercent: 100.0,
      placeholderMismatches: 0,
      status: 'SOURCE_OF_TRUTH',
    };
    continue;
  }

  const locModule = loadTsModule(`messages/${loc}/index.ts`);
  const cap = loc.charAt(0).toUpperCase() + loc.slice(1);
  const locMessages = locModule[`messages${cap}`] || locModule.messages || locModule.default || locModule;
  const locLeaves = extractLeaves(locMessages);

  const missingKeys = [];
  const placeholderErrors = [];
  let translatedCount = 0;

  for (const [keyPath, enVal] of Object.entries(enLeaves)) {
    if (!(keyPath in locLeaves)) {
      missingKeys.push(keyPath);
      continue;
    }

    const locVal = locLeaves[keyPath];
    if (locVal === undefined || locVal === null || locVal === '') {
      missingKeys.push(keyPath);
      continue;
    }

    translatedCount++;

    if (typeof enVal === 'string' && typeof locVal === 'string') {
      const enPlaceholders = findPlaceholders(enVal);
      const locPlaceholders = findPlaceholders(locVal);
      if (enPlaceholders.length > 0) {
        const enSet = new Set(enPlaceholders);
        const locSet = new Set(locPlaceholders);
        const missingInLoc = enPlaceholders.filter((p) => !locSet.has(p));
        const extraInLoc = locPlaceholders.filter((p) => !enSet.has(p));
        if (missingInLoc.length > 0 || extraInLoc.length > 0) {
          placeholderErrors.push({
            key: keyPath,
            expected: enPlaceholders,
            actual: locPlaceholders,
          });
        }
      }
    }
  }

  const coverage = ((translatedCount / enKeyCount) * 100).toFixed(2);
  const isComplete = missingKeys.length === 0 && placeholderErrors.length === 0;

  report.languages[loc] = {
    code: loc,
    totalKeys: enKeyCount,
    translatedKeys: translatedCount,
    missingKeys: missingKeys.length,
    missingKeyDetails: missingKeys.slice(0, 10),
    placeholderMismatches: placeholderErrors.length,
    placeholderDetails: placeholderErrors.slice(0, 5),
    coveragePercent: parseFloat(coverage),
    status: isComplete ? 'PASSED' : 'FAILED',
  };

  if (isComplete) {
    console.log(`  ✓ [${loc.toUpperCase()}] Parity: 100% (${translatedCount}/${enKeyCount} keys) · 0 missing · 0 placeholder errors`);
  } else {
    console.error(`  ❌ [${loc.toUpperCase()}] Parity: ${coverage}% (${translatedCount}/${enKeyCount} keys)`);
    if (missingKeys.length > 0) {
      console.error(`     Missing ${missingKeys.length} keys: ${missingKeys.slice(0, 3).join(', ')}...`);
    }
    if (placeholderErrors.length > 0) {
      console.error(`     Placeholder errors in ${placeholderErrors.length} keys:`, placeholderErrors[0]);
    }
    totalErrors += missingKeys.length + placeholderErrors.length;
  }
}

// ---------------------------------------------------------------------
// 3. Validate internal language-switching links & path translation
// ---------------------------------------------------------------------
console.log(`\n[3/7] Internal Language-Switching Links: Validating path translators...`);
const i18nConfig = loadTsModule('config/i18n.ts');

const samplePaths = [
  '/',
  '/studio',
  '/checklist',
  '/tools/youtube-thumbnail-compressor',
  '/tools/youtube-shorts-safe-zone',
  '/guides/decoding-youtube-rpm',
  '/privacy',
  '/contact',
];

let switchLinkErrors = 0;
for (const p of samplePaths) {
  // English target must have no prefix
  const enPath = i18nConfig.translatePath(p, 'en');
  if (enPath !== p) {
    console.error(`  ❌ [LinkSwitch] Expected English path for ${p} to be ${p}, got ${enPath}`);
    switchLinkErrors++;
  }

  // Non-English target must be prefixed
  for (const loc of nonEnLocales) {
    const locPath = i18nConfig.translatePath(p, loc);
    const expected = p === '/' ? `/${loc}` : `/${loc}${p}`;
    if (locPath !== expected) {
      console.error(`  ❌ [LinkSwitch] Expected ${loc} path for ${p} to be ${expected}, got ${locPath}`);
      switchLinkErrors++;
    }

    // Stripping locale must return canonical base path
    const stripped = i18nConfig.stripLocale(locPath);
    if (stripped !== p) {
      console.error(`  ❌ [LinkSwitch] Stripping ${locPath} did not yield ${p}, got ${stripped}`);
      switchLinkErrors++;
    }

    // Detecting locale from path
    const detected = i18nConfig.getLocaleFromPath(locPath);
    if (detected !== loc) {
      console.error(`  ❌ [LinkSwitch] Detecting locale from ${locPath} returned ${detected}, expected ${loc}`);
      switchLinkErrors++;
    }
  }
}

if (switchLinkErrors === 0) {
  console.log(`  ✓ Language-switching links and path translation validated across all 8 languages.`);
} else {
  totalErrors += switchLinkErrors;
}

// ---------------------------------------------------------------------
// 4. Verify every localized tool page retains the correct language
// ---------------------------------------------------------------------
console.log(`\n[4/7] Localized Tool Pages: Verifying 9 tools across all 8 languages...`);

const toolSlugs = [
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

let toolLocalizationErrors = 0;
for (const loc of locales) {
  const content = i18nConfig.translations[loc];
  if (!content || !content.tools) {
    console.error(`  ❌ [ToolPage] Missing tool translations dictionary for ${loc}`);
    toolLocalizationErrors++;
    continue;
  }

  for (const slug of toolSlugs) {
    const tEntry = content.tools[slug];
    if (!tEntry || !tEntry.title || !tEntry.description || !tEntry.categoryLabel) {
      console.error(`  ❌ [ToolPage] Missing localized metadata for tool "${slug}" in [${loc.toUpperCase()}]`);
      toolLocalizationErrors++;
    }
  }
}

if (toolLocalizationErrors === 0) {
  console.log(`  ✓ All 9 tools retain complete localized metadata across all 8 languages.`);
} else {
  totalErrors += toolLocalizationErrors;
}

// ---------------------------------------------------------------------
// 5. Language-specific SEO tags: canonical, reciprocal hreflangs, and og:locale
// ---------------------------------------------------------------------
console.log(`\n[5/7] SEO Annotations: Checking reciprocal hreflang and canonical tags...`);

const canonicalPages = [
  '/',
  '/studio',
  '/checklist',
  '/tools',
  '/tools/thumbnail',
  '/tools/logo-background-remover',
  '/tools/youtube-thumbnail-compressor',
  '/tools/youtube-thumbnail-resizer',
  '/tools/youtube-shorts-safe-zone',
  '/tools/youtube-title-checker',
  '/tools/youtube-revenue-calculator',
  '/tools/youtube-rpm-calculator',
  '/tools/youtube-watch-hours-calculator',
  '/tools/youtube-monetization-calculator',
  '/guides',
  '/guides/youtube-thumbnail-blueprint',
  '/guides/decoding-youtube-rpm',
  '/guides/youtube-shorts-safe-zone',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

let seoTagErrors = 0;
for (const page of canonicalPages) {
  const alternates = i18nConfig.getLanguageAlternates(page);
  const requiredKeys = [...locales, 'x-default'];

  for (const k of requiredKeys) {
    if (!alternates[k]) {
      console.error(`  ❌ Missing hreflang [${k}] for route ${page}`);
      seoTagErrors++;
    }
  }

  const expectedEnUrl = `https://creovly.com${page === '/' ? '/' : page}`;
  if (alternates['en'] !== expectedEnUrl) {
    console.error(`  ❌ Incorrect English canonical URL for ${page}: ${alternates['en']}`);
    seoTagErrors++;
  }
  if (alternates['x-default'] !== expectedEnUrl) {
    console.error(`  ❌ Incorrect x-default canonical URL for ${page}: ${alternates['x-default']}`);
    seoTagErrors++;
  }
}

// Check og:locale mappings
for (const loc of locales) {
  const og = i18nConfig.getOgLocale(loc);
  if (!og || !og.includes('_')) {
    console.error(`  ❌ Invalid or missing og:locale mapping for [${loc}]`);
    seoTagErrors++;
  }
}

if (seoTagErrors === 0) {
  console.log(`  ✓ All ${canonicalPages.length} canonical routes have reciprocal hreflang + x-default + og:locale.`);
  console.log(`  ✓ Total validated sitemap/route targets: ${canonicalPages.length * 8} localized pages.`);
} else {
  totalErrors += seoTagErrors;
}

// ---------------------------------------------------------------------
// 6. Detect accidental English fallback & missing translation content
// ---------------------------------------------------------------------
console.log(`\n[6/7] Fallback & Missing Content: Scanning for untranslated strings...`);

let fallbackErrors = 0;

for (const loc of nonEnLocales) {
  const locModule = loadTsModule(`messages/${loc}/index.ts`);
  const cap = loc.charAt(0).toUpperCase() + loc.slice(1);
  const locMessages = locModule[`messages${cap}`] || locModule.messages || locModule.default || locModule;

  // Check critical legal sections are translated and not identical to English
  const enPrivacyBody = enMessages.pages.privacy.sections.clientSideBody;
  const locPrivacyBody = locMessages.pages?.privacy?.sections?.clientSideBody;
  if (locPrivacyBody === enPrivacyBody) {
    console.error(`  ❌ [Fallback] Privacy policy client-side section in [${loc.toUpperCase()}] is identical to English!`);
    fallbackErrors++;
  }

  const enTermsBody = enMessages.pages.terms.sections.purposeBody;
  const locTermsBody = locMessages.pages?.terms?.sections?.purposeBody;
  if (locTermsBody === enTermsBody) {
    console.error(`  ❌ [Fallback] Terms of service purpose section in [${loc.toUpperCase()}] is identical to English!`);
    fallbackErrors++;
  }

  const enAboutBody = enMessages.pages.about.sections.missionBody;
  const locAboutBody = locMessages.pages?.about?.sections?.missionBody;
  if (locAboutBody === enAboutBody) {
    console.error(`  ❌ [Fallback] About mission section in [${loc.toUpperCase()}] is identical to English!`);
    fallbackErrors++;
  }
}

if (fallbackErrors === 0) {
  console.log(`  ✓ No accidental fallback detected: all legal & page sections localized.`);
} else {
  totalErrors += fallbackErrors;
}

// ---------------------------------------------------------------------
// 7. Verify FAQs, Step Instructions, Playbooks, and Error Messages
// ---------------------------------------------------------------------
console.log(`\n[7/7] FAQs & Instructions: Checking tool FAQs, playbooks, and form errors...`);

const toolPlaybookMod = loadTsModule('config/tool-guidance-i18n.ts');
const playbooks = toolPlaybookMod.toolPlaybookTranslations;
let faqInstructionErrors = 0;

for (const loc of locales) {
  const locModule = loadTsModule(`messages/${loc}/index.ts`);
  const cap = loc.charAt(0).toUpperCase() + loc.slice(1);
  const locMessages = locModule[`messages${cap}`] || locModule.messages || locModule.default || locModule;

  // Verify tool FAQs
  const faqs = locMessages.tools?.faqs;
  if (!faqs) {
    console.error(`  ❌ Missing tools.faqs in [${loc.toUpperCase()}]`);
    faqInstructionErrors++;
  } else {
    const requiredFaqKeys = ['compressor', 'resizer', 'logoRemover', 'shorts', 'titleChecker', 'revenue', 'rpm', 'watchHours', 'monetization'];
    for (const fKey of requiredFaqKeys) {
      if (!Array.isArray(faqs[fKey]) || faqs[fKey].length === 0) {
        console.error(`  ❌ Empty or missing tools.faqs.${fKey} in [${loc.toUpperCase()}]`);
        faqInstructionErrors++;
      }
    }
  }

  // Verify playbooks
  const pBook = playbooks[loc];
  if (!pBook || !pBook.tools) {
    console.error(`  ❌ Missing tool playbooks for [${loc.toUpperCase()}]`);
    faqInstructionErrors++;
  } else {
    for (const slug of toolSlugs) {
      const steps = pBook.tools[slug];
      if (!steps || steps.length !== 3) {
        console.error(`  ❌ Playbook steps missing or incomplete for "${slug}" in [${loc.toUpperCase()}]`);
        faqInstructionErrors++;
      }
    }
  }

  // Verify form errors
  const errors = locMessages.pages?.contact?.errors;
  if (!errors?.nameRequired || !errors?.emailValid || !errors?.messageMin) {
    console.error(`  ❌ Missing contact form validation error messages in [${loc.toUpperCase()}]`);
    faqInstructionErrors++;
  }
}

if (faqInstructionErrors === 0) {
  console.log(`  ✓ All tool FAQs, 3-step playbooks, and error messages verified across all 8 languages.`);
} else {
  totalErrors += faqInstructionErrors;
}

// ---------------------------------------------------------------------
// Write machine-readable coverage report
// ---------------------------------------------------------------------
const reportsDir = path.resolve('reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}
const reportPath = path.join(reportsDir, 'translation-coverage.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log(`\nMachine-readable coverage report saved to:`);
console.log(`  ${reportPath}`);

console.log('\n' + '='.repeat(70));
if (totalErrors === 0) {
  console.log('✅ ALL TRANSLATION VALIDATION CHECKS PASSED: 100% COVERAGE ACROSS 8 LANGUAGES');
  console.log('='.repeat(70) + '\n');
  process.exit(0);
} else {
  console.error(`❌ VALIDATION FAILED WITH ${totalErrors} ERROR(S)`);
  console.log('='.repeat(70) + '\n');
  process.exit(1);
}
