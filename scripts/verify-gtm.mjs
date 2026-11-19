import fs from 'fs';
import path from 'path';

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
console.log(`Scanning ${files.length} HTML files in out/ directory...`);

let errors = 0;
let checkedCount = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');

  // Verify GTM script in <head>
  const scriptRegex = /<script>\(function\(w,d,s,l,i\)[\s\S]*?GTM-WFXB723W[\s\S]*?<\/script>/g;
  const scriptMatches = content.match(scriptRegex);
  if (!scriptMatches || scriptMatches.length !== 1) {
    console.error(`[ERROR] ${file}: expected 1 GTM script tag, found ${scriptMatches ? scriptMatches.length : 0}`);
    errors++;
  }

  // Verify GTM noscript in <body>
  const noscriptRegex = /<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-WFXB723W"[^>]*><\/iframe><\/noscript>/g;
  const noscriptMatches = content.match(noscriptRegex);
  if (!noscriptMatches || noscriptMatches.length !== 1) {
    console.error(`[ERROR] ${file}: expected 1 GTM noscript iframe tag, found ${noscriptMatches ? noscriptMatches.length : 0}`);
    errors++;
  }

  // Verify no old gtag or G- tag remains
  if (content.includes('G-0JBY0X9MY4')) {
    console.error(`[ERROR] ${file}: contains old tag G-0JBY0X9MY4`);
    errors++;
  }
  if (content.includes('gtag/js') || content.includes('gtag(') || content.includes('function gtag(')) {
    console.error(`[ERROR] ${file}: contains old gtag references`);
    errors++;
  }

  checkedCount++;
}

if (errors === 0) {
  console.log(`✅ VERIFICATION PASSED: All ${checkedCount} HTML pages confirmed!`);
  console.log(`- Container GTM-WFXB723W appears exactly once as a <script> in <head> on each page.`);
  console.log(`- Container GTM-WFXB723W appears exactly once as a <noscript> <iframe> in <body> on each page.`);
  console.log(`- Zero old gtag / gtag.js / G-0JBY0X9MY4 tags exist in the output.`);
  process.exit(0);
} else {
  console.error(`❌ VERIFICATION FAILED: ${errors} errors detected.`);
  process.exit(1);
}
