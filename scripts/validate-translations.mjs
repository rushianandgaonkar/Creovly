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
  const req = customRequire || ((id) => {
    if (id.startsWith('./')) {
      const dir = path.dirname(filePath);
      return loadTsModule(path.join(dir, id.endsWith('.ts') ? id : id + '.ts'), req);
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
console.log('Creovly Automated Multilingual Translation & Parity Validator');
console.log('='.repeat(70));

// 1. Load canonical English source of truth
const enModule = loadTsModule('messages/en/index.ts');
const enMessages = enModule.messages || enModule.default || enModule;
const enLeaves = extractLeaves(enMessages);
const enKeyCount = Object.keys(enLeaves).length;

console.log(`\n[1/4] Canonical English dictionary loaded:`);
console.log(`      Total leaf translation keys: ${enKeyCount}`);
console.log(`      Categories: ${Object.keys(enMessages).join(', ')}`);

// 2. Validate all 7 localized languages against English
let totalErrors = 0;
const report = {
  timestamp: new Date().toISOString(),
  canonicalLocale: 'en',
  totalKeys: enKeyCount,
  languages: {},
};

console.log(`\n[2/4] Validating key parity, placeholders, and content for all languages:`);

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
  const locMessages = locModule.messages || locModule.default || locModule;
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

    // Verify placeholder parity for strings
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

// 3. Validate localized routes & reciprocal hreflang links
console.log(`\n[3/4] Validating URL routing & hreflang alternate tags:`);
const i18nConfig = loadTsModule('config/i18n.ts');
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

let routingErrors = 0;
for (const page of canonicalPages) {
  const alternates = i18nConfig.getLanguageAlternates(page);
  // Must contain all 8 languages + x-default
  const requiredKeys = [...locales, 'x-default'];
  for (const k of requiredKeys) {
    if (!alternates[k]) {
      console.error(`  ❌ Missing hreflang [${k}] for route ${page}`);
      routingErrors++;
    }
  }

  // Check self-referencing and canonical URLs
  const expectedEnUrl = `https://creovly.com${page === '/' ? '/' : page}`;
  if (alternates['en'] !== expectedEnUrl) {
    console.error(`  ❌ Incorrect English canonical URL for ${page}: ${alternates['en']} (expected: ${expectedEnUrl})`);
    routingErrors++;
  }
  if (alternates['x-default'] !== expectedEnUrl) {
    console.error(`  ❌ Incorrect x-default canonical URL for ${page}: ${alternates['x-default']} (expected: ${expectedEnUrl})`);
    routingErrors++;
  }
}

if (routingErrors === 0) {
  console.log(`  ✓ All ${canonicalPages.length} canonical routes have reciprocal 8-language hreflang + x-default tags.`);
  console.log(`  ✓ Total validated sitemap/route targets: ${canonicalPages.length * 8} localized pages.`);
} else {
  totalErrors += routingErrors;
}

// 4. Write machine-readable translation coverage report
const reportsDir = path.resolve('reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}
const reportPath = path.join(reportsDir, 'translation-coverage.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

console.log(`\n[4/4] Machine-readable coverage report generated at:`);
console.log(`      ${reportPath}`);

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
