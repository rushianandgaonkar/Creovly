# Design Document: 4 SEO Click Opportunities for Creovly

**Date:** 2026-11-17  
**Status:** Draft for Review  
**Product:** Creovly (`creovly.com`)  
**Topic:** SEO Optimization — Host Canonicalization, Localization Strengthening, Query Intent Matching ("what is rpm on youtube", "title checker")

---

## 1. Intent & Context

Google Search Console and SEO audit data revealed four specific click opportunities:

1. **Host Signal Splitting (www vs. non-www):** `creovly.com/tools/youtube-rpm-calculator` (3 impressions) vs. `www.creovly.com/tools/youtube-rpm-calculator` (2 impressions). Traffic and indexing signals are split between the apex and `www` subdomain.
2. **Poorly Ranking Localized Sections:** Sections across `/it/`, `/pt/`, `/es/`, `/de/`, `/ja/`, and `/ko/` average positions 48.0–60.3 with impressions but zero clicks. Root causes in the code include:
   - Tool shells rendering English titles/descriptions on localized routes (`app/[locale]/[...slug]/page.tsx`).
   - Three guides (`youtube-banner-size`, `youtube-monetization-requirements`, `how-to-change-youtube-thumbnail`) have no localized copy in `config/guides-i18n.ts` and render 100% English under localized paths, diluting international relevance.
3. **High Impressions, Zero Clicks on "what is rpm on youtube":** 141 impressions at position 108.0 for `/guides/decoding-youtube-rpm`. The guide lacks a direct, featured-snippet-ready H2 answering "What is RPM on YouTube?", the exact formula, and an FAQ entity matching the verbatim search query.
4. **High Impressions, Zero Clicks on "title checker":** 69 impressions at position 69.6 for `/tools/youtube-title-checker`. The page is heavily branded as "YouTube Title Checker & Analyzer" without prominent keyword targeting for broader "title checker" intent, character counting, and headline optimization.

The user has explicitly decided to **fully commit to strengthening and localizing the language sections** rather than noindexing them, and confirmed using the same Cloudflare 301 redirect rule approach previously applied to `ageason.com` and `podstudiotools.com`.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
- **Host Canonicalization:** Standardize 100% on `https://creovly.com` (non-www). Document and verify the Cloudflare Redirect Rule (`www.creovly.com/*` -> `https://creovly.com/*` 301). Audit codebase to ensure all canonicals, sitemaps, robots.txt, manifests, and internal links strictly reference `https://creovly.com`.
- **Strengthen Localized Pages:**
  - Fix `app/[locale]/[...slug]/page.tsx` so all tool pages receive localized `title`, `description`, and `category` from `translations[locale]` rather than English fallback props.
  - Complete the guide localization coverage across the 7 non-default locales (`es`, `ja`, `fr`, `de`, `pt`, `ko`, `it`) for the remaining 3 guides, or ensure localized routing only exposes guides with verified translations so zero English content is served under foreign URLs.
  - Verify bidirectional `hreflang` tags (including `x-default`) in HTML `<head>` and XML sitemaps.
  - Enhance internal linking and crawlability to localized pages.
- **Intent Match for "What is RPM on YouTube":**
  - Add an explicit H2 section in `/guides/decoding-youtube-rpm`: "What is RPM on YouTube?" with a concise, featured-snippet-ready definition, the mathematical formula `(Estimated Revenue / Total Views) × 1,000`, a clear CPM vs. RPM distinction, and an interactive CTA linking to `/tools/youtube-rpm-calculator`.
  - Add an FAQ entry for "What is RPM on YouTube?" in `config/guides-i18n.ts` (with translations across all 8 supported languages) to be output in `guideFaqJsonLd`.
- **Intent Match for "Title Checker":**
  - Update metadata (`seoTitle`, `title`, `description`, `keywords`) in `config/site.ts` and `config/i18n.ts` to prominently capture both "Title Checker" / "Free Title Checker" and "YouTube Title Checker".
  - Expand educational guidance and FAQs for `/tools/youtube-title-checker` covering character limits, mobile cutoff (50–60 chars), hook scoring, and headline writing formulas.

### Non-Goals
- No noindexing of localized sections or tools (explicit user directive).
- No server-side dynamic runtime additions or database requirements (static export `output: 'export'` preserved).
- No new external AI or third-party tracking libraries.

### Anti-Goals
- Do not introduce low-quality machine boilerplate that damages brand reputation or fails native linguistic sense.
- Do not disrupt existing English rankings or canonical references.
- Do not generate redirect loops between apex and `www`.

---

## 3. Detailed Architecture & Design Decisions

### Area 1: Host Canonicalization & www 301 Redirect
1. **Cloudflare Redirect Rule Specification:**
   - **Rule Name:** `Redirect www to apex`
   - **Expression:** `(http.host eq "www.creovly.com")`
   - **Type:** Dynamic 301 (Permanent Redirect)
   - **Target URL:** `concat("https://creovly.com", http.request.uri.path)`
   - **Preserve query string:** Yes
2. **Codebase Verification:**
   - Verify `config/site.ts`: `url: 'https://creovly.com'` (confirmed).
   - Verify `app/sitemap.ts`: `baseUrl = siteConfig.url.replace(/\/$/, '')` (confirmed non-www).
   - Verify `lib/metadata.ts`: `new URL(canonicalPath, siteConfig.url)` (confirmed non-www).
   - Add verification check in `scripts/audit-seo-and-links.mjs` ensuring no internal link or metadata contains `www.creovly.com`.

