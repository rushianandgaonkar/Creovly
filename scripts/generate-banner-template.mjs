import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outDir = path.resolve('public/templates');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function getBrowserPath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error('No browser found.');
}

const browserPath = getBrowserPath();

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 2560px;
      height: 1440px;
      background: transparent;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .overlay-container {
      position: relative;
      width: 2560px;
      height: 1440px;
      background: transparent;
    }

    /* TV Area: Top and Bottom outside the 423px central band */
    .tv-top {
      position: absolute;
      top: 0;
      left: 0;
      width: 2560px;
      height: 508px;
      background: rgba(15, 23, 42, 0.45);
      border-bottom: 2px dashed rgba(148, 163, 184, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
    .tv-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 2560px;
      height: 509px;
      background: rgba(15, 23, 42, 0.45);
      border-top: 2px dashed rgba(148, 163, 184, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.7);
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    /* Desktop Outer Wings: left & right of 1855px tablet */
    .desktop-wing-left {
      position: absolute;
      top: 508px;
      left: 0;
      width: 353px;
      height: 423px;
      background: rgba(30, 41, 59, 0.35);
      border-right: 2px dashed rgba(56, 189, 248, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      color: rgba(255, 255, 255, 0.65);
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }
    .desktop-wing-right {
      position: absolute;
      top: 508px;
      right: 0;
      width: 352px;
      height: 423px;
      background: rgba(30, 41, 59, 0.35);
      border-left: 2px dashed rgba(56, 189, 248, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      writing-mode: vertical-rl;
      color: rgba(255, 255, 255, 0.65);
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 0.05em;
    }

    /* Tablet Wings: between 1855px and 1546px */
    .tablet-wing-left {
      position: absolute;
      top: 508px;
      left: 353px;
      width: 154px;
      height: 423px;
      background: rgba(51, 65, 85, 0.25);
      border-right: 2px dashed rgba(168, 85, 247, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      font-weight: 600;
    }
    .tablet-wing-right {
      position: absolute;
      top: 508px;
      right: 352px;
      width: 155px;
      height: 423px;
      background: rgba(51, 65, 85, 0.25);
      border-left: 2px dashed rgba(168, 85, 247, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      writing-mode: vertical-rl;
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      font-weight: 600;
    }

    /* Safe Area: Center 1546 x 423 */
    .safe-zone {
      position: absolute;
      top: 508px;
      left: 507px;
      width: 1546px;
      height: 423px;
      border: 3px solid rgba(16, 185, 129, 0.95);
      background: rgba(16, 185, 129, 0.04);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      box-shadow: 0 0 50px rgba(16, 185, 129, 0.15) inset;
    }
    .safe-badge {
      background: rgba(16, 185, 129, 0.9);
      color: #022c22;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 8px 24px;
      border-radius: 9999px;
    }
    .safe-specs {
      text-align: center;
      color: rgba(255, 255, 255, 0.95);
      text-shadow: 0 2px 8px rgba(0,0,0,0.8);
    }
    .safe-specs h1 {
      font-size: 38px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
    }
    .safe-specs p {
      font-size: 22px;
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
    }
    .safe-footer {
      font-size: 18px;
      font-weight: 600;
      color: rgba(16, 185, 129, 0.9);
      letter-spacing: 0.05em;
    }

    /* Dimensions badge on canvas */
    .canvas-badge {
      position: absolute;
      top: 30px;
      left: 40px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 20px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .watermark {
      position: absolute;
      bottom: 30px;
      right: 40px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #94a3b8;
      padding: 8px 18px;
      border-radius: 10px;
      font-size: 18px;
      font-weight: 600;
    }
    .watermark span {
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="overlay-container">
    <div class="canvas-badge">
      <span>YOUTUBE BANNER SAFE ZONE TEMPLATE</span>
      <span style="color: #94a3b8;">·</span>
      <span style="color: #38bdf8;">2560 × 1440 PX</span>
    </div>

    <div class="tv-top">
      ▲ TV VISIBLE AREA ONLY (2560 × 1440) — CROPPED ON DESKTOP & MOBILE ▲
    </div>

    <div class="desktop-wing-left">
      DESKTOP MAX (2560 × 423)
    </div>

    <div class="tablet-wing-left">
      TABLET (1855 × 423)
    </div>

    <div class="safe-zone">
      <div class="safe-badge">SAFE AREA FOR ALL DEVICES</div>
      <div class="safe-specs">
        <h1>1546 × 423 PX</h1>
        <p>Keep all Channel Names, Logos, Socials & Important Text Inside This Box</p>
      </div>
      <div class="safe-footer">
        VISIBLE ON MOBILE, TABLET, DESKTOP & TV
      </div>
    </div>

    <div class="tablet-wing-right">
      TABLET (1855 × 423)
    </div>

    <div class="desktop-wing-right">
      DESKTOP MAX (2560 × 423)
    </div>

    <div class="tv-bottom">
      ▼ TV VISIBLE AREA ONLY (2560 × 1440) — CROPPED ON DESKTOP & MOBILE ▼
    </div>

    <div class="watermark">
      CREOVLY · <span>creovly.com</span>
    </div>
  </div>
</body>
</html>`;

const tmpHtml = path.resolve('public/templates/banner_temp.html');
fs.writeFileSync(tmpHtml, html, 'utf8');

const target1 = path.resolve('public/templates/youtube-banner-size-template.png');
const target2 = path.resolve('public/youtube-banner-size-template.png');

console.log('Generating YouTube Banner Safe Zone PNG template (2560x1440)...');

const cmd = `"${browserPath}" --headless --disable-gpu --default-background-color=00000000 --window-size=2560,1440 --screenshot="${target1}" "file://${tmpHtml}"`;
execSync(cmd);

fs.copyFileSync(target1, target2);
fs.unlinkSync(tmpHtml);

console.log(`✓ Template generated at ${target1} (${fs.statSync(target1).size} bytes)`);
console.log(`✓ Template copied to ${target2}`);

