const { test, beforeEach, afterEach } = require('node:test');
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

// Load the actual production functions from lib/consent.ts
const {
  CONSENT_STORAGE_KEY,
  setConsentChoice,
  getConsentChoice,
  purgeAnalyticsCookies,
} = load('lib/consent.ts');

test('CONSENT_STORAGE_KEY is creovly-consent', () => {
  assert.equal(CONSENT_STORAGE_KEY, 'creovly-consent');
});

test('getConsentChoice returns unset when window or localStorage is missing', () => {
  const origWindow = global.window;
  const origLocalStorage = global.localStorage;
  try {
    delete global.window;
    delete global.localStorage;
    assert.equal(getConsentChoice(), 'unset');
  } finally {
    global.window = origWindow;
    global.localStorage = origLocalStorage;
  }
});

test('getConsentChoice reads valid values and ignores invalid values', () => {
  const mockStorage = new Map();
  global.window = { location: { hostname: 'creovly.com' } };
  global.localStorage = {
    getItem: (k) => mockStorage.get(k) ?? null,
    setItem: (k, v) => mockStorage.set(k, String(v)),
  };

  try {
    mockStorage.clear();
    assert.equal(getConsentChoice(), 'unset');

    mockStorage.set('creovly-consent', 'granted');
    assert.equal(getConsentChoice(), 'granted');

    mockStorage.set('creovly-consent', 'denied');
    assert.equal(getConsentChoice(), 'denied');

    mockStorage.set('creovly-consent', 'invalid-value');
    assert.equal(getConsentChoice(), 'unset');
  } finally {
    delete global.window;
    delete global.localStorage;
  }
});

test('getConsentChoice handles localStorage exceptions gracefully', () => {
  global.window = { location: { hostname: 'creovly.com' } };
  global.localStorage = {
    getItem: () => {
      throw new Error('Access denied in private browsing');
    },
    setItem: () => {},
  };

  try {
    assert.doesNotThrow(() => {
      const choice = getConsentChoice();
      assert.equal(choice, 'unset');
    });
  } finally {
    delete global.window;
    delete global.localStorage;
  }
});

test('setConsentChoice updates storage and calls gtag with consent update', () => {
  const mockStorage = new Map();
  const gtagCalls = [];

  global.window = {
    location: { hostname: 'creovly.com' },
    gtag: (...args) => gtagCalls.push(args),
  };
  global.localStorage = {
    getItem: (k) => mockStorage.get(k) ?? null,
    setItem: (k, v) => mockStorage.set(k, String(v)),
  };
  global.document = { cookie: '' };

  try {
    // 1. Grant consent
    setConsentChoice('granted');
    assert.equal(mockStorage.get('creovly-consent'), 'granted');
    assert.equal(gtagCalls.length, 1);
    assert.deepEqual(gtagCalls[0], [
      'consent',
      'update',
      {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);

    // 2. Deny / Revoke consent
    setConsentChoice('denied');
    assert.equal(mockStorage.get('creovly-consent'), 'denied');
    assert.equal(gtagCalls.length, 2);
    assert.deepEqual(gtagCalls[1], [
      'consent',
      'update',
      {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      },
    ]);
  } finally {
    delete global.window;
    delete global.localStorage;
    delete global.document;
  }
});

test('setConsentChoice handles storage failure and missing gtag gracefully', () => {
  const cookieHistory = [];
  global.window = {
    location: { hostname: 'creovly.com' },
    // window.gtag is not defined
  };
  global.localStorage = {
    getItem: () => null,
    setItem: () => {
      throw new Error('QuotaExceededError: Local storage full');
    },
  };
  global.document = {
    get cookie() {
      return '_ga=GA1.1.999; theme=dark';
    },
    set cookie(str) {
      cookieHistory.push(str);
    },
  };

  try {
    // Should not throw even if setItem throws and gtag is undefined
    assert.doesNotThrow(() => {
      setConsentChoice('denied');
    });

    // Should still execute cookie purging
    assert.ok(cookieHistory.some((c) => c.startsWith('_ga=;') && c.includes('expires=')));
  } finally {
    delete global.window;
    delete global.localStorage;
    delete global.document;
  }
});

test('purgeAnalyticsCookies expires host-only and domain-scoped cookies while preserving unrelated cookies', () => {
  let cookieMap = new Map([
    ['_ga', 'GA1.1.12345.67890'],
    ['_ga_0JBY0X9MY4', 'GS1.1.12345.1.0'],
    ['_gid', 'GA1.2.99999.00000'],
    ['_gat', '1'],
    ['user_theme', 'dark'],
    ['session_token', 'xyz-secure-token-123'],
  ]);

  const expiredWrites = [];

  global.window = {
    location: { hostname: 'creovly.com' },
  };

  global.document = {
    get cookie() {
      return Array.from(cookieMap.entries())
        .map(([k, v]) => `${k}=${v}`)
        .join('; ');
    },
    set cookie(val) {
      expiredWrites.push(val);
      const [pair] = val.split(';');
      const [name] = pair.split('=');
      const isExpiring = val.includes('expires=Thu, 01 Jan 1970');
      if (isExpiring) {
        cookieMap.delete(name.trim());
      }
    },
  };

  try {
    purgeAnalyticsCookies();

    // Verify all GA cookies were deleted from active cookie string
    const remainingCookies = global.document.cookie;
    assert.ok(!remainingCookies.includes('_ga='));
    assert.ok(!remainingCookies.includes('_ga_0JBY0X9MY4='));
    assert.ok(!remainingCookies.includes('_gid='));
    assert.ok(!remainingCookies.includes('_gat='));

    // Verify unrelated cookies were completely preserved
    assert.ok(remainingCookies.includes('user_theme=dark'));
    assert.ok(remainingCookies.includes('session_token=xyz-secure-token-123'));

    // Verify expirations targeted both host-only (no domain attribute) and domain-scoped variations
    const hostOnlyWrites = expiredWrites.filter(
      (w) => w.startsWith('_ga=') && !w.includes('domain=') && w.includes('expires=Thu, 01 Jan 1970')
    );
    const domainWrites = expiredWrites.filter(
      (w) => w.startsWith('_ga=') && w.includes('domain=creovly.com') && w.includes('expires=Thu, 01 Jan 1970')
    );
    const dotDomainWrites = expiredWrites.filter(
      (w) => w.startsWith('_ga=') && w.includes('domain=.creovly.com') && w.includes('expires=Thu, 01 Jan 1970')
    );

    assert.ok(hostOnlyWrites.length > 0, 'Must purge host-only cookie (without domain attribute)');
    assert.ok(domainWrites.length > 0, 'Must purge domain-scoped cookie (domain=creovly.com)');
    assert.ok(dotDomainWrites.length > 0, 'Must purge dot-prefixed domain cookie (domain=.creovly.com)');
  } finally {
    delete global.window;
    delete global.document;
  }
});

test('purgeAnalyticsCookies handles undefined document or empty cookies safely', () => {
  const origDoc = global.document;
  try {
    delete global.document;
    assert.doesNotThrow(() => purgeAnalyticsCookies());

    global.document = { cookie: '' };
    assert.doesNotThrow(() => purgeAnalyticsCookies());
  } finally {
    global.document = origDoc;
  }
});
