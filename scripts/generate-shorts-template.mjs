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
      width: 1080px;
      height: 1920px;
      background: transparent;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .overlay-container {
      position: relative;
      width: 1080px;
      height: 1920px;
      background: transparent;
    }

    /* Top UI area: 10% = 192px */
    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 1080px;
      height: 192px;
      background: rgba(15, 23, 42, 0.45);
      border-bottom: 2px dashed rgba(244, 63, 94, 0.7);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      color: rgba(255, 255, 255, 0.85);
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    /* Bottom UI area: 25% = 480px */
    .bottom-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 1080px;
      height: 480px;
      background: rgba(15, 23, 42, 0.5);
      border-top: 2px dashed rgba(244, 63, 94, 0.7);
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      color: rgba(255, 255, 255, 0.85);
    }
    .bottom-label {
      font-size: 24px;
      font-weight: 700;
      color: #fda4af;
      margin-bottom: 12px;
    }
    .bottom-desc {
      font-size: 19px;
      line-height: 1.4;
      color: rgba(255, 255, 255, 0.75);
    }

    /* Right UI area: 18% = 194px from right, between top and bottom */
    .right-bar {
      position: absolute;
      top: 192px;
      right: 0;
      width: 194px;
      height: calc(1920px - 192px - 480px);
      background: rgba(15, 23, 42, 0.4);
      border-left: 2px dashed rgba(244, 63, 94, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      padding: 40px 10px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 17px;
      font-weight: 600;
      text-align: center;
    }

    /* Left buffer: 5% = 54px */
    .left-bar {
      position: absolute;
      top: 192px;
      left: 0;
      width: 54px;
      height: calc(1920px - 192px - 480px);
      background: rgba(15, 23, 42, 0.25);
      border-right: 2px dashed rgba(244, 63, 94, 0.5);
    }

    /* Center Safe Zone Outline */
    .safe-zone {
      position: absolute;
      top: 192px;
      left: 54px;
      width: calc(1080px - 54px - 194px);
      height: calc(1920px - 192px - 480px);
      border: 3px solid #10b981;
      background: transparent;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px;
      pointer-events: none;
    }
    .badge-top {
      align-self: flex-start;
      background: rgba(16, 185, 129, 0.85);
      color: #ffffff;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .badge-bottom {
      align-self: center;
      background: rgba(15, 23, 42, 0.75);
      border: 1px solid rgba(16, 185, 129, 0.5);
      color: #34d399;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 19px;
      font-weight: 600;
      text-align: center;
    }

    .ui-pill {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 10px 14px;
      border-radius: 20px;
      font-size: 15px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="overlay-container">
    <!-- Top Warning Area -->
    <div class="top-bar">
      <span>TOP MARGIN (192px)</span>
      <span style="font-size: 17px; opacity: 0.8;">Covered by Search & Sounds</span>
    </div>

    <!-- Left Buffer -->
    <div class="left-bar"></div>

    <!-- Center Safe Area -->
    <div class="safe-zone">
      <div class="badge-top">SAFE ZONE &middot; 832 &times; 1248 px</div>
      <div class="badge-bottom">
        Keep All Titles, Captions &amp; Focus Actions Inside This Green Area
      </div>
    </div>

    <!-- Right Interaction Buttons Area -->
    <div class="right-bar">
      <div class="ui-pill">&hearts; Like</div>
      <div class="ui-pill">&#128078; Dislike</div>
      <div class="ui-pill">&#128172; Comments</div>
      <div class="ui-pill">&#10150; Share</div>
      <div class="ui-pill">&#128260; Remix</div>
      <div class="ui-pill">&#9835; Sound</div>
    </div>

    <!-- Bottom Metadata Area -->
    <div class="bottom-bar">
      <div class="bottom-label">BOTTOM UI MARGIN (480px) &middot; DO NOT PLACE CAPTIONS HERE</div>
      <div class="bottom-desc">
        Covered by Channel Avatar, Name, Subscribe Button, Video Title, Audio Info, and Seek Bar.
      </div>
    </div>
  </div>
</body>
</html>`;

const tmpHtml = path.resolve('public/templates/tmp_shorts_overlay.html');
fs.writeFileSync(tmpHtml, html, 'utf8');

const targetPng1 = path.resolve('public/templates/youtube-shorts-safe-zone-template.png');
const targetPng2 = path.resolve('public/youtube-shorts-safe-zone-template.png');

try {
  const cmd = `"${browserPath}" --headless --disable-gpu --default-background-color=00000000 --window-size=1080,1920 --screenshot="${targetPng1}" "file://${tmpHtml.replace(/\\/g, '/')}"`;
  execSync(cmd, { stdio: 'pipe' });
  fs.copyFileSync(targetPng1, targetPng2);
  console.log(`Generated: ${targetPng1} and ${targetPng2}`);
} finally {
  if (fs.existsSync(tmpHtml)) {
    fs.unlinkSync(tmpHtml);
  }
}

