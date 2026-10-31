# Homepage Tool Carousel: Real Creator Thumbnail Artwork

**Goal:** Upgrade the homepage hanging tool carousel (`PolaroidLineCarousel`) from abstract vector schematics (blue boxes, triangles, dashed lines) to rich, authentic YouTube creator thumbnail artwork and platform-true tool previews.

**Architecture:**
- Update `components/tools/ToolIllustration.tsx` into a creator-grade preview renderer that uses real raster assets (`<img>`) from `public/examples/` for thumbnail, shorts, and logo tools, and realistic platform UI cards for titles and calculators.
- Enhance `components/ui/polaroid-line-carousel.module.css` to give media cards high-impact contrast, clean aspect ratios (16:9 for thumbnails, 9:16 for Shorts, 1:1 for logos), and YouTube UI cues (like the bottom-right timestamp `14:20`).
- Remove monospace micro-labels in favor of clean typography in the text face.
- Preserve 100% of existing keyboard navigation, drag/swipe physics, active card state, and test invariants.

---

## Visual Design Specifications per Tool

1. **`logo-background-remover`**:
   - Shows real channel badge (`/examples/sample-gaming-badge-transparent.png`) against an alpha checkerboard pattern, visually demonstrating transparent background extraction.
   - Format badge: "PNG • Transparent".

2. **`youtube-thumbnail-compressor`**:
   - Real 16:9 YouTube thumbnail (`/examples/thumbnail-source.png` or `/examples/compressor-source.jpg`) with sharp contrast.
   - Simulated YouTube timestamp badge in bottom-right corner (`14:20`).
   - Clean file-size indicator badge: "1.1 MB • WebP" (Passes < 2MB limit).

3. **`youtube-thumbnail-resizer`**:
   - 16:9 thumbnail preview with subtle corner crop marks and dimension guides ("1280 × 720 HD").

4. **`youtube-shorts-safe-zone`**:
   - Real vertical Shorts frame (`/examples/shorts-source.png`) inside a 9:16 frame.
   - Overlaid with translucent YouTube Shorts UI elements (avatar, like button, sound wave, title margin) and a marked green "Safe Zone" box.

5. **`youtube-title-checker`**:
   - Simulated YouTube mobile feed card: 16:9 thumbnail preview, channel avatar, and video title with first 50 characters highlighted and truncation ellipsis.

6. **`youtube-revenue-calculator`**:
   - Rich revenue estimate display: "$2,450 / mo" with smooth upward earnings curve and view volume indicator.

7. **`youtube-rpm-calculator`**:
   - Creator RPM card: "$4.85 RPM" with revenue per 1,000 views comparison.

8. **`youtube-watch-hours-calculator`**:
   - YPP monetization progress tracker: "2,840 / 4,000 hrs" (71%) with "~42 days to YPP goal" pace.

9. **`youtube-monetization-calculator`**:
   - Multi-stream earnings stacked bar: AdSense (45%), Sponsors (35%), Memberships (20%).

---

## Tasks

- [x] Task 1: Update `ToolIllustration.tsx` to render realistic creator artwork and platform visuals using real images and believable UI fragments.
- [x] Task 2: Update `polaroid-line-carousel.module.css` and `polaroid-line-carousel.tsx` for visual hierarchy, image framing, and removal of monospace micro-labels.
- [x] Task 3: Verify with `npm test`, `npm run lint`, and `npm run build`.
- [x] Task 4: Run `design-taste-frontend` inspector (`inspect.mjs`) to verify screenshot renders and picture count improvements.
