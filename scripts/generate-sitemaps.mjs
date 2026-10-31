import fs from 'fs';
import path from 'path';

const today = new Date().toISOString().split('T')[0];

function generateSitemaps() {
  const outDir = path.resolve('out');
  const publicDir = path.resolve('public');

  if (!fs.existsSync(outDir)) {
    console.log('out directory does not exist yet; skipping post-build sitemaps.');
    return;
  }

  // 1. Ensure sitemap.xml exists in out
  const sitemapOutPath = path.join(outDir, 'sitemap.xml');
  if (!fs.existsSync(sitemapOutPath)) {
    console.error('Warning: out/sitemap.xml not found!');
    return;
  }

  const sitemapXmlContent = fs.readFileSync(sitemapOutPath, 'utf8');

  // 2. Generate sitemap-0.xml (identical full urlset)
  const sitemap0OutPath = path.join(outDir, 'sitemap-0.xml');
  fs.writeFileSync(sitemap0OutPath, sitemapXmlContent, 'utf8');
  console.log('✓ Created out/sitemap-0.xml');

  // Copy to public/ as well
  fs.writeFileSync(path.join(publicDir, 'sitemap-0.xml'), sitemapXmlContent, 'utf8');
  console.log('✓ Synced public/sitemap-0.xml');

  // 3. Generate sitemap_index.xml (standard Google sitemap index)
  const sitemapIndexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://creovly.com/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://creovly.com/sitemap-0.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://creovly.creovly.workers.dev/sitemap.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://creovly.creovly.workers.dev/sitemap-0.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

  const sitemapIndexOutPath = path.join(outDir, 'sitemap_index.xml');
  fs.writeFileSync(sitemapIndexOutPath, sitemapIndexContent, 'utf8');
  console.log('✓ Created out/sitemap_index.xml');

  // Copy to public/ as well
  fs.writeFileSync(path.join(publicDir, 'sitemap_index.xml'), sitemapIndexContent, 'utf8');
  console.log('✓ Synced public/sitemap_index.xml');
}

generateSitemaps();

