# Creovly (creovly.com): SEO changes

Source: on-page check of all 9 tool pages plus Ahrefs keyword data (US), 2026-11-08.

## Rules for every change

- Do **not** change any URL slug. If one must change, add a 301 redirect from the old URL.
- Keep each `<title>` under about 60 characters and each meta description under about 155.
- Each page targets one main keyword: put it in the title, the H1, the first sentence, and at least one H2.
- Don't remove the existing "How to use" sections or FAQs; they're good.
- After deploying, resubmit the sitemap in Google Search Console and request indexing for the changed pages.

---

## Phase 1: On-page fixes (ship now)

### 1. Rename the repeated H2s on all 9 tool pages

"Workbench Controls", "Output & Inspection" and "Before and After Inspection" appear as H2s on every tool page.

- [ ] Make them plain labels (not heading tags), **or** reword each with the page's keyword, e.g. "Compress your YouTube thumbnail".

### 2. Update page titles

| Page (URL) | New `<title>` |
| --- | --- |
| /tools/youtube-thumbnail-compressor | Free YouTube Thumbnail Compressor (Under 2 MB) \| Creovly |
| /tools/youtube-thumbnail-resizer | Free YouTube Thumbnail Resizer: 1280x720 \| Creovly |
| /tools/logo-background-remover | Remove Background from Logo (Free PNG) \| Creovly |
| /tools/youtube-shorts-safe-zone | YouTube Shorts Safe Zone Checker & Template \| Creovly |
| /tools/youtube-title-checker | Free YouTube Title Checker: Length & Truncation \| Creovly |
| /tools/youtube-rpm-calculator | YouTube RPM Calculator: Earnings per 1,000 Views \| Creovly |
| /tools/youtube-watch-hours-calculator | YouTube Watch Hours Calculator: 4,000-Hour Goal \| Creovly |
| /tools/youtube-monetization-calculator | YouTube Monetization Calculator: Ads & Sponsors \| Creovly |
| /tools/youtube-revenue-calculator | Keep: YouTube Money Calculator: Views to Revenue \| Creovly |

Keep the existing meta descriptions, except on the logo page (see step 4).

### 3. Revenue calculator: fix the title/H1 mismatch

"youtube money calculator" and "youtube revenue calculator" both get 1,000+ searches/month (KD Hard).

- [ ] Change the H1 from "YouTube Revenue Calculator" to **"YouTube Money Calculator"**.
- [ ] Add an H2 such as "How the YouTube revenue calculator works" so the page also covers "revenue".

### 4. Logo tool: retarget to "remove background from logo"

"remove background from logo" is KD Easy, 1,000+ searches. "logo background remover" is KD Hard, 100+.

- [ ] H1: **"Remove Background from Logo"** (title is in step 2).
- [ ] Meta description: start with "Remove the background from any logo for free…"
- [ ] Make sure one FAQ question is "How to remove background from a logo?" (KD Easy, 100+). An existing question already covers this; reword it if needed.

### 5. Separate the three money calculators

Revenue/Money, RPM and Monetization overlap. State each page's job in its H1 and first sentence:

- [ ] Money Calculator = monthly views → estimated money.
- [ ] RPM Calculator = earnings per 1,000 views from your own revenue and views.
- [ ] Monetization Calculator = all income streams (ads, sponsors, affiliates) minus expenses.

### 6. Check structured data

- [ ] Confirm each tool page has `WebApplication` (or `SoftwareApplication`) and `BreadcrumbList` JSON-LD. Add it where missing.

### 7. Add a thumbnail size section to the Resizer page

"youtube thumbnail size" is KD Medium, 10,000+ searches. "youtube thumbnail size converter" is KD Easy, 100+.

- [ ] Add an H2 **"YouTube thumbnail size"** with the official specs: 1280x720, 16:9, under 2 MB, JPG/PNG/GIF.
- [ ] Use the phrase "thumbnail size converter" once in the intro.

### 8. Shorts Safe Zone page

- [ ] Add a downloadable transparent PNG overlay ("template", "overlay" and "png" variants are all KD Easy).

---

## Phase 2: New pages (in this order)

| # | New page | Main keyword | KD | Volume/mo |
| --- | --- | --- | --- | --- |
| 1 | YouTube Banner Size Checker & Resizer | youtube banner size | Easy | 10,000+ |
| 2 | YouTube Channel Name Generator | youtube channel name generator | Easy | 1,000+ |
| 3 | Guide: How much does YouTube pay per 1,000 views | how much does youtube pay per 1000 views | Easy | 100+ |
| 4 | YouTube Tag Generator | youtube tag generator | Medium | 1,000+ |
| 5 | YouTube Description Generator | youtube description generator | Medium | 1,000+ |

Notes:

- **Banner tool:** resize to 2560x1440, show the safe area for all devices (TV, desktop, mobile), offer a template download. Related Easy keywords (100+ each): "youtube banner size for all devices", "youtube banner size template", "youtube banner size for mobile", "youtube banner size converter".
- **Channel name generator:** mention AI in the copy ("ai youtube channel name generator" is KD Easy, 100+).
- **Pay-per-1,000-views guide:** link to the RPM and Money calculators.
- Every new tool page follows the existing template: H1 with the keyword, "How to use" section, 5 FAQs, related tools, and a link from the homepage tool list and footer.

## Leave as is

- Thumbnail Compressor and Watch Hours Calculator: KD Easy but under 100 searches. No extra work beyond Phase 1.
