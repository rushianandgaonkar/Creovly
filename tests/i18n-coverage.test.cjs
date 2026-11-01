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

test('every language dictionary has 100% key parity with English source of truth', () => {
  const enModule = loadTsModule('messages/en/index.ts');
  const enMessages = enModule.messages || enModule.default || enModule;
  const enLeaves = extractLeaves(enMessages);
  const enKeyCount = Object.keys(enLeaves).length;

  assert.ok(enKeyCount >= 600, `Expected at least 600 translation keys, got ${enKeyCount}`);

  const targetLocales = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const loc of targetLocales) {
    const locModule = loadTsModule(`messages/${loc}/index.ts`);
    const locMessages = locModule.messages || locModule.default || locModule;
    const locLeaves = extractLeaves(locMessages);

    const missingKeys = [];
    const placeholderErrors = [];

    for (const [keyPath, enVal] of Object.entries(enLeaves)) {
      if (!(keyPath in locLeaves) || locLeaves[keyPath] === undefined || locLeaves[keyPath] === '') {
        missingKeys.push(keyPath);
        continue;
      }

      const locVal = locLeaves[keyPath];
      if (typeof enVal === 'string' && typeof locVal === 'string') {
        const enPlaceholders = findPlaceholders(enVal);
        const locPlaceholders = findPlaceholders(locVal);
        if (enPlaceholders.length > 0) {
          const locSet = new Set(locPlaceholders);
          const missingInLoc = enPlaceholders.filter((p) => !locSet.has(p));
          if (missingInLoc.length > 0) {
            placeholderErrors.push({ key: keyPath, missing: missingInLoc });
          }
        }
      }
    }

    assert.equal(
      missingKeys.length,
      0,
      `Locale ${loc} is missing ${missingKeys.length} keys: ${missingKeys.slice(0, 5).join(', ')}`
    );
    assert.equal(
      placeholderErrors.length,
      0,
      `Locale ${loc} has placeholder mismatches in ${placeholderErrors.length} keys`
    );
  }
});

