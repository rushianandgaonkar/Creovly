# Keyword Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the targeted SEO keyword strategy across existing tool pages and three new verified guides in accordance with `docs/KEYWORD_IMPLEMENTATION_INSTRUCTIONS.md` and `docs/creovly-keyword-map.md`.

**Architecture:** 
- Add search-only `seoTitle` capability to the tools registry, metadata generators, and translations schema.
- Update targeted titles, meta descriptions, on-page H1/H2 headings, FAQs, and internal links for existing tools and guides.
- Implement 3 new verified creator guides (`youtube-banner-size`, `youtube-monetization-requirements`, `how-to-change-youtube-thumbnail`) with full content, structured data, official sources, and sitemap/fallback support without breaking multilingual parity.

**Tech Stack:** Next.js App Router, TypeScript, React 19, Tailwind CSS.

**Spec:** `docs/KEYWORD_IMPLEMENTATION_INSTRUCTIONS.md` and `docs/creovly-keyword-map.md`.

## Global Constraints

- English only for now: do not alter the other 7 locales except where maintaining key parity in dictionary files requires it.
- Never add fake features: every sentence must describe functionality the site actually executes today.
- No keyword stuffing: use each primary keyword naturally in `<title>`, H1, first paragraph, and one H2 (2–3 mentions per page).
- Keep `<title>` $\le$ 50 characters (before the automatically appended ` | Creovly` brand suffix).
- Keep meta descriptions strictly between 70 and 160 characters.
- Run `npm run lint`, `npm test`, `npm run validate:i18n`, and `npm run build` before completion.

## Review Focus

1. Tool `<title>` in search engine metadata vs on-page H1: metadata receives `seoTitle` while H1 preserves the clean tool title.
2. Character limits: every `<title>` $\le$ 50 chars, meta description 70–160 chars.
3. Hreflang integrity: `getLanguageAlternates` must not advertise untranslated non-English URLs for the 3 new English-only guides.
4. OpenGraph fallback: guide pages must fall back cleanly to `/og-image.png` if `/og/${slug}.png` does not exist on disk.
5. Exact platform accuracy: verified numbers for banner dimensions (2560×1440, 1235×338 safe zone), YPP thresholds (500/1000 subs, 3000/4000 watch hours), and Shorts thumbnail frame selection.

---

### Task 1: Add `seoTitle` for tools and update existing tool metadata (Steps 1 & 2)

**Files:**
- Modify: `config/i18n.ts`
- Modify: `config/site.ts`
- Modify: `lib/metadata.ts`
- Test: `tests/metadata.test.cjs` (or run `npm test`)

- [ ] Add `seoTitle?: string` to `ToolTranslation` interface in `config/i18n.ts`.
- [ ] Add `seoTitle?: string` to `Tool` interface in `config/site.ts`.
- [ ] In `lib/metadata.ts`: update `createToolMetadata` to prioritize `localeData?.seoTitle || tool.seoTitle || localeData?.title || tool.title`.
- [ ] Update `seoTitle`, `description`, and `keywords` for `youtube-revenue-calculator` in `config/site.ts` and `config/i18n.ts` (`en` block).
- [ ] Update `description` and `keywords` for `youtube-monetization-calculator`, `youtube-title-checker`, `youtube-shorts-safe-zone`, and `youtube-thumbnail-resizer` in `config/site.ts` and `config/i18n.ts` (`en` block).
- [ ] Run `npm test` to verify metadata generation.

---

### Task 2: Update on-page copy and FAQs for existing tools (Step 3 & Step 5)

**Files:**
- Modify: `messages/en/tools.ts`
- Modify: `messages/en/calculator.ts`
- Modify: `config/calculator-faqs.ts`
- Modify: `components/tools/CalculatorPage.tsx`
- Modify: `components/tools/ToolPageShell.tsx`

- [ ] In `messages/en/tools.ts` (and `config/calculator-faqs.ts`):
  - Revenue calculator: Add FAQ "Does this work for Shorts?" explaining how Shorts RPM differs from long-form.
  - Title checker: Align FAQ to "How long should a YouTube title be?" with official character & mobile truncation limits.
- [ ] In `components/tools/CalculatorPage.tsx`:
  - For `revenue`: Add intro line "Use this YouTube money calculator to turn monthly views and RPM into estimated revenue." and H3/H2 "YouTube views to money".
  - For `monetization`: Add introductory copy with primary keyword "YouTube monetization calculator" and "income", and link to `/guides/youtube-monetization-requirements`.
  - For `watch-hours`: Add descriptive link to `/guides/youtube-monetization-requirements`.
