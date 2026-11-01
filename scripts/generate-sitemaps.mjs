import fs from 'fs';
import path from 'path';

function syncStaticSitemaps() {
  const outDir = path.resolve('out');
  const publicDir = path.resolve('public');

  if (!fs.existsSync(outDir)) {
    console.log('out directory does not exist yet; skipping post-build sitemap sync.');
    return;
  }

  // 1. Sync canonical sitemap.xml
  const sitemapOutPath = path.join(outDir, 'sitemap.xml');
  if (fs.existsSync(sitemapOutPath)) {
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fs.readFileSync(sitemapOutPath, 'utf8'), 'utf8');
    console.log('✓ Synced canonical public/sitemap.xml');
  }

  // 2. Sync robots.txt
  const robotsOutPath = path.join(outDir, 'robots.txt');
  if (fs.existsSync(robotsOutPath)) {
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), fs.readFileSync(robotsOutPath, 'utf8'), 'utf8');
    console.log('✓ Synced public/robots.txt');
  }

  // 3. Clean up any stale legacy sitemap files in out/
  for (const legacy of ['sitemap-0.xml', 'sitemap_index.xml']) {
    const p = path.join(outDir, legacy);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
}

syncStaticSitemaps();
