const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('app/layout.tsx installs GTM-WFXB723W and removes direct GA/gtag tags', () => {
  const layout = fs.readFileSync('app/layout.tsx', 'utf8');

  // Verify GTM container ID
  assert.ok(
    layout.includes('GTM-WFXB723W'),
    'app/layout.tsx must contain GTM container ID GTM-WFXB723W'
  );

  // Verify GTM head snippet
  assert.ok(
    layout.includes("https://www.googletagmanager.com/gtm.js?id='+i+dl"),
    'app/layout.tsx must contain standard GTM head snippet'
  );

  // Verify GTM noscript iframe in body
  assert.ok(
    layout.includes('https://www.googletagmanager.com/ns.html?id=GTM-WFXB723W'),
    'app/layout.tsx must contain standard GTM noscript iframe snippet'
  );

  // Verify old GA Measurement ID is completely removed
  assert.ok(
    !layout.includes('G-0JBY0X9MY4'),
    'app/layout.tsx must not contain old measurement ID G-0JBY0X9MY4'
  );

  // Verify direct gtag.js script loading is completely removed
  assert.ok(
    !layout.includes('/gtag/js'),
    'app/layout.tsx must not load gtag.js directly'
  );
});

test('built HTML output contains GTM-WFXB723W script and noscript and no old gtag', () => {
  if (!fs.existsSync('out')) return;

  function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getHtmlFiles(fullPath));
      } else if (file.endsWith('.html')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const files = getHtmlFiles('out');
  assert.ok(files.length > 0, 'out/ must contain built HTML files');

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');

    // 1 script tag for GTM
    const scriptMatches = html.match(/<script>\(function\(w,d,s,l,i\)[\s\S]*?GTM-WFXB723W[\s\S]*?<\/script>/g);
    assert.equal(
      scriptMatches?.length,
      1,
      `File ${file} must have exactly 1 GTM script tag`
    );

    // 1 noscript tag for GTM
    const noscriptMatches = html.match(/<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-WFXB723W"[^>]*><\/iframe><\/noscript>/g);
    assert.equal(
      noscriptMatches?.length,
      1,
      `File ${file} must have exactly 1 GTM noscript iframe tag`
    );

    // No old tag
    assert.ok(
      !html.includes('G-0JBY0X9MY4'),
      `File ${file} must not contain G-0JBY0X9MY4`
    );
    assert.ok(
      !html.includes('gtag/js'),
      `File ${file} must not contain gtag.js`
    );
  }
});
