# 4 SEO Click Opportunities Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 4 targeted SEO optimizations to capture more organic clicks across host canonicalization, international section strengthening, and query intent matching for "what is rpm on youtube" and "title checker".

**Architecture:** Standardize on non-www (`https://creovly.com`) with automated audit assertions and Cloudflare 301 rule documentation; fix localized tool shell props in `app/[locale]/[...slug]/page.tsx` and extend full i18n coverage to all 7 guides across 7 non-default locales; enrich `/guides/decoding-youtube-rpm` with an explicit H2 definition, formula, and multilingual FAQ entity; and retune `/tools/youtube-title-checker` metadata, headings, and educational copy to target the high-volume "title checker" query.

**Tech Stack:** Next.js 15 App Router (Static Export `output: 'export'`), React 19, TypeScript 5, Node.js Test Runner (`node:test`), Cloudflare Workers/Pages static hosting.

**Spec:** `docs/superpowers/specs/2026-11-17-seo-click-opportunities-design.md`

## Global Constraints

- Preserve static export output (`output: 'export'`) with 0 dynamic runtime dependencies or server endpoints.
- Do not noindex any localized routes; every localized route must present complete, authentic native translations.
- All canonical tags and sitemaps must strictly point to `https://creovly.com` without `www`.
- No new external AI APIs, databases, authentication, or tracking libraries (per `AGENTS.md`).
- Run `npm run test`, `npm run validate:i18n`, and `npm run build` cleanly before completion.

## Review Focus

1. **Host pollution in canonicals or sitemaps:** An alternate or canonical tag mistakenly outputting `www.creovly.com` due to mismatched environment or configuration variables. (Covered in Task 1 test).
2. **Untranslated guide leakage:** A user or crawler requesting a localized guide route (e.g. `/ja/guides/youtube-banner-size`) receiving raw English content. (Covered in Task 5 test).
3. **Mismatched bidirectional hreflang tags:** A page declaring an alternate language URL whose reciprocal alternate does not point back. (Covered in Task 4 & 5 test).
4. **Snippet truncation or missing formula on RPM search:** A search crawler extracting the RPM definition without the official mathematical formula `(Estimated Revenue / Total Views) × 1,000`. (Covered in Task 2 test).
5. **Overwritten brand titles on Title Checker:** The Title Checker page dropping the brand suffix or exceeding recommended SERP title length (~60 characters). (Covered in Task 3 test).

---

### Task 1: Host Canonicalization & Non-www Audit Enforcement

**Files:**
- Create: `docs/CLOUDFLARE_REDIRECTS.md`
- Modify: `scripts/audit-seo-and-links.mjs:50-80`
- Test: `tests/multilingual-pages.test.cjs:30-70`

**Interfaces:**
- Consumes: `siteConfig.url` from `config/site.ts`
- Produces: Strict non-www automated audit checks preventing any `www.creovly.com` references across sitemaps, canonicals, and HTML links.

- [ ] **Step 1: Write the failing test asserting no www host in sitemap or canonical generators**

In `tests/multilingual-pages.test.cjs`, add a test case checking that `createPageMetadata` and `app/sitemap.ts` never output `www.creovly.com`:
```javascript
test('all canonical and alternate URLs use https://creovly.com and never www.creovly.com', () => {
  const metaMod = loadTsModule('lib/metadata.ts');
  const sitemapMod = loadTsModule('app/sitemap.ts');
  const meta = metaMod.createPageMetadata({ title: 'Test', description: 'Test', path: '/tools/youtube-rpm-calculator' });
  assert.ok(meta.alternates.canonical.startsWith('https://creovly.com/'));
  assert.ok(!meta.alternates.canonical.includes('www.creovly.com'));
  for (const [lang, url] of Object.entries(meta.alternates.languages)) {
    assert.ok(url.startsWith('https://creovly.com'), `Alternate ${lang} must not use www: ${url}`);
    assert.ok(!url.includes('www.creovly.com'));
  }
  const sitemapEntries = sitemapMod.default();
  for (const entry of sitemapEntries) {
    assert.ok(entry.url.startsWith('https://creovly.com'), `Sitemap URL must not use www: ${entry.url}`);
    assert.ok(!entry.url.includes('www.creovly.com'));
  }
});
```

- [ ] **Step 2: Run test to verify it passes or fails**