### Area 2: Strengthening Localized Sections (`/it/`, `/pt/`, `/es/`, `/de/`, `/ja/`, `/ko/`, `/fr/`)
1. **Tool Page Shell Props Fix in `app/[locale]/[...slug]/page.tsx`:**
   - Currently, tool switches pass:
     ```tsx
     <ToolPageShell
       title={tool.title} // English!
       description={tool.description} // English!
     ```
   - Update so it extracts localized data from `translations[loc]?.tools?.[toolSlug]` and passes localized `title`, `description`, and `categoryLabel`.
2. **Guide Localization Architecture:**
   - Currently, 4 guides have full translations in `config/guides-i18n.ts`:
     - `youtube-thumbnail-blueprint`
     - `decoding-youtube-rpm`
     - `youtube-shorts-safe-zone`
     - `how-much-does-youtube-pay-per-1000-views`
   - 3 guides lack localized data in non-default locales:
     - `youtube-banner-size`
     - `youtube-monetization-requirements`
     - `how-to-change-youtube-thumbnail`
   - **Decision:** Provide complete, high-quality translations for these 3 guides across all 7 non-default locales in `config/guides-i18n.ts`. This ensures every localized guide route `/it/guides/...`, `/de/guides/...` delivers authentic native content, fulfilling the user's mandate to fully commit to localized sections.
   - Update `app/sitemap.ts` and `config/i18n.ts` (`translatedGuideSlugs`) to include all guides once translated so hreflang alternates are 100% complete across all 7 guides.

### Area 3: Intent Match for "What is RPM on YouTube"
1. **Target:** `/guides/decoding-youtube-rpm` (and localized equivalents `/it/guides/decoding-youtube-rpm`, etc.).
2. **On-Page Optimization:**
   - Add a dedicated Section 1 titled: `What is RPM on YouTube?`
   - Structured answer snippet:
     - Clear definition: RPM (Revenue Per Mille) is the metric in YouTube Analytics showing your net earnings per 1,000 views after YouTube's 45% revenue split.
     - The Official Formula: `RPM = (Estimated Total Revenue / Total Views) × 1,000`.
     - Revenue sources included: AdSense, YouTube Premium revenue share, Channel Memberships, Super Chat & Super Stickers.
     - Quick comparison summary: CPM vs. RPM table/callout.
     - Callout box with direct link: "Calculate your channel's exact net revenue per thousand views with our [YouTube RPM Calculator](/tools/youtube-rpm-calculator)."
3. **Structured Data:**
   - Add FAQ item to `config/guides-i18n.ts`:
     - Question: "What is RPM on YouTube?"
     - Answer: "RPM (Revenue Per Mille) on YouTube measures how much money a creator earns per 1,000 total video views across all monetization sources (ads, YouTube Premium, memberships, and Super Chats) after YouTube has already deducted its 45% platform cut. The official formula is RPM = (Estimated Total Revenue ÷ Total Views) × 1,000."
   - Translate this FAQ into all 7 non-default locales.

### Area 4: Intent Match for "Title Checker"
1. **Target:** `/tools/youtube-title-checker` (and localized equivalents).
2. **Metadata & Headings:**
   - Page `<title>` / `seoTitle`:
     - Before: `Free YouTube Title Checker: Length and Truncation`
     - After: `Title Checker: Free YouTube Title Length, Hook & Truncation Analyzer`
   - `description`:
     - "Free Title Checker and headline analyzer. Check title length, 50-character mobile truncation cutoff, hook placement, and CTR optimization before publishing."
   - Target keywords: `title checker`, `free title checker`, `youtube title checker`, `title length checker`, `video title analyzer`.
3. **On-Page Educational Guidance & FAQs:**
   - Add educational sections to `messages/en/tools.ts` and `ToolPageShell.tsx` answering:
     - "What is a title checker and why do creators need one?"
     - "The 50–60 Character Mobile Cutoff Rule" (explaining why titles truncate on iOS and Android feeds).
     - "Proven High-CTR Title Formulas" (Curiosity Gap, Numbered Lists, Question Hooks, Strong Verbs).
   - Ensure the FAQs in `messages/` across all locales reflect both "Title Checker" general utility and YouTube-specific requirements.

---

## 4. Verification & Testing Strategy

1. **Static Build & Export:**
   - Run `npm run build` (`next build && node scripts/generate-sitemaps.mjs`).
   - Verify clean build with 0 TypeScript or lint errors.
2. **SEO Audit Verification:**
   - Run `npm run audit:seo` (`node scripts/audit-seo-and-links.mjs`).
   - Verify 0 missing canonical tags, 0 invalid hreflang pairs, and 0 broken internal links.
3. **i18n Validation:**
   - Run `npm run validate:i18n` (`node scripts/validate-translations.mjs`).
   - Verify translation parity across all 8 locales.
4. **HTML Output Inspection:**
   - Inspect generated HTML in `out/it/tools/youtube-rpm-calculator.html` and `out/it/guides/decoding-youtube-rpm.html` to verify:
     - Canonical tag uses `https://creovly.com` (non-www).
     - Full hreflang alternates are present.
     - Headings and body are localized in Italian.
   - Inspect `out/tools/youtube-title-checker.html` to verify updated title tag, meta description, and educational content.
   - Inspect `out/guides/decoding-youtube-rpm.html` to verify "What is RPM on YouTube?" section and FAQ JSON-LD.

---

## 5. What is Left to the Builder
- Precise grammatical formulation of the translated strings in `guides-i18n.ts` and `messages/` for the 3 newly localized guides.
- Layout refinement of the "What is RPM on YouTube" callout box and formula display.
- Exact styling integration of the Title Checker educational section in `ToolPageShell`.
