import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const outDir = path.resolve('public/og');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Locate Chrome or Edge
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
  throw new Error('No supported browser (Chrome or Edge) found for OG image generation.');
}

const browserPath = getBrowserPath();
console.log(`Using browser for OG generation: ${browserPath}`);

const pages = [
  {
    filename: 'youtube-thumbnail-compressor.png',
    category: 'THUMBNAILS & SHORTS',
    tone: '#0070f3',
    glow: 'rgba(0, 112, 243, 0.25)',
    title: 'YouTube Thumbnail Compressor',
    description: 'Compress JPG, PNG, and WebP thumbnails under the 2 MB YouTube limit locally with zero cloud uploads.',
    pills: ['Under 2 MB Limit', 'Client-Side Canvas', 'Batch ZIP Export'],
    visual: `
      <div style="background:#131b2e;border:1px solid rgba(0,112,243,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#93c5fd;font-weight:700;letter-spacing:1px;">COMPRESSION BENCHMARK</span>
          <span style="background:rgba(16,185,129,0.2);color:#34d399;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">-84.7%</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-around;margin:16px 0;">
          <div style="text-align:center;">
            <div style="font-size:11px;color:#64748b;font-family:monospace;margin-bottom:4px;">BEFORE</div>
            <div style="font-size:26px;font-weight:800;color:#f87171;font-family:monospace;">4.2 MB</div>
            <div style="font-size:10px;color:#64748b;margin-top:2px;">Raw PNG</div>
          </div>
          <div style="font-size:24px;color:#38bdf8;">&rarr;</div>
          <div style="text-align:center;">
            <div style="font-size:11px;color:#64748b;font-family:monospace;margin-bottom:4px;">OPTIMIZED</div>
            <div style="font-size:26px;font-weight:800;color:#34d399;font-family:monospace;">642 KB</div>
            <div style="font-size:10px;color:#34d399;margin-top:2px;">YouTube Ready</div>
          </div>
        </div>
        <div style="background:#0f172a;border-radius:10px;padding:12px;border:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex;justify-content:space-between;font-size:11px;font-family:monospace;color:#94a3b8;margin-bottom:6px;">
            <span>Quality Encoder</span>
            <span style="color:#38bdf8;font-weight:700;">88% Balanced</span>
          </div>
          <div style="width:100%;height:6px;background:#1e293b;border-radius:99px;overflow:hidden;">
            <div style="width:88%;height:100%;background:linear-gradient(90deg,#0070f3,#38bdf8);"></div>
          </div>
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-thumbnail-resizer.png',
    category: 'THUMBNAILS & SHORTS',
    tone: '#0070f3',
    glow: 'rgba(0, 112, 243, 0.25)',
    title: 'YouTube Thumbnail Resizer',
    description: 'Resize thumbnails, channel banners, and profile pictures to exact platform dimensions with framing guides.',
    pills: ['1280×720 HD', '16:9 Aspect Ratio', 'Banner & Avatar Presets'],
    visual: `
      <div style="background:#131b2e;border:1px solid rgba(0,112,243,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#93c5fd;font-weight:700;letter-spacing:1px;">CANVAS PROPORTIONS</span>
          <span style="background:rgba(0,112,243,0.2);color:#60a5fa;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">16:9 PRESET</span>
        </div>
        <div style="width:100%;height:140px;background:#090d16;border:2px dashed #0070f3;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
          <div style="position:absolute;top:8px;left:10px;font-size:10px;font-family:monospace;color:#64748b;">1280 px</div>
          <div style="position:absolute;bottom:8px;right:10px;font-size:10px;font-family:monospace;color:#64748b;">720 px</div>
          <div style="font-size:32px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;">1280 × 720</div>
          <div style="font-size:11px;color:#38bdf8;font-family:monospace;margin-top:4px;">100% Crisp Center Crop</div>
        </div>
        <div style="display:flex;gap:8px;font-size:11px;font-family:monospace;">
          <div style="flex:1;background:#0f172a;padding:8px;border-radius:8px;text-align:center;color:#94a3b8;border:1px solid rgba(255,255,255,0.06);">Bilinear Scaler</div>
          <div style="flex:1;background:#0f172a;padding:8px;border-radius:8px;text-align:center;color:#94a3b8;border:1px solid rgba(255,255,255,0.06);">Safe Margins</div>
        </div>
      </div>
    `,
  },
  {
    filename: 'logo-background-remover.png',
    category: 'THUMBNAILS & SHORTS',
    tone: '#0070f3',
    glow: 'rgba(0, 112, 243, 0.25)',
    title: 'Logo Background Remover',
    description: 'Remove solid-color backgrounds from existing logos locally with adjustable tolerance and transparent PNG export.',
    pills: ['Alpha Channel PNG', 'Local Flood Fill', 'Zero Image Uploads'],
    visual: `
      <div style="background:#131b2e;border:1px solid rgba(0,112,243,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#93c5fd;font-weight:700;letter-spacing:1px;">ALPHA EXTRACTION</span>
          <span style="background:rgba(56,189,248,0.2);color:#38bdf8;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">TRANSPARENT PNG</span>
        </div>
        <div style="display:flex;gap:12px;height:140px;">
          <div style="flex:1;background:#ffffff;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
            <div style="width:50px;height:50px;background:#0070f3;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:20px;">YT</div>
            <div style="position:absolute;bottom:6px;font-size:9px;color:#64748b;font-family:monospace;">SOLID WHITE BG</div>
          </div>
          <div style="display:flex;align-items:center;color:#38bdf8;font-size:20px;">&rarr;</div>
          <div style="flex:1;background-image:linear-gradient(45deg,#1e293b 25%,transparent 25%),linear-gradient(-45deg,#1e293b 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1e293b 75%),linear-gradient(-45deg,transparent 75%,#1e293b 75%);background-size:16px 16px;background-position:0 0,0 8px,8px -8px,-8px 0;background-color:#0f172a;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;border:1px solid rgba(0,112,243,0.4);">
            <div style="width:50px;height:50px;background:#0070f3;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:20px;">YT</div>
            <div style="position:absolute;bottom:6px;font-size:9px;color:#38bdf8;font-family:monospace;">CLEAN ALPHA</div>
          </div>
        </div>
        <div style="background:#0f172a;padding:8px 12px;border-radius:8px;font-size:11px;font-family:monospace;color:#94a3b8;display:flex;justify-content:space-between;border:1px solid rgba(255,255,255,0.06);">
          <span>Color Tolerance</span>
          <span style="color:#34d399;font-weight:700;">Exact Border Match</span>
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-shorts-safe-zone.png',
    category: 'THUMBNAILS & SHORTS',
    tone: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.25)',
    title: 'YouTube Shorts Safe Zone Checker',
    description: 'Verify vertical 9:16 safe areas and overlay collision zones to keep subtitles, faces, and branding visible.',
    pills: ['9:16 Vertical Video', 'Right Rail Stack', 'Subtitle Safe Corridor'],
    visual: `
      <div style="background:#22131b;border:1px solid rgba(244,63,94,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#fda4af;font-weight:700;letter-spacing:1px;">MOBILE OVERLAY ZONES</span>
          <span style="background:rgba(244,63,94,0.2);color:#fb7185;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">9:16 VERTICAL</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:16px;">
          <div style="width:100px;height:160px;background:#090d16;border:2px solid #f43f5e;border-radius:14px;position:relative;overflow:hidden;padding:6px;display:flex;flex-direction:column;justify-content:space-between;">
            <div style="height:18px;background:rgba(244,63,94,0.2);border:1px dashed #f43f5e;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fda4af;font-family:monospace;">TOP SEARCH</div>
            <div style="height:55px;background:rgba(16,185,129,0.2);border:1px solid #10b981;border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:8px;color:#34d399;font-family:monospace;text-align:center;font-weight:700;">
              <span>SAFE</span>
              <span>CORRIDOR</span>
            </div>
            <div style="height:36px;background:rgba(244,63,94,0.2);border:1px dashed #f43f5e;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fda4af;font-family:monospace;">TITLE / AVATAR</div>
            <div style="position:absolute;right:4px;top:40px;width:12px;height:50px;background:rgba(244,63,94,0.3);border-radius:3px;"></div>
          </div>
          <div style="font-size:11px;font-family:monospace;color:#e2e8f0;space-y:6px;">
            <div style="color:#34d399;font-weight:700;margin-bottom:4px;">&bull; 40–65% Subtitle Corridor</div>
            <div style="color:#fda4af;margin-bottom:4px;">&bull; 18% Right Like Rail</div>
            <div style="color:#fda4af;">&bull; 28% Bottom Title Wrap</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-title-checker.png',
    category: 'TITLE TOOLS',
    tone: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.25)',
    title: 'YouTube Title Checker & Analyzer',
    description: 'Test YouTube video titles for mobile character truncation, hook strength, curiosity gaps, and power words.',
    pills: ['60-Char Limit', 'Mobile Truncation Preview', 'Hook Scoring Engine'],
    visual: `
      <div style="background:#1c172e;border:1px solid rgba(139,92,246,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#c4b5fd;font-weight:700;letter-spacing:1px;">MOBILE WRAP AUDIT</span>
          <span style="background:rgba(139,92,246,0.2);color:#a78bfa;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">OPTIMAL HOOK</span>
        </div>
        <div style="background:#090d16;border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:11px;font-family:monospace;color:#94a3b8;">Character Length</span>
            <span style="font-size:14px;font-family:monospace;color:#34d399;font-weight:800;">54 / 60</span>
          </div>
          <div style="width:100%;height:8px;background:#1e293b;border-radius:99px;overflow:hidden;margin-bottom:12px;">
            <div style="width:90%;height:100%;background:linear-gradient(90deg,#8b5cf6,#10b981);"></div>
          </div>
          <div style="font-size:13px;font-weight:700;color:#f8fafc;line-height:1.3;">
            I Tested 5 YouTube Growth Strategies (Only 1 Worked)
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-family:monospace;">
          <span style="color:#a78bfa;font-weight:700;">Score: 94 / 100</span>
          <span style="color:#34d399;">✓ No Mobile Ellipsis</span>
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-revenue-calculator.png',
    category: 'MONEY & GROWTH',
    tone: '#0d9488',
    glow: 'rgba(13, 148, 136, 0.25)',
    title: 'YouTube Revenue Calculator',
    description: 'Calculate realistic channel earnings based on actual views and RPM, separating long-form from Shorts payouts.',
    pills: ['Creator Net RPM', 'No Double 45% Cut', 'Monthly & Annual Forecast'],
    visual: `
      <div style="background:#112423;border:1px solid rgba(13,148,136,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#5eead4;font-weight:700;letter-spacing:1px;">NET ESTIMATED EARNINGS</span>
          <span style="background:rgba(13,148,136,0.2);color:#2dd4bf;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">MONTHLY SCENARIO</span>
        </div>
        <div style="background:#090d16;border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.06);text-align:center;">
          <div style="font-size:11px;color:#94a3b8;font-family:monospace;margin-bottom:4px;">ESTIMATED DEPOSIT</div>
          <div style="font-size:38px;font-weight:900;color:#2dd4bf;font-family:monospace;letter-spacing:-0.03em;">$1,550.00</div>
          <div style="font-size:11px;color:#64748b;margin-top:4px;font-family:monospace;">250,000 Views &bull; $6.20 Net RPM</div>
        </div>
        <div style="display:flex;gap:8px;font-size:11px;font-family:monospace;">
          <div style="flex:1;background:#0a1a19;padding:8px;border-radius:8px;text-align:center;color:#5eead4;border:1px solid rgba(13,148,136,0.2);">Annual: $18,600</div>
          <div style="flex:1;background:#0a1a19;padding:8px;border-radius:8px;text-align:center;color:#5eead4;border:1px solid rgba(13,148,136,0.2);">Per View: $0.0062</div>
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-rpm-calculator.png',
    category: 'MONEY & GROWTH',
    tone: '#0d9488',
    glow: 'rgba(13, 148, 136, 0.25)',
    title: 'YouTube RPM Calculator',
    description: 'Determine your true Revenue Per Mille from actual earnings and views without confusing advertiser CPM.',
    pills: ['(Revenue ÷ Views) × 1,000', 'Blended Creator Income', 'CPM vs RPM Clarity'],
    visual: `
      <div style="background:#112423;border:1px solid rgba(13,148,136,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#5eead4;font-weight:700;letter-spacing:1px;">METRIC FORMULA</span>
          <span style="background:rgba(13,148,136,0.2);color:#2dd4bf;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">TRUE TAKE-HOME</span>
        </div>
        <div style="background:#090d16;border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.06);">
          <div style="font-size:12px;color:#94a3b8;font-family:monospace;margin-bottom:8px;">Formula Verification:</div>
          <div style="font-size:18px;font-weight:800;color:#f8fafc;font-family:monospace;letter-spacing:-0.01em;">
            ($4,850 ÷ 1,000,000) × 1,000
          </div>
          <div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.08);display:flex;justify-content:space-between;align-items:baseline;">
            <span style="font-size:11px;color:#64748b;font-family:monospace;">Realized RPM</span>
            <span style="font-size:28px;font-weight:900;color:#2dd4bf;font-family:monospace;">$4.85</span>
          </div>
        </div>
        <div style="font-size:10px;font-family:monospace;color:#94a3b8;text-align:center;">
          Includes Ads, YouTube Premium & Memberships
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-watch-hours-calculator.png',
    category: 'MONEY & GROWTH',
    tone: '#0d9488',
    glow: 'rgba(13, 148, 136, 0.25)',
    title: 'YouTube Watch Hours Calculator',
    description: 'Track your trajectory to the 4,000 public watch hours requirement for the YouTube Partner Program.',
    pills: ['4,000 Hours Target', 'Days to Monetization', 'Average View Duration'],
    visual: `
      <div style="background:#112423;border:1px solid rgba(13,148,136,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#5eead4;font-weight:700;letter-spacing:1px;">YPP MILESTONE</span>
          <span style="background:rgba(16,185,129,0.2);color:#34d399;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">78% COMPLETE</span>
        </div>
        <div style="background:#090d16;border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span style="font-size:11px;font-family:monospace;color:#94a3b8;">Public Watch Hours</span>
            <span style="font-size:14px;font-family:monospace;color:#2dd4bf;font-weight:800;">3,120 / 4,000</span>
          </div>
          <div style="width:100%;height:10px;background:#1e293b;border-radius:99px;overflow:hidden;margin-bottom:12px;">
            <div style="width:78%;height:100%;background:linear-gradient(90deg,#0d9488,#10b981);"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;font-family:monospace;color:#64748b;">
            <span>Remaining: 880 hrs</span>
            <span style="color:#34d399;font-weight:700;">Est: 34 Days</span>
          </div>
        </div>
        <div style="font-size:11px;font-family:monospace;color:#5eead4;text-align:center;">
          Based on current pace of 26 hrs/day
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-monetization-calculator.png',
    category: 'MONEY & GROWTH',
    tone: '#0d9488',
    glow: 'rgba(13, 148, 136, 0.25)',
    title: 'YouTube Monetization Calculator',
    description: 'Model blended creator income streams including ad revenue, channel memberships, and super thanks.',
    pills: ['Multi-Stream Model', 'Memberships & Tips', 'Gross vs Net Revenue'],
    visual: `
      <div style="background:#112423;border:1px solid rgba(13,148,136,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#5eead4;font-weight:700;letter-spacing:1px;">BLENDED REVENUE STREAMS</span>
          <span style="background:rgba(13,148,136,0.2);color:#2dd4bf;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">CREATOR STACK</span>
        </div>
        <div style="space-y:6px;font-size:11px;font-family:monospace;">
          <div style="display:flex;justify-content:space-between;background:#090d16;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);">
            <span style="color:#94a3b8;">Video AdSense:</span>
            <span style="color:#f8fafc;font-weight:700;">$1,850.00</span>
          </div>
          <div style="display:flex;justify-content:space-between;background:#090d16;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);margin-top:6px;">
            <span style="color:#94a3b8;">Channel Memberships:</span>
            <span style="color:#f8fafc;font-weight:700;">$340.00</span>
          </div>
          <div style="display:flex;justify-content:space-between;background:#090d16;padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);margin-top:6px;">
            <span style="color:#94a3b8;">Super Thanks & Tips:</span>
            <span style="color:#f8fafc;font-weight:700;">$120.00</span>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:12px;color:#94a3b8;font-family:monospace;">Total Monthly Deposit:</span>
          <span style="font-size:24px;font-weight:900;color:#2dd4bf;font-family:monospace;">$2,310.00</span>
        </div>
      </div>
    `,
  },
  {
    filename: 'youtube-thumbnail-blueprint.png',
    category: 'CREATOR EDITORIAL GUIDE',
    tone: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.25)',
    title: 'The YouTube Thumbnail Blueprint',
    description: 'Verified platform guidelines for 1280×720 aspect ratios, 2 MB mobile upload caps, and mobile-first legibility.',
    pills: ['1280×720 Resolution', '2 MB Upload Cap', 'Timestamp Dead Zone'],
    visual: `
      <div style="background:#191836;border:1px solid rgba(99,102,241,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#a5b4fc;font-weight:700;letter-spacing:1px;">PLATFORM SPECIFICATION</span>
          <span style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">VERIFIED 2026</span>
        </div>
        <div style="width:100%;height:140px;background:#090d16;border:1px solid rgba(255,255,255,0.1);border-radius:12px;position:relative;overflow:hidden;padding:12px;">
          <div style="font-size:12px;font-weight:700;color:#f8fafc;font-family:monospace;">Primary Subject / Face</div>
          <div style="font-size:10px;color:#64748b;font-family:monospace;margin-top:2px;">Safe focal zone</div>
          <div style="position:absolute;bottom:0;right:0;width:90px;height:42px;background:rgba(239,68,68,0.3);border-top:1px dashed #ef4444;border-left:1px dashed #ef4444;border-top-left-radius:8px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fca5a5;font-family:monospace;font-weight:700;text-align:center;">
            DURATION BADGE
          </div>
        </div>
        <div style="font-size:11px;font-family:monospace;color:#a5b4fc;display:flex;justify-content:space-between;">
          <span>&bull; 15% Zoom Small-Scale Test</span>
          <span>&bull; 3-Word Focal Rule</span>
        </div>
      </div>
    `,
  },
  {
    filename: 'decoding-youtube-rpm.png',
    category: 'CREATOR EDITORIAL GUIDE',
    tone: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.25)',
    title: 'Decoding YouTube RPM: How Creators Get Paid',
    description: 'The mathematical reality of creator RPM vs. advertiser CPM, included revenue streams, and avoiding double deductions.',
    pills: ['CPM vs RPM', 'No Double 45% Error', 'Shorts Creator Pool'],
    visual: `
      <div style="background:#191836;border:1px solid rgba(99,102,241,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#a5b4fc;font-weight:700;letter-spacing:1px;">MONETIZATION BLUEPRINT</span>
          <span style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">OFFICIAL MATH</span>
        </div>
        <div style="display:flex;gap:12px;">
          <div style="flex:1;background:#090d16;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);text-align:center;">
            <div style="font-size:10px;color:#64748b;font-family:monospace;">GROSS CPM</div>
            <div style="font-size:22px;font-weight:800;color:#94a3b8;font-family:monospace;margin:4px 0;">$11.27</div>
            <div style="font-size:9px;color:#64748b;">Advertiser Spend</div>
          </div>
          <div style="flex:1;background:#090d16;padding:12px;border-radius:10px;border:1px solid rgba(99,102,241,0.3);text-align:center;">
            <div style="font-size:10px;color:#a5b4fc;font-family:monospace;">NET RPM</div>
            <div style="font-size:22px;font-weight:800;color:#818cf8;font-family:monospace;margin:4px 0;">$6.20</div>
            <div style="font-size:9px;color:#34d399;">Creator Take-Home</div>
          </div>
        </div>
        <div style="background:#090d16;padding:8px 12px;border-radius:8px;font-size:11px;font-family:monospace;color:#34d399;text-align:center;border:1px solid rgba(16,185,129,0.2);">
          ✓ Platform 45% revenue cut already deducted
        </div>
      </div>
    `,
  },
  {
    filename: 'guide-youtube-shorts-safe-zone.png',
    category: 'CREATOR EDITORIAL GUIDE',
    tone: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.25)',
    title: 'Shorts Safe Zones: Keeping Subtitles Unobscured',
    description: 'Layout guidelines for 9:16 vertical video, interactive player UI overlays, and screen aspect ratio variations.',
    pills: ['1080×1920 9:16', 'Interface Dead Zones', 'Device Ratio Variance'],
    visual: `
      <div style="background:#191836;border:1px solid rgba(99,102,241,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#a5b4fc;font-weight:700;letter-spacing:1px;">EDITORIAL REFERENCE</span>
          <span style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">SAFE BOUNDS</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:center;gap:16px;">
          <div style="width:100px;height:160px;background:#090d16;border:2px solid #818cf8;border-radius:14px;position:relative;overflow:hidden;padding:6px;display:flex;flex-direction:column;justify-content:space-between;">
            <div style="height:18px;background:rgba(99,102,241,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#a5b4fc;font-family:monospace;">TOP NAV</div>
            <div style="height:55px;background:rgba(16,185,129,0.2);border:1px solid #10b981;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#34d399;font-family:monospace;font-weight:700;text-align:center;">
              SUBTITLE CORRIDOR
            </div>
            <div style="height:36px;background:rgba(99,102,241,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:8px;color:#a5b4fc;font-family:monospace;">TITLE WRAP</div>
            <div style="position:absolute;right:4px;top:40px;width:12px;height:50px;background:rgba(99,102,241,0.4);border-radius:3px;"></div>
          </div>
          <div style="font-size:11px;font-family:monospace;color:#cbd5e1;">
            <div style="color:#34d399;font-weight:700;margin-bottom:4px;">Y=770 to Y=1250</div>
            <div style="color:#a5b4fc;margin-bottom:4px;">&bull; Inset Subtitles</div>
            <div style="color:#94a3b8;">&bull; 19.5:9 Safe Buffer</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    filename: 'tools.png',
    category: 'CREATOR DIRECTORY',
    tone: '#0070f3',
    glow: 'rgba(0, 112, 243, 0.25)',
    title: 'Free In-Browser YouTube Creator Tools',
    description: 'Compress and resize thumbnails, check title hooks, verify Shorts safe zones, and model revenue with zero server uploads.',
    pills: ['100% In-Browser', 'No Accounts Required', 'Complete Privacy'],
    visual: `
      <div style="background:#131b2e;border:1px solid rgba(0,112,243,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#93c5fd;font-weight:700;letter-spacing:1px;">WORKSPACE UTILITIES</span>
          <span style="background:rgba(0,112,243,0.2);color:#60a5fa;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">9 NATIVE TOOLS</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">
          <div style="background:#090d16;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;">
            <span style="color:#38bdf8;">01.</span> Compressor
          </div>
          <div style="background:#090d16;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;">
            <span style="color:#38bdf8;">02.</span> Resizer
          </div>
          <div style="background:#090d16;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;">
            <span style="color:#fb7185;">03.</span> Shorts Safe Zone
          </div>
          <div style="background:#090d16;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;">
            <span style="color:#a78bfa;">04.</span> Title Checker
          </div>
        </div>
        <div style="font-size:11px;font-family:monospace;color:#34d399;text-align:center;">
          ✓ Client-side canvas processing &bull; Zero data leaks
        </div>
      </div>
    `,
  },
  {
    filename: 'guides.png',
    category: 'CREATOR GUIDES',
    tone: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.25)',
    title: 'Creator Guides & Engineering Benchmarks',
    description: 'Engineered guides covering YouTube packaging standards, thumbnail requirements, RPM mathematics, and Shorts safe zones.',
    pills: ['Platform Verified', 'Mathematical Rigor', 'No Fluff Guidelines'],
    visual: `
      <div style="background:#191836;border:1px solid rgba(99,102,241,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#a5b4fc;font-weight:700;letter-spacing:1px;">ENGINEERED BENCHMARKS</span>
          <span style="background:rgba(99,102,241,0.2);color:#818cf8;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">VERIFIED DOCS</span>
        </div>
        <div style="space-y:8px;">
          <div style="background:#090d16;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;">
            &bull; Thumbnail Blueprint: 1280×720 & 2MB Limits
          </div>
          <div style="background:#090d16;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;margin-top:6px;">
            &bull; Decoding RPM: CPM vs Take-Home Math
          </div>
          <div style="background:#090d16;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);font-size:11px;font-family:monospace;color:#f8fafc;margin-top:6px;">
            &bull; Shorts Safe Zones: Subtitle Corridor Bounds
          </div>
        </div>
        <div style="font-size:11px;font-family:monospace;color:#a5b4fc;text-align:center;">
          Citing official Google & YouTube documentation
        </div>
      </div>
    `,
  },
  {
    filename: 'about.png',
    category: 'ABOUT & PRESS',
    tone: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.25)',
    title: 'About Creovly — The Pre-Publish Workspace',
    description: 'An independent, privacy-first command center providing 100% in-browser YouTube creator utilities.',
    pills: ['Private & Independent', 'Zero Cloud Uploads', 'Client-Side Canvas'],
    visual: `
      <div style="background:#1c172e;border:1px solid rgba(139,92,246,0.3);border-radius:18px;padding:24px;width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;font-family:monospace;color:#c4b5fd;font-weight:700;letter-spacing:1px;">BRAND MANIFESTO</span>
          <span style="background:rgba(139,92,246,0.2);color:#a78bfa;font-size:11px;font-weight:700;padding:4px 8px;border-radius:6px;font-family:monospace;">CREOVLY.COM</span>
        </div>
        <div style="background:#090d16;border-radius:12px;padding:16px;border:1px solid rgba(255,255,255,0.06);text-align:center;">
          <div style="font-size:26px;font-weight:900;color:#f8fafc;letter-spacing:-0.02em;margin-bottom:6px;">
            Create smarter.<br />Publish better.
          </div>
          <div style="font-size:11px;color:#a78bfa;font-family:monospace;">100% In-Browser Creator Tools</div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;font-family:monospace;color:#94a3b8;">
          <span>&bull; No Account Needed</span>
          <span>&bull; Zero Server Storage</span>
        </div>
      </div>
    `,
  },
];

