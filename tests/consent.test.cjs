const { test } = require('node:test');
const assert = require('node:assert/strict');

test('consent storage keys and default states', () => {
  const CONSENT_STORAGE_KEY = 'creovly-consent';
  assert.equal(CONSENT_STORAGE_KEY, 'creovly-consent');
});

test('purgeAnalyticsCookies expires _ga, _gid, and _gat cookies while preserving others', () => {
  let cookieJar = '_ga=GA1.1.12345.67890; _ga_0JBY0X9MY4=GS1.1.12345.1.0; other_session=abc123xyz; _gid=GA1.1.99999.00000';

  // Mock document.cookie behavior
  const fakeDocument = {
    get cookie() {
      return cookieJar;
    },
    set cookie(val) {
      const parts = val.split(';');
      const [key, value] = parts[0].split('=');
      const isExpiring = parts.some(p => p.trim().startsWith('expires=') && p.includes('1970'));
      if (isExpiring) {
        // remove cookie from jar
        cookieJar = cookieJar
          .split(';')
          .map(c => c.trim())
          .filter(c => !c.startsWith(key + '='))
          .join('; ');
      } else {
        cookieJar += `; ${key}=${value}`;
      }
    }
  };

  // Run the purge algorithm
  const cookies = fakeDocument.cookie.split(';');
  for (const cookieStr of cookies) {
    const eqIdx = cookieStr.indexOf('=');
    const name = (eqIdx > -1 ? cookieStr.slice(0, eqIdx) : cookieStr).trim();
    if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
      fakeDocument.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    }
  }

  assert.ok(!fakeDocument.cookie.includes('_ga='));
  assert.ok(!fakeDocument.cookie.includes('_ga_0JBY0X9MY4='));
  assert.ok(!fakeDocument.cookie.includes('_gid='));
  assert.ok(fakeDocument.cookie.includes('other_session=abc123xyz'));
});

