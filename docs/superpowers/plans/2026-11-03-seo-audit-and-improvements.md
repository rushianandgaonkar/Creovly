# SEO Audit and Improvement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Conduct an evidence-based audit of https://creovly.com's SEO implementation, fix confirmed issues across XML sitemap, multilingual SEO, and technical SEO without regressions, verify production build artifacts, and establish an updated, evidence-based SEO score (from provisional 78/100 to target >= 95/100).

---

## File Structure & Impact Map

- `config/i18n.ts`: Update `getLanguageAlternates` so root path returns apex canonical URL (`https://creovly.com`) consistently without trailing slash.
- `app/sitemap.ts`: Remove unsupported `priority` and `changeFrequency` tags, normalize homepage URL/alternates, use accurate `lastModified` dates (`2026-11-03`), preserve static export compatibility.
- `config/guides-i18n.ts`: Provide structured multilingual guide article content (sections, worked examples, checklists, FAQs) across all 8 languages so guides are fully localized.
- `components/guides/GuideArticle.tsx`: Render localized sections, worked examples, and checklists based on active locale.
- `lib/structured-data.ts`:
  - Fix `toolFaqJsonLd` to use active `locale` FAQs from translations dictionary.
  - Fix `guideArticleJsonLd` to use localized headline, description, inLanguage.
  - Update `guideFaqJsonLd` to support localized FAQ questions and answers.
- `app/[locale]/[...slug]/page.tsx`:
  - Use localized title, description, and OG images in `generateMetadata` for guides.
  - Eliminate duplicate JSON-LD schema generation on tool and guide pages.
  - Provide localized breadcrumb labels for guides.
- `public/llms.txt`: Align privacy/analytics wording with actual implementation (local processing + Google Consent Mode v2).
- `package.json`: Add `"postbuild": "node scripts/generate-sitemaps.mjs"` (or bind to `"build"`) so static export immediately guarantees server-rendered `<html lang="...">` across all 8 languages without client JS.
- `scripts/validate-translations.mjs` & `scripts/generate-sitemaps.mjs`: Update validators to check canonical consistency, absence of duplicate JSON-LD, and valid multilingual guide rendering.
- `tests/multilingual-pages.test.cjs`: Add tests verifying multilingual guide metadata, H1 alignment, and JSON-LD schema parity.

---

## Implementation Tasks

### Task 1: Audit Deliverable & Sitemap Fixes (Priority 1)
- [ ] Fix root alternate trailing slash mismatch in `config/i18n.ts` (`getLanguageAlternates`).
- [ ] Refactor `app/sitemap.ts` to remove deprecated/ignored `priority` and `changeFrequency`, use accurate ISO `lastModified` dates, and ensure perfect reciprocal hreflang self-references.
- [ ] Verify `out/sitemap.xml` conforms to sitemap schema with valid XML, HTTP 200, correct namespace, and zero self-referencing discrepancies.
- [ ] Verify existing test suite passes (`npm test`).

### Task 2: Multilingual Guide Localization & Metadata Alignment (Priority 2)
- [ ] Create `config/guides-i18n.ts` with accurate translations for guide content sections, worked examples, and checklists for all 7 non-English languages (es, ja, fr, de, pt, ko, it).
- [ ] Update `components/guides/GuideArticle.tsx` to display localized content sections, worked examples, checklists, and official source descriptions.
- [ ] Update `app/[locale]/[...slug]/page.tsx` `generateMetadata` for guide routes to use translated titles and descriptions matching the rendered `<h1>`.
- [ ] Update `app/[locale]/[...slug]/page.tsx` breadcrumbs for guides to use localized guide title and category.

### Task 3: Structured Data & Schema Deduping (Priority 2 & 3)
- [ ] Fix `lib/structured-data.ts` `toolFaqJsonLd` to dynamically pull localized FAQ questions and answers for the requested locale.
- [ ] Fix `lib/structured-data.ts` `guideArticleJsonLd` and `guideFaqJsonLd` to use localized headlines, descriptions, inLanguage, and FAQ Q&As.
- [ ] Eliminate duplicate JSON-LD scripts on localized tool pages by adjusting shell rendering between `app/[locale]/[...slug]/page.tsx` and tool pages.
- [ ] Verify Schema.org validity of rendered JSON-LD on homepage, tool pages, guide pages, and legal pages.

### Task 4: Static Export Server-Rendered HTML Lang & Build Integration (Priority 2)
- [ ] Configure `package.json` with `"postbuild": "node scripts/generate-sitemaps.mjs"` so every static build automatically processes `out/` HTML files to have `<html lang="...">` matching the locale without client JS.
- [ ] Verify generated static HTML files in `out/` across all 8 languages (`es`, `ja`, `fr`, `de`, `pt`, `ko`, `it`, `en`) have their respective `lang` attribute set on the initial `<html>` tag.

### Task 5: Technical SEO Consistency, Robots.txt & llms.txt (Priority 3)
- [ ] Verify `app/robots.ts` and `out/robots.txt` alignment with canonical sitemap URL (`https://creovly.com/sitemap.xml`) and AI bot rules.
- [ ] Update `public/llms.txt` privacy description to accurately reflect local in-browser processing with Google Consent Mode v2 analytics.
- [ ] Verify HTTP 404 responses, trailing-slash 301 redirects, and Cloudflare configuration recommendations.
- [ ] Review Core Web Vitals, font optimizations (`next/font`), and mobile responsiveness.

### Task 6: Full Verification, Regression Testing & Audit Table
- [ ] Run `npm run validate:i18n`.
- [ ] Run `npm test`.
- [ ] Run `npm run build` and inspect generated `out/` HTML and XML artifacts.
- [ ] Compile the PASS/FAIL audit table with concrete evidence for every issue.
- [ ] Compute the revised evidence-based SEO score with justification.