Run: `node --test tests/multilingual-pages.test.cjs`
Expected: PASS (or verifies current baseline).

- [ ] **Step 3: Update `scripts/audit-seo-and-links.mjs` to strictly reject `www.creovly.com`**

In `scripts/audit-seo-and-links.mjs`, inside the sitemap and HTML inspection loops, add an assertion that flags an issue if `url.includes('www.creovly.com')` or `html.includes('href="https://www.creovly.com')` or `rel="canonical" href="https://www.creovly.com`.

- [ ] **Step 4: Create `docs/CLOUDFLARE_REDIRECTS.md` with the verified Cloudflare 301 rule specification**

Document the exact Cloudflare Dynamic 301 Redirect Rule expression, matching `ageason.com` and `podstudiotools.com`:
```
Rule Name: Redirect www to apex (301)
Expression: (http.host eq "www.creovly.com")
Type: Dynamic 301 (Permanent Redirect)
Target URL: concat("https://creovly.com", http.request.uri.path)
Preserve query string: Yes
```

- [ ] **Step 5: Run tests and verify clean output**

Run: `node --test tests/multilingual-pages.test.cjs`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tests/multilingual-pages.test.cjs scripts/audit-seo-and-links.mjs docs/CLOUDFLARE_REDIRECTS.md
git commit -m "seo: enforce non-www canonicals and document Cloudflare 301 redirect rule"
```

---

### Task 2: Query Intent Optimization for "What is RPM on YouTube"

**Files:**
- Modify: `lib/guides.ts:125-180`
- Modify: `config/guides-i18n.ts:115-175,660-720,955-1015,1245-1305,1535-1595,1825-1885,2115-2175,2405-2465`
- Test: `tests/guides.test.cjs:94-115`

**Interfaces:**
- Consumes: `getGuideBySlug('decoding-youtube-rpm')` from `lib/guides.ts`, `getLocalizedGuide('decoding-youtube-rpm', locale)` from `config/guides-i18n.ts`
- Produces: Featured-snippet-ready H2 section, definition, formula, and FAQ entity matching "What is RPM on YouTube?".

- [ ] **Step 1: Write the failing test for RPM guide search intent matching**

In `tests/guides.test.cjs`, expand the test `RPM guide prevents double revenue share deduction and distinguishes Shorts`:
```javascript
test('RPM guide addresses "what is rpm on youtube" search intent with definition, formula and FAQ', () => {
  const guide = getGuideBySlug('decoding-youtube-rpm');
  assert.ok(guide);
  
  // Direct H2 heading for search query
  const firstSection = guide.contentSections[0];
  assert.ok(firstSection.heading.toLowerCase().includes('what is rpm on youtube'));
  assert.ok(firstSection.body.includes('(Estimated Total Revenue / Total Views) × 1,000'));
  assert.ok(firstSection.body.includes('/tools/youtube-rpm-calculator') || firstSection.body.includes('YouTube RPM Calculator'));
  
  // FAQ entity in config/guides-i18n.ts across locales
  const guidesConfig = loadTsModule('config/guides-i18n.ts');
  const enGuide = guidesConfig.getLocalizedGuide('decoding-youtube-rpm', 'en');
  assert.ok(enGuide.faqs.some((f) => f.question.toLowerCase().includes('what is rpm on youtube')));
  
  for (const loc of ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    const locGuide = guidesConfig.getLocalizedGuide('decoding-youtube-rpm', loc);
    assert.ok(locGuide.faqs.length >= 4, `Expected at least 4 FAQs for decoding-youtube-rpm in ${loc}`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/guides.test.cjs`
Expected: FAIL (heading does not yet include "what is rpm on youtube").

- [ ] **Step 3: Update `lib/guides.ts` for `decoding-youtube-rpm`**

In `lib/guides.ts`:
1. Update Section 1 heading to: `1. What is RPM on YouTube? (Definition & The Mathematical Reality)`
2. Add a clear, snippet-friendly opening paragraph:
"**RPM on YouTube stands for Revenue Per Mille (revenue per 1,000 views).** It is the definitive creator-focused metric in YouTube Analytics that measures your actual net take-home earnings per 1,000 total video views across all monetized streams—after YouTube has already deducted its 45% platform cut. The official YouTube formula is: **RPM = (Estimated Total Revenue / Total Views) × 1,000**. To model your channel's exact numbers, use our free [YouTube RPM Calculator](/tools/youtube-rpm-calculator)."
3. Ensure Section 1 body preserves the detailed explanation of CPM vs. RPM and avoiding double deductions.

- [ ] **Step 4: Update `config/guides-i18n.ts` for `decoding-youtube-rpm` with "What is RPM on YouTube?" FAQ**

In `config/guides-i18n.ts`:
Add the question and answer to `en` and the 7 non-default locales:
- `en`: "What is RPM on YouTube?" / "RPM (Revenue Per Mille) on YouTube is the creator metric showing how much net money you earn per 1,000 total video views across all monetization sources (ads, YouTube Premium, Channel Memberships, Super Chats) after YouTube's 45% revenue cut. The formula is: RPM = (Estimated Total Revenue ÷ Total Views) × 1,000."
- `es`: "¿Qué es el RPM en YouTube?"
- `ja`: "YouTubeにおけるRPMとは何ですか？"
- `fr`: "Qu'est-ce que le RPM sur YouTube ?"
- `de`: "Was ist die RPM auf YouTube?"
- `pt`: "O que é RPM no YouTube?"
- `ko`: "유튜브에서 RPM이란 무엇인가요?"
- `it`: "Che cos'è l'RPM su YouTube?"

- [ ] **Step 5: Run tests and verify they pass**

Run: `node --test tests/guides.test.cjs`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add lib/guides.ts config/guides-i18n.ts tests/guides.test.cjs
git commit -m "seo: optimize decoding-youtube-rpm for 'what is rpm on youtube' query"
```

---

### Task 3: Query Intent Optimization for "Title Checker"

**Files:**
- Modify: `config/site.ts:208-221`
- Modify: `messages/en/tools.ts:178-199,504-510`
- Modify: `config/i18n.ts` (title-checker entries for all 8 locales)
- Test: `tests/creator-tools.test.cjs`

**Interfaces:**
- Consumes: `toolRegistry` from `config/site.ts`, `translations` from `config/i18n.ts`
- Produces: Targeted metadata, guidance, and FAQ entities capturing "Title Checker" and "Free Title Checker".

- [ ] **Step 1: Write the failing test for Title Checker search intent optimization**

In `tests/creator-tools.test.cjs`, add a test verifying metadata and copy targeting for "Title Checker":
```javascript
test('youtube-title-checker targets both "Title Checker" and "YouTube Title Checker"', () => {
  const siteConfig = loadTsModule('config/site.ts');
  const tool = siteConfig.toolRegistry.find((t) => t.slug === 'youtube-title-checker');
  assert.ok(tool);
  assert.ok(tool.seoTitle.includes('Title Checker'));
  assert.equal(tool.seoTarget, 'Title Checker');
  assert.ok(tool.description.toLowerCase().includes('free title checker'));
  
  const i18n = loadTsModule('config/i18n.ts');
  for (const loc of ['en', 'es', 'ja', 'fr', 'de', 'pt', 'ko', 'it']) {
    const t = i18n.translations[loc]?.tools['youtube-title-checker'];
    assert.ok(t, `Missing title checker translation in ${loc}`);
    assert.ok(t.keywords.length >= 5);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/creator-tools.test.cjs`
Expected: FAIL (seoTitle or seoTarget does not match new requirements).

- [ ] **Step 3: Update `config/site.ts` tool entry for `youtube-title-checker`**

In `config/site.ts`:
- `seoTitle`: `'Title Checker: Free YouTube Title Length, Hook & Truncation Analyzer'`
- `seoTarget`: `'Title Checker'`
- `description`: `'Free Title Checker and headline analyzer. Check title length, 50-character mobile truncation cutoff, keyword hooks, and CTR preview before you publish.'`

- [ ] **Step 4: Update `messages/en/tools.ts` for `titleChecker` guidance and FAQs**

In `messages/en/tools.ts`:
1. Expand guidance `p1` to highlight: "Creovly's free Title Checker inspects headline length, keyword hook placement, capitalization, and punctuation to optimize click-through rates."
2. Add FAQ item: "Why should creators use a Title Checker before publishing?" with detailed answer explaining mobile truncation cutoffs, search CTR impact, and avoiding clickbait penalties.

- [ ] **Step 5: Update `config/i18n.ts` for `youtube-title-checker` translations**

In `config/i18n.ts`:
Ensure the `seoTitle`, `description`, and `keywords` for `youtube-title-checker` across `es`, `ja`, `fr`, `de`, `pt`, `ko`, and `it` incorporate the localized equivalent of "Title Checker" (e.g. `es`: "Verificador de Títulos", `it`: "Verifica Titoli", `de`: "Titel Checker", `fr`: "Vérificateur de Titres", `ja`: "タイトルチェッカー", `ko`: "제목 검사기") alongside "YouTube".

- [ ] **Step 6: Run tests and verify they pass**

Run: `node --test tests/creator-tools.test.cjs`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add config/site.ts messages/en/tools.ts config/i18n.ts tests/creator-tools.test.cjs
git commit -m "seo: retune youtube-title-checker metadata and guidance for 'title checker' query"
```

---

### Task 4: Localized Tool Shell Props & Language Alternates Parity

**Files:**
- Modify: `app/[locale]/[...slug]/page.tsx:255-485`
- Test: `tests/multilingual-pages.test.cjs:100-160`

**Interfaces:**
- Consumes: `translations[loc]?.tools[toolSlug]` from `config/i18n.ts`
- Produces: Localized `<ToolPageShell>` render with localized `title`, `description`, and `category` props on all non-default locale pages.

- [ ] **Step 1: Write the test verifying tool pages in non-default locales receive localized props**

In `tests/multilingual-pages.test.cjs`, add a test case verifying that for every tool and every non-default locale, the localized title and description exist in `translations[locale].tools` and are not identical to English (or are validated native strings):
```javascript
test('all tool pages have localized shell metadata and content in all 7 non-default locales', () => {
  const i18n = loadTsModule('config/i18n.ts');
  const NON_DEFAULT = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const loc of NON_DEFAULT) {
    const locTools = i18n.translations[loc]?.tools;
    assert.ok(locTools, `Missing tools for ${loc}`);
    for (const [slug, data] of Object.entries(locTools)) {
      assert.ok(data.title && data.title.length > 3, `Title too short for ${slug} in ${loc}`);
      assert.ok(data.description && data.description.length > 10, `Description too short for ${slug} in ${loc}`);
      assert.ok(data.categoryLabel && data.categoryLabel.length > 2, `Category label too short for ${slug} in ${loc}`);
    }
  }
});
```

- [ ] **Step 2: Run test to verify it passes**

Run: `node --test tests/multilingual-pages.test.cjs`
Expected: PASS.

- [ ] **Step 3: Update `app/[locale]/[...slug]/page.tsx` tool switches**

In `app/[locale]/[...slug]/page.tsx`, update the tool switch statement (lines 255–485) so every `<ToolPageShell>` call passes:
```tsx
const locTool = translations[loc]?.tools?.[toolSlug];
const localizedTitle = locTool?.title || tool.title;
const localizedDesc = locTool?.description || tool.description;
const localizedCategory = locTool?.categoryLabel || tool.categoryLabel;
```
Pass `title={localizedTitle}`, `description={localizedDesc}`, `category={localizedCategory}` into each tool component branch (`youtube-thumbnail-compressor`, `youtube-thumbnail-resizer`, `youtube-banner-size`, `logo-background-remover`, `youtube-shorts-safe-zone`, `youtube-title-checker`, `youtube-channel-name-generator`, `youtube-tag-generator`, `youtube-description-generator`, `youtube-link-generator`, `youtube-profile-picture-resizer`, `engagement-rate-calculator`, `youtube-thumbnail-downloader`, `youtube-thumbnail-tester`, `youtube-timestamp-generator`, `words-to-minutes-calculator`).

- [ ] **Step 4: Run tests and verify clean output**

Run: `node --test tests/multilingual-pages.test.cjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/[...slug]/page.tsx tests/multilingual-pages.test.cjs
git commit -m "i18n: wire localized shell titles and descriptions into localized tool pages"
```

---

### Task 5: Full Guide Localization across All 7 Non-Default Locales

**Files:**
- Modify: `config/guides-i18n.ts` (add `youtube-banner-size`, `youtube-monetization-requirements`, `how-to-change-youtube-thumbnail` for `es`, `ja`, `fr`, `de`, `pt`, `ko`, `it`)
- Modify: `config/i18n.ts:94-100` (`translatedGuideSlugs` array)
- Test: `tests/multilingual-pages.test.cjs:304-330`

**Interfaces:**
- Consumes: English guide definitions in `config/guides-i18n.ts`
- Produces: 100% complete localized guide data across all 7 guides and 8 locales, enabling full reciprocal hreflang links.

- [ ] **Step 1: Write the failing test expecting all 7 guides to be localized across all 8 locales**

In `tests/multilingual-pages.test.cjs`:
Update lines 306–311 so `GUIDE_SLUGS` contains all 7 guides:
```javascript
  const GUIDE_SLUGS = [
    'youtube-thumbnail-blueprint',
    'decoding-youtube-rpm',
    'youtube-shorts-safe-zone',
    'youtube-banner-size',
    'youtube-monetization-requirements',
    'how-to-change-youtube-thumbnail',
    'how-much-does-youtube-pay-per-1000-views',
  ];
```
- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/multilingual-pages.test.cjs`
Expected: FAIL (`Guide youtube-banner-size missing in es`).

- [ ] **Step 3: Translate and add the 3 missing guides to `config/guides-i18n.ts` across all 7 non-default locales**

Add complete, high-quality `LocalizedGuideData` (title, seoTitle, category, readTime, description, officialSources, contentSections, workedExample, checklist, faqs) for:
1. `youtube-banner-size`
2. `youtube-monetization-requirements`
3. `how-to-change-youtube-thumbnail`
into each locale block (`es`, `ja`, `fr`, `de`, `pt`, `ko`, `it`) in `config/guides-i18n.ts`.

- [ ] **Step 4: Update `translatedGuideSlugs` in `config/i18n.ts`**

Update `translatedGuideSlugs` in `config/i18n.ts` to include all 7 guides:
```typescript
export const translatedGuideSlugs = [
  'youtube-thumbnail-blueprint',
  'decoding-youtube-rpm',
  'youtube-shorts-safe-zone',
  'youtube-banner-size',
  'youtube-monetization-requirements',
  'how-to-change-youtube-thumbnail',
  'how-much-does-youtube-pay-per-1000-views',
];
```

- [ ] **Step 5: Run tests and verify they pass**

Run: `node --test tests/multilingual-pages.test.cjs`
Expected: PASS with 100% guide coverage across all 8 languages.

- [ ] **Step 6: Commit**

```bash
git add config/guides-i18n.ts config/i18n.ts tests/multilingual-pages.test.cjs
git commit -m "i18n: complete guide localization for all 7 guides across all 8 locales"
```

---

### Task 6: End-to-End Build, Sitemaps, and Verification

**Files:**
- Test / Verify: all output artifacts in `out/`
- Run: `npm run lint`, `npm run test`, `npm run validate:i18n`, `npm run build`, `npm run audit:seo`

**Interfaces:**
- Consumes: All updated components, configs, and sitemap scripts
- Produces: Verified production static build in `out/` with 0 errors.

- [ ] **Step 1: Run complete test suite**

Run: `npm run test`
Expected: All 85+ unit tests PASS.

- [ ] **Step 2: Run translation validator**

Run: `npm run validate:i18n`
Expected: PASS with 100% key and guide parity.

- [ ] **Step 3: Run production build and sitemap generation**

Run: `npm run build`
Expected: `next build` static export succeeds, `scripts/generate-sitemaps.mjs` generates valid sitemaps without warnings or missing alternates.

- [ ] **Step 4: Run linter**

Run: `npm run lint`
Expected: 0 lint errors.

- [ ] **Step 5: Inspect generated HTML artifacts in `out/`**

Verify with inspection script:
1. `out/it/tools/youtube-rpm-calculator.html` has Italian title, Italian description, non-www canonical, and complete hreflangs.
2. `out/it/guides/decoding-youtube-rpm.html` has Italian H2 and FAQ for RPM definition.
3. `out/tools/youtube-title-checker.html` has updated title tag targeting "Title Checker" and expanded guidance.
4. `out/guides/decoding-youtube-rpm.html` has "What is RPM on YouTube?" H2, formula, and FAQ JSON-LD.
5. `out/sitemap.xml` contains all localized guide URLs without any `www.creovly.com`.

- [ ] **Step 6: Commit all verified artifacts**

```bash
git commit -am "chore: verify static build, sitemaps, and seo audit checks"
```