function generateHtml(page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #080c14;
    color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px;
  }

  /* Ambient gradient aura */
  .glow {
    position: absolute;
    width: 600px;
    height: 600px;
    right: -100px;
    top: -100px;
    background: radial-gradient(circle, ${page.glow} 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .glow-left {
    position: absolute;
    width: 400px;
    height: 400px;
    left: -150px;
    bottom: -150px;
    background: radial-gradient(circle, rgba(0, 112, 243, 0.12) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  /* Subtle grid texture */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .brand-logo {
    width: 36px;
    height: 36px;
  }
  .brand-name {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
  .brand-domain {
    font-size: 13px;
    font-family: monospace;
    color: #64748b;
    margin-left: 4px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 12px;
    font-family: monospace;
    font-weight: 700;
    color: #e2e8f0;
    letter-spacing: 0.5px;
  }
  .badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 8px #10b981;
  }

  /* Content area */
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    position: relative;
    z-index: 10;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .left {
    flex: 1.15;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .category-tag {
    font-size: 13px;
    font-family: monospace;
    font-weight: 800;
    letter-spacing: 1.5px;
    color: ${page.tone};
  }
  .title {
    font-size: 46px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.12;
    color: #ffffff;
  }
  .description {
    font-size: 18px;
    line-height: 1.45;
    color: #94a3b8;
    max-width: 580px;
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }
  .pill {
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 11px;
    font-family: monospace;
    color: #cbd5e1;
    font-weight: 600;
  }

  .right {
    flex: 0.85;
    height: 290px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Footer */
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
    z-index: 10;
  }
  .tagline {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
  }
  .tagline strong {
    color: #e2e8f0;
  }
  .privacy-note {
    font-size: 12px;
    font-family: monospace;
    color: #38bdf8;
    display: flex;
    align-items: center;
    gap: 6px;
  }
</style>
</head>
<body>
  <div class="grid-pattern"></div>
  <div class="glow"></div>
  <div class="glow-left"></div>

  <!-- Header -->
  <div class="header">
    <div class="brand">
      <svg class="brand-logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#ffffff" stroke-width="2" />
        <path d="M9 7.5L15.5 12L9 16.5V7.5Z" fill="${page.tone}" />
      </svg>
      <span class="brand-name">CREOVLY</span>
      <span class="brand-domain">creovly.com</span>
    </div>
    <div class="badge">
      <span class="badge-dot"></span>
      <span>100% IN-BROWSER</span>
    </div>
  </div>

  <!-- Content -->
  <div class="content">
    <div class="left">
      <div class="category-tag">${page.category}</div>
      <h1 class="title">${page.title}</h1>
      <p class="description">${page.description}</p>
      <div class="pills">
        ${page.pills.map((p) => `<div class="pill">${p}</div>`).join('')}
      </div>
    </div>
    <div class="right">
      ${page.visual}
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="tagline">
      <strong>Creovly Workspace</strong> &mdash; Create smarter. Publish better.
    </div>
    <div class="privacy-note">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
      <span>Zero Cloud Storage &bull; Private Canvas Processing</span>
    </div>
  </div>
</body>
</html>`;
}

async function generateAll() {
  console.log(`\nGenerating ${pages.length} unique Open Graph images in /public/og/...`);
  const tempHtmlPath = path.resolve('temp-og.html');

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const outPngPath = path.join(outDir, page.filename);
    const html = generateHtml(page);
    fs.writeFileSync(tempHtmlPath, html, 'utf8');

    const fileUrl = `file:///${tempHtmlPath.replace(/\\/g, '/')}`;
    console.log(`[${i + 1}/${pages.length}] Generating ${page.filename}...`);

    try {
      execSync(
        `"${browserPath}" --headless=new --no-sandbox --disable-gpu --screenshot="${outPngPath}" --window-size=1200,630 "${fileUrl}"`,
        { stdio: 'pipe' }
      );
      const stats = fs.statSync(outPngPath);
      console.log(`   ✓ ${page.filename} written (${stats.size} bytes)`);
    } catch (err) {
      console.error(`   ✗ Error generating ${page.filename}:`, err.message);
    }
  }

  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  console.log('\n✓ All unique Open Graph images generated successfully in /public/og/\n');
}

generateAll();