- [ ] In `components/tools/ToolPageShell.tsx` (and `messages/en/tools.ts`):
  - For `youtube-shorts-safe-zone`: Add H2 "YouTube Shorts safe zone template" and link to `/guides/youtube-shorts-safe-zone`.
  - For `youtube-thumbnail-resizer`: Ensure first paragraph mentions "YouTube thumbnail size (1280×720)" and links to `/guides/youtube-thumbnail-blueprint`.
- [ ] Run `npm test` and `npm run validate:i18n` to verify strings and key parity.

---

### Task 3: Update `youtube-thumbnail-blueprint` guide (Step 3 & Step 5)

**Files:**
- Modify: `lib/guides.ts`
- Modify: `config/guides-i18n.ts`

- [ ] Ensure first paragraph of `youtube-thumbnail-blueprint` prominently features "YouTube thumbnail size".
- [ ] Add H2s "YouTube thumbnail size and dimensions: 1280×720" and "YouTube thumbnail aspect ratio".
- [ ] Add FAQ "What size is a YouTube thumbnail?".
- [ ] Add verified note on Shorts thumbnail size (9:16 vertical 1080×1920, mobile frame selection during upload).
- [ ] Add cross-link to `/guides/how-to-change-youtube-thumbnail`.

---

### Task 4: Implement three new verified guides (Step 4 & Step 5)

**Files:**
- Modify: `lib/guides.ts`
- Modify: `config/guides-i18n.ts`
- Modify: `app/guides/[slug]/page.tsx`
- Modify: `app/[locale]/[...slug]/page.tsx`
- Modify: `config/i18n.ts`
- Modify: `public/llms.txt`
- Modify: `tests/guides.test.cjs`

- [ ] Implement `youtube-banner-size` in `lib/guides.ts` and `config/guides-i18n.ts` (2560×1440, 1235×338 safe area, 6 MB limit, links to thumbnail resizer).
- [ ] Implement `youtube-monetization-requirements` in `lib/guides.ts` and `config/guides-i18n.ts` (500/1,000 sub tiers, 4,000 watch hours, 10M Shorts views, links to watch hours and monetization calculators).
- [ ] Implement `how-to-change-youtube-thumbnail` in `lib/guides.ts` and `config/guides-i18n.ts` (step-by-step desktop/mobile, phone verification, Shorts frame selection, links to thumbnail resizer and compressor).
- [ ] In `app/guides/[slug]/page.tsx` and `app/[locale]/[...slug]/page.tsx`: add OG image fallback helper to safely fall back to `/og-image.png` if `/og/${slug}.png` is missing.
- [ ] In `config/i18n.ts`: update `getLanguageAlternates` so that English-only guides do not advertise non-existent localized URLs in hreflang.
- [ ] In `public/llms.txt`: add the 3 new guides to the Verified Creator Guides section.
- [ ] In `tests/guides.test.cjs`: update expected guide count and slugs to match the 6 approved guides.
- [ ] Cross-link the thumbnail blueprint guide with `how-to-change-youtube-thumbnail`.

---

### Task 5: Full verification, static build inspection, and deployment (Step 6)

**Files:**
- Verification: `npm run lint`
- Verification: `npm test`
- Verification: `npm run validate:i18n`
- Verification: `npm run build`
- Git commit & push: `origin/master`
- Deploy: `npm run deploy` (Wrangler Cloudflare deployment)

- [ ] Run `npm run lint` and verify 0 warnings/errors.
- [ ] Run `npm test` and verify 100% test pass rate.
- [ ] Run `npm run validate:i18n` and verify 100% parity across all 8 locales.
- [ ] Run `npm run build` and inspect `out/`:
  - Check `<title>` length $\le$ 50 chars for all tools and new guides.
  - Check meta descriptions 70–160 chars.
  - Verify `/tools/youtube-revenue-calculator` title is `YouTube Money Calculator: Views to Revenue | Creovly` while on-page H1 remains `YouTube Revenue Calculator`.
  - Verify all 3 new guides build to `out/guides/` with canonical URLs and appear in `out/sitemap.xml`.
- [ ] Commit with conventional commits message and push to GitHub.
- [ ] Deploy to Cloudflare and verify HTTP 200 response on live domains.

