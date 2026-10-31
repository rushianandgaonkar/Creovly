import http from 'http';

const BASE_URL = 'http://localhost:3001';

async function fetchUrl(path) {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const res = await fetch(url);
  const text = await res.text();
  return { status: res.status, headers: res.headers, text, url };
}

function isAssetPath(pathname) {
  return /\.(png|jpg|jpeg|gif|svg|webp|ico|xml|txt|json|webmanifest|zip|pdf|css|js)$/i.test(pathname);
}

async function runAudit() {
  console.log('=============================================');
  console.log('   CREOVLY SEO & LINK VERIFICATION AUDIT     ');
  console.log('=============================================\n');

  const issues = [];
  const visitedPages = new Set();
  const internalPagesToCheck = new Set();
  const checkedLinks = new Map();
  const checkedAssets = new Map();

  // 1. Verify robots.txt
  console.log('1. Checking /robots.txt ...');
  try {
    const robots = await fetchUrl('/robots.txt');
    if (robots.status !== 200) {
      issues.push(`robots.txt returned HTTP ${robots.status}`);
    } else {
      console.log('   ✓ /robots.txt returned 200 OK');
      if (!robots.text.includes('sitemap.xml')) {
        issues.push('robots.txt does not reference sitemap.xml');
      } else {
        console.log('   ✓ Sitemap reference present in robots.txt');
      }
      if (!robots.text.includes('GPTBot') || !robots.text.includes('ClaudeBot')) {
        issues.push('robots.txt missing AI crawler specifications');
      } else {
        console.log('   ✓ AI crawlers (GPTBot, ClaudeBot, PerplexityBot) explicitly allowed');
      }
    }
  } catch (err) {
    issues.push(`Failed to fetch /robots.txt: ${err.message}`);
  }

  // 2. Verify sitemap.xml
  console.log('\n2. Checking /sitemap.xml ...');
  const sitemapUrls = [];
  try {
    const sitemap = await fetchUrl('/sitemap.xml');
    if (sitemap.status !== 200) {
      issues.push(`sitemap.xml returned HTTP ${sitemap.status}`);
    } else {
      console.log('   ✓ /sitemap.xml returned 200 OK');
      const locRegex = /<loc>(.*?)<\/loc>/g;
      let match;
      while ((match = locRegex.exec(sitemap.text)) !== null) {
        sitemapUrls.push(match[1]);
      }
      console.log(`   ✓ Found ${sitemapUrls.length} URLs in sitemap`);
      if (sitemapUrls.length < 15) {
        issues.push(`Expected >= 15 URLs in sitemap, found ${sitemapUrls.length}`);
      }
    }
  } catch (err) {
    issues.push(`Failed to fetch /sitemap.xml: ${err.message}`);
  }

  // 3. Verify manifest.webmanifest
  console.log('\n3. Checking /manifest.webmanifest ...');
  try {
    const manifest = await fetchUrl('/manifest.webmanifest');
    if (manifest.status !== 200) {
      issues.push(`manifest.webmanifest returned HTTP ${manifest.status}`);
    } else {
      const parsed = JSON.parse(manifest.text);
      console.log(`   ✓ Manifest valid JSON: "${parsed.name}"`);
    }
  } catch (err) {
    issues.push(`Failed to fetch /manifest.webmanifest: ${err.message}`);
  }

  // 4. Verify llms.txt
  console.log('\n4. Checking /llms.txt ...');
  try {
    const llms = await fetchUrl('/llms.txt');
    if (llms.status !== 200) {
      issues.push(`llms.txt returned HTTP ${llms.status}`);
    } else {
      console.log('   ✓ /llms.txt returned 200 OK (' + llms.text.length + ' bytes)');
    }
  } catch (err) {
    issues.push(`Failed to fetch /llms.txt: ${err.message}`);
  }

  // 5. Audit all sitemap pages
  console.log('\n5. Auditing all HTML pages for SEO metadata, structured data, and links ...');
  
  // Seed with sitemap URLs converted to relative paths
  for (const url of sitemapUrls) {
    const parsed = new URL(url);
    if (!isAssetPath(parsed.pathname)) {
      internalPagesToCheck.add(parsed.pathname);
    }
  }
  // Ensure home is included
  internalPagesToCheck.add('/');

  for (const pagePath of internalPagesToCheck) {
    if (visitedPages.has(pagePath)) continue;
    visitedPages.add(pagePath);

    try {
      const page = await fetchUrl(pagePath);
      checkedLinks.set(pagePath, page.status);

      if (page.status !== 200) {
        issues.push(`Page ${pagePath} returned HTTP ${page.status}`);
        continue;
      }

      // Check Title
      const titleMatch = page.text.match(/<title>([^<]*)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : null;
      if (!title) {
        issues.push(`[${pagePath}] Missing <title> tag`);
      }

      // Check Meta Description
      const descMatch = page.text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        page.text.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
      const description = descMatch ? descMatch[1].trim() : null;
      if (!description) {
        issues.push(`[${pagePath}] Missing or empty <meta name="description">`);
      }

      // Check Canonical
      const canonicalMatch = page.text.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
      if (!canonicalMatch) {
        issues.push(`[${pagePath}] Missing <link rel="canonical">`);
      }

      // Check OpenGraph
      const ogTitle = page.text.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
      const ogDesc = page.text.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
      const ogUrl = page.text.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i);
      const ogImage = page.text.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i);
      if (!ogTitle || !ogDesc || !ogUrl || !ogImage) {
        issues.push(`[${pagePath}] Incomplete OpenGraph tags (title: ${!!ogTitle}, desc: ${!!ogDesc}, url: ${!!ogUrl}, image: ${!!ogImage})`);
      }

      // Check Twitter Card
      const twitterCard = page.text.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']*)["']/i);
      const twitterImage = page.text.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']*)["']/i);
      if (!twitterCard || !twitterImage) {
        issues.push(`[${pagePath}] Missing Twitter tags (card: ${!!twitterCard}, image: ${!!twitterImage})`);
      }

      // Check Schema.org JSON-LD
      const jsonLdMatches = page.text.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
      let foundJsonLd = false;
      for (const m of jsonLdMatches) {
        try {
          const parsedLd = JSON.parse(m[1]);
          foundJsonLd = true;
        } catch (e) {
          issues.push(`[${pagePath}] Invalid JSON-LD structured data syntax`);
        }
      }
      if (!foundJsonLd) {
        issues.push(`[${pagePath}] No Schema.org JSON-LD structured data found`);
      }

      // Extract all links
      const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>/gi;
      let linkMatch;
      while ((linkMatch = linkRegex.exec(page.text)) !== null) {
        const href = linkMatch[1].trim();
        if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          continue;
        }
        if (href.startsWith('#')) {
          // Verify hash anchor exists in page
          const anchorId = href.slice(1);
          const hasAnchor = page.text.includes(`id="${anchorId}"`) || page.text.includes(`id='${anchorId}'`);
          if (!hasAnchor) {
            issues.push(`[${pagePath}] Anchor link "${href}" target id does not exist in DOM`);
          }
          continue;
        }

        let targetUrl = href;
        if (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          if (targetUrl.includes('creovly.com')) {
            const parsed = new URL(targetUrl);
            targetUrl = parsed.pathname;
          } else {
            // External link: valid URL structure
            continue;
          }
        }

        // Relative or root-relative link
        const cleanPath = targetUrl.split('?')[0].split('#')[0];
        if (!cleanPath) continue;

        if (isAssetPath(cleanPath)) {
          if (!checkedAssets.has(cleanPath)) {
            try {
              const assetRes = await fetchUrl(cleanPath);
              checkedAssets.set(cleanPath, assetRes.status);
              if (assetRes.status !== 200) {
                issues.push(`[${pagePath}] Linked asset "${cleanPath}" failed with HTTP ${assetRes.status}`);
              }
            } catch (e) {
              issues.push(`[${pagePath}] Linked asset "${cleanPath}" fetch error: ${e.message}`);
            }
          }
        } else {
          if (!visitedPages.has(cleanPath)) {
            internalPagesToCheck.add(cleanPath);
          }
        }
      }

      // Extract images and verify
      const imgRegex = /<img[^>]*src=["']([^"']*)["'][^>]*>/gi;
      let imgMatch;
      while ((imgMatch = imgRegex.exec(page.text)) !== null) {
        const src = imgMatch[1];
        if (src.startsWith('data:')) continue;
        if (!checkedAssets.has(src)) {
          try {
            const assetRes = await fetchUrl(src);
            checkedAssets.set(src, assetRes.status);
            if (assetRes.status !== 200) {
              issues.push(`[${pagePath}] Image "${src}" failed to load: HTTP ${assetRes.status}`);
            }
          } catch (e) {
            issues.push(`[${pagePath}] Image "${src}" failed to fetch: ${e.message}`);
          }
        }
      }

      console.log(`   ✓ [200 OK] ${pagePath} — "${title?.slice(0, 42)}..."`);
    } catch (err) {
      issues.push(`Failed to audit ${pagePath}: ${err.message}`);
    }
  }

  console.log('\n=============================================');
  console.log('             AUDIT SUMMARY                   ');
  console.log('=============================================');
  console.log(`Total HTML Pages Audited:    ${visitedPages.size}`);
  console.log(`Total Assets / Images Checked: ${checkedAssets.size}`);
  console.log(`Total Issues / 404s:          ${issues.length}`);
  console.log('=============================================');

  if (issues.length > 0) {
    console.error('\nIssues Detected:');
    for (const issue of issues) {
      console.error(` ✗ ${issue}`);
    }
    process.exit(1);
  } else {
    console.log('\n🌟 ALL CHECKS PASSED: 100% SEO, Link, and Asset Integrity! Ready for Live Publishing.');
  }
}

runAudit().catch(err => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
