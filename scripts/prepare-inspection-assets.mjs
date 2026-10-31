import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const outDir = '.taste-skill/output';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generateAll() {
  console.log('Generating Before/After Inspection assets...');

  // 1. Thumbnail Resizer: Camera Rig (1600x1000 -> 1280x720)
  const cameraSourcePath = '.taste-skill/test-camera-rig.jpg';
  if (fs.existsSync(cameraSourcePath)) {
    const rawResizer = await sharp(cameraSourcePath)
      .resize(1600, 1000, { fit: 'cover', position: 'center' })
      .toBuffer();

    // Composite stylish creator thumbnail title overlay
    const resizerOverlay = Buffer.from(`
      <svg width="1600" height="1000" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#090a0f" stop-opacity="0.7" />
            <stop offset="30%" stop-color="#090a0f" stop-opacity="0.1" />
            <stop offset="70%" stop-color="#090a0f" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#090a0f" stop-opacity="0.8" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0284c7" />
            <stop offset="100%" stop-color="#0ea5e9" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#scrim)" />
        
        <!-- Category Pill Badge -->
        <g transform="translate(60, 60)">
          <rect width="210" height="44" rx="22" fill="#090a0f" fill-opacity="0.85" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />
          <circle cx="28" cy="22" r="7" fill="#0ea5e9" />
          <text x="48" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#ffffff" letter-spacing="0.5">GEAR LAB 4K</text>
        </g>

        <!-- Bold Title -->
        <text x="60" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="-1.5">
          CINEMA RIG
        </text>
        <text x="60" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" fill="#38bdf8" letter-spacing="-1.5">
          SETUP 2026
        </text>

        <!-- Lower Metadata Badge -->
        <g transform="translate(60, 880)">
          <rect width="320" height="48" rx="8" fill="#090a0f" fill-opacity="0.85" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1.5" />
          <text x="20" y="31" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#94a3b8">RAW 1600 × 1000 FRAME</text>
        </g>
      </svg>
    `);

    const sourceWithOverlay = await sharp(rawResizer)
      .composite([{ input: resizerOverlay }])
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(outDir, 'thumbnail-source.png'), sourceWithOverlay);

    // Resized target (1280x720, center crop)
    const resizedOutput = await sharp(sourceWithOverlay)
      .resize(1280, 720, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 90, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(path.join(outDir, 'thumbnail-resized.jpg'), resizedOutput);
    console.log('✓ Thumbnail Resizer assets created (1600x1000 -> 1280x720)');
  }

  // 2. Thumbnail Compressor: Podcast Studio (High texture detail)
  const podcastSourcePath = '.taste-skill/test-podcast-studio.jpg';
  if (fs.existsSync(podcastSourcePath)) {
    const rawPodcast = await sharp(podcastSourcePath)
      .resize(1600, 1000, { fit: 'cover', position: 'center' })
      .toBuffer();

    const compressorOverlay = Buffer.from(`
      <svg width="1600" height="1000" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="podScrim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#090a0f" stop-opacity="0.65" />
            <stop offset="35%" stop-color="#090a0f" stop-opacity="0.1" />
            <stop offset="70%" stop-color="#090a0f" stop-opacity="0.1" />
            <stop offset="100%" stop-color="#090a0f" stop-opacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#podScrim)" />

        <!-- Category Badge -->
        <g transform="translate(60, 60)">
          <rect width="230" height="44" rx="22" fill="#090a0f" fill-opacity="0.85" stroke="#ffffff" stroke-opacity="0.2" stroke-width="2" />
          <circle cx="28" cy="22" r="7" fill="#f59e0b" />
          <text x="48" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#ffffff" letter-spacing="0.5">STUDIO AUDIO</text>
        </g>

        <!-- Punchy Thumbnail Title -->
        <text x="60" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="-1.5">
          HOW I RECORD
        </text>
        <text x="60" y="285" font-family="system-ui, -apple-system, sans-serif" font-size="76" font-weight="900" fill="#fbbf24" letter-spacing="-1.5">
          PRO PODCASTS
        </text>

        <!-- Timestamp Pill -->
        <g transform="translate(1420, 910)">
          <rect width="120" height="42" rx="8" fill="#000000" fill-opacity="0.9" />
          <text x="60" y="27" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">24:15</text>
        </g>
      </svg>
    `);

    // High quality uncompressed original (~2.5 MB)
    const compressorSource = await sharp(rawPodcast)
      .composite([{ input: compressorOverlay }])
      .jpeg({ quality: 100, chromaSubsampling: '4:4:4' })
      .toBuffer();

    fs.writeFileSync(path.join(outDir, 'compressor-source.jpg'), compressorSource);

    // Compressed output (< 1 MB, 82% quality mozjpeg)
    const compressedOutput = await sharp(compressorSource)
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    fs.writeFileSync(path.join(outDir, 'thumbnail-compressed.jpg'), compressedOutput);
    console.log(`✓ Thumbnail Compressor assets created: ${compressorSource.length} bytes -> ${compressedOutput.length} bytes`);
  }

  // 3. Logo Background Remover: Creator Monogram Emblem (800x480)
  const logoWidth = 800;
  const logoHeight = 480;

  const logoGraphicSvg = `
    <svg width="${logoWidth}" height="${logoHeight}" viewBox="0 0 ${logoWidth} ${logoHeight}">
      <g transform="translate(400, 240)">
        <!-- Outer Crest Hexagon -->
        <polygon points="0,-150 130,-75 130,75 0,150 -130,75 -130,-75" fill="#090a0f" stroke="#2563eb" stroke-width="8" stroke-linejoin="round" />
        <polygon points="0,-132 114,-66 114,66 0,132 -114,66 -114,-66" fill="#0f172a" />
        
        <!-- Inner Glowing Accent Line -->
        <polygon points="0,-115 100,-58 100,58 0,115 -100,58 -100,-58" fill="none" stroke="#38bdf8" stroke-width="3" stroke-dasharray="16,8" opacity="0.6" />

        <!-- Microphone / Soundwave Glyph -->
        <!-- Mic Capsule -->
        <rect x="-24" y="-70" width="48" height="76" rx="24" fill="#38bdf8" />
        <rect x="-20" y="-66" width="40" height="34" rx="20" fill="#7dd3fc" />
        <!-- Mic Stand Arch -->
        <path d="M -36 -20 A 36 36 0 0 0 36 -20" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
        <line x1="0" y1="16" x2="0" y2="46" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
        <line x1="-30" y1="46" x2="30" y2="46" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />

        <!-- Brand Text Inside Crest -->
        <text x="0" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="3" text-anchor="middle">CREOVLY</text>
        <text x="0" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" letter-spacing="4" text-anchor="middle">AUDIO LAB</text>
      </g>
    </svg>
  `;

  // Transparent cutout
  const logoTransparent = await sharp(Buffer.from(logoGraphicSvg))
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(outDir, 'logo-transparent.png'), logoTransparent);

  // Source on solid white background
  const whiteBg = await sharp({
    create: {
      width: logoWidth,
      height: logoHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  const logoSource = await sharp(whiteBg)
    .composite([{ input: logoTransparent }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(outDir, 'logo-source.png'), logoSource);
  console.log('✓ Logo Background Remover assets created (solid white vs transparent PNG)');

  // 4. Shorts Safe Zone (1080x1920, 9:16 portrait)
  const shortsWidth = 1080;
  const shortsHeight = 1920;

  // Render atmospheric creator studio scene for shorts background
  const shortsBaseSvg = `
    <svg width="${shortsWidth}" height="${shortsHeight}" viewBox="0 0 ${shortsWidth} ${shortsHeight}">
      <defs>
        <radialGradient id="stageGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#1e1b4b" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </radialGradient>
        <linearGradient id="neonRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#ec4899" stop-opacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="${shortsWidth}" height="${shortsHeight}" fill="url(#stageGlow)" />
      
      <!-- Studio Lights / Ambient Glows -->
      <circle cx="200" cy="300" r="280" fill="#38bdf8" opacity="0.15" filter="blur(60px)" />
      <circle cx="880" cy="500" r="320" fill="#a855f7" opacity="0.18" filter="blur(80px)" />
      <circle cx="540" cy="1100" r="400" fill="#0284c7" opacity="0.12" filter="blur(90px)" />

      <!-- Creator Studio Silhouette / Mic Visual -->
      <g transform="translate(540, 780)">
        <ellipse cx="0" cy="180" rx="220" ry="260" fill="#0f172a" stroke="#38bdf8" stroke-width="4" stroke-opacity="0.4" />
        <circle cx="0" cy="60" r="110" fill="#1e293b" stroke="#ffffff" stroke-width="3" stroke-opacity="0.3" />
        <!-- Studio Mic in foreground -->
        <rect x="-30" y="140" width="60" height="110" rx="30" fill="#38bdf8" opacity="0.9" />
        <rect x="-6" y="250" x2="6" y2="350" width="12" height="120" fill="#64748b" />
      </g>

      <!-- Hook Subtitle Box (Central Safe Zone) -->
      <g transform="translate(540, 480)">
        <rect x="-380" y="-60" width="760" height="120" rx="24" fill="#000000" fill-opacity="0.8" stroke="#38bdf8" stroke-width="3" />
        <text x="0" y="-10" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
          HOW CREATORS GROW
        </text>
        <text x="0" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#38bdf8" text-anchor="middle" letter-spacing="2">
          IN 2026 // WORKFLOW
        </text>
      </g>
    </svg>
  `;

  const shortsSourceBuffer = await sharp(Buffer.from(shortsBaseSvg))
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(outDir, 'shorts-source.png'), shortsSourceBuffer);

  // Shorts Guide Overlay (with YouTube UI safe zones)
  const shortsGuideSvg = `
    <svg width="${shortsWidth}" height="${shortsHeight}" viewBox="0 0 ${shortsWidth} ${shortsHeight}">
      <!-- Shaded Margins (Danger Zones where YouTube UI covers video) -->
      <!-- Top header zone (10% = 192px) -->
      <rect x="0" y="0" width="${shortsWidth}" height="192" fill="#ef4444" fill-opacity="0.22" stroke="#ef4444" stroke-width="2" stroke-dasharray="12,6" />
      <text x="40" y="110" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#fca5a5">TOP ZONE (Search &amp; Audio header)</text>

      <!-- Bottom zone (25% = 480px, starts at 1440px) -->
      <rect x="0" y="1440" width="${shortsWidth}" height="480" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="2" stroke-dasharray="12,6" />
      <text x="40" y="1500" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="700" fill="#fca5a5">BOTTOM DANGER ZONE (Title, Channel, Sound)</text>

      <!-- Right sidebar zone (18% = 194px, from 886px) -->
      <rect x="886" y="192" width="194" height="1248" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="2" stroke-dasharray="12,6" />
      <text x="983" y="800" transform="rotate(90 983 800)" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="700" fill="#fca5a5" text-anchor="middle">UI ACTION RAIL</text>

      <!-- Left margin (5% = 54px) -->
      <rect x="0" y="192" width="54" height="1248" fill="#ef4444" fill-opacity="0.15" />

      <!-- CLEAR SAFE ZONE RECTANGLE (Center Green Area) -->
      <rect x="54" y="192" width="832" height="1248" fill="none" stroke="#22c55e" stroke-width="4" rx="12" />
      <g transform="translate(470, 240)">
        <rect x="-170" y="-24" width="340" height="48" rx="24" fill="#14532d" fill-opacity="0.9" stroke="#22c55e" stroke-width="2" />
        <text x="0" y="8" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#86efac" text-anchor="middle">SAFE ZONE (PASS)</text>
      </g>

      <!-- Mock YouTube UI Overlay Icons on Right -->
      <g transform="translate(970, 950)">
        <!-- Like -->
        <circle cx="0" cy="0" r="38" fill="#000000" fill-opacity="0.6" stroke="#ffffff" stroke-width="2" />
        <text x="0" y="10" font-size="32" text-anchor="middle" fill="#ffffff">👍</text>
        <text x="0" y="58" font-family="system-ui" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">64K</text>

        <!-- Dislike -->
        <circle cx="0" cy="130" r="38" fill="#000000" fill-opacity="0.6" stroke="#ffffff" stroke-width="2" />
        <text x="0" y="140" font-size="32" text-anchor="middle" fill="#ffffff">👎</text>
        <text x="0" y="188" font-family="system-ui" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">Dislike</text>

        <!-- Comments -->
        <circle cx="0" cy="260" r="38" fill="#000000" fill-opacity="0.6" stroke="#ffffff" stroke-width="2" />
        <text x="0" y="270" font-size="32" text-anchor="middle" fill="#ffffff">💬</text>
        <text x="0" y="318" font-family="system-ui" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">1.2K</text>

        <!-- Share -->
        <circle cx="0" cy="390" r="38" fill="#000000" fill-opacity="0.6" stroke="#ffffff" stroke-width="2" />
        <text x="0" y="400" font-size="32" text-anchor="middle" fill="#ffffff">↗</text>
        <text x="0" y="448" font-family="system-ui" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">Share</text>
      </g>

      <!-- Channel Bottom Bar in danger zone -->
      <g transform="translate(60, 1680)">
        <circle cx="40" cy="40" r="40" fill="#0284c7" />
        <text x="96" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="32" font-weight="800" fill="#ffffff">@CreatorStudio</text>
        <rect x="360" y="8" width="160" height="52" rx="26" fill="#ef4444" />
        <text x="440" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">Subscribe</text>
        <text x="96" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="24" fill="#cbd5e1">Inside My YouTube Studio Workflow &amp; Setup...</text>
      </g>
    </svg>
  `;

  const shortsGuideBuffer = await sharp(shortsSourceBuffer)
    .composite([{ input: Buffer.from(shortsGuideSvg) }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(outDir, 'shorts-guide.png'), shortsGuideBuffer);
  console.log('✓ YouTube Shorts Safe Zone assets created (1080x1920 clean frame vs UI danger overlay)');

  console.log('All 4 pairs generated successfully!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});

