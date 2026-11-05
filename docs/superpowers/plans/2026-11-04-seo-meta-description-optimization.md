# Creovly — SEO Meta Description Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement unique, SEO-optimized meta descriptions for all existing tool pages across all 8 supported languages using the Next.js App Router Metadata API, and verify server-rendered HTML output.

**Architecture:** Update centralized tool descriptions in `config/site.ts` (`toolRegistry`) and localized translations in `config/i18n.ts` (`translations[locale].tools[slug].description`). The existing `createToolMetadata` and `createPageMetadata` helpers in `lib/metadata.ts` automatically pipe these descriptions into HTML `<meta name="description">`, Open Graph (`og:description`), Twitter cards (`twitter:description`), and Schema.org structured data (`SoftwareApplication` JSON-LD) across both default (English) and localized (`/[locale]/tools/[tool-slug]`) routes.

**Tech Stack:** Next.js 15 (App Router), TypeScript, React 19, Tailwind CSS.

**Spec:** User request "# Creovly — SEO Meta Description Optimization"

## Global Constraints

- Preserve existing homepage description verbatim.
- Preserve existing Open Graph, Twitter, structured data, robots, and sitemap configuration.
- Synchronize Open Graph and Twitter descriptions with the page-specific SEO description.
- Ensure every indexable tool page has exactly one nonempty meta description in its server-rendered HTML.
- Avoid duplicate description tags.
- Provide natural, localized descriptions for Spanish (`es`), Japanese (`ja`), French (`fr`), German (`de`), Portuguese (`pt`), Korean (`ko`), and Italian (`it`).
- Zero modifications to tool functionality, components, or styling.

## Review Focus

1. **Meta tag duplication:** Verify that server-rendered HTML contains exactly one `<meta name="description">` per tool page.
2. **Synchronized Open Graph / Twitter descriptions:** Verify that `og:description` and `twitter:description` match the SEO meta description.
3. **Locale coverage:** Verify that none of the 8 locales serve empty, fallback, or untranslated descriptions for any of the 9 tools (72 combinations total).
4. **Canonical & hreflang integrity:** Verify that canonical URLs and alternate hreflang links remain intact and accurately formatted.
5. **Production build & verification:** Verify that `npm run lint` and `npm run build` pass without warnings or errors.

---

### Task 1: Update English Tool Registry Descriptions in `config/site.ts`

**Files:**
- Modify: `config/site.ts:86-190`

**Interfaces:**
- Consumes: Approved 9 English descriptions from the spec
- Produces: Updated `toolRegistry` array where each tool definition contains the exact approved meta description

- [ ] **Step 1: Update `config/site.ts` with the approved descriptions**
  Update the `description` fields in `toolRegistry` for:
  - `logo-background-remover`
  - `youtube-thumbnail-compressor`
  - `youtube-thumbnail-resizer`
  - `youtube-shorts-safe-zone`
  - `youtube-title-checker`
  - `youtube-revenue-calculator`
  - `youtube-rpm-calculator`
  - `youtube-watch-hours-calculator`
  - `youtube-monetization-calculator`

- [ ] **Step 2: Verify `config/site.ts` exports**
  Run TypeScript typecheck / lint check to verify syntax and types.

---

### Task 2: Update Localized Descriptions Across All 8 Languages in `config/i18n.ts`

**Files:**
- Modify: `config/i18n.ts` (sections: `en`, `es`, `ja`, `fr`, `de`, `pt`, `ko`, `it`)

**Interfaces:**
- Consumes: Approved English descriptions and localized translations for all 9 tools across the 7 non-default locales
- Produces: Updated `translations` object where `translations[locale].tools[slug].description` contains the localized, natural search descriptions

- [ ] **Step 1: Update English tool descriptions under `translations.en.tools`**
  Ensure all 9 tools in `translations.en.tools` match the approved English descriptions verbatim.

- [ ] **Step 2: Update Spanish tool descriptions under `translations.es.tools`**
  Ensure natural creator-focused Spanish descriptions for all 9 tools.

- [ ] **Step 3: Update Japanese tool descriptions under `translations.ja.tools`**
  Ensure natural Japanese descriptions for all 9 tools.

- [ ] **Step 4: Update French tool descriptions under `translations.fr.tools`**
  Ensure natural French descriptions for all 9 tools.

- [ ] **Step 5: Update German tool descriptions under `translations.de.tools`**
  Ensure natural German descriptions for all 9 tools.

- [ ] **Step 6: Update Portuguese tool descriptions under `translations.pt.tools`**
  Ensure natural Portuguese descriptions for all 9 tools.

- [ ] **Step 7: Update Korean tool descriptions under `translations.ko.tools`**
  Ensure natural Korean descriptions for all 9 tools.

- [ ] **Step 8: Update Italian tool descriptions under `translations.it.tools`**
  Ensure natural Italian descriptions for all 9 tools.

---

### Task 3: Build Verification & HTML Metadata Inspection

**Files:**
- Read: `out/tools/*.html`
- Read: `out/[locale]/tools/*.html`

**Interfaces:**
- Consumes: Static export HTML generated by `npm run build`
- Produces: Verified meta tags across all 72 tool page HTML files

- [ ] **Step 1: Run production build**
  Execute `npm run build`. Verify compilation, typecheck, static page generation (181/181 pages), and postbuild scripts pass with 0 errors.

- [ ] **Step 2: Run verification script**
  Write and execute a verification script that parses all 72 tool HTML files in `out/`, checking:
  - Exactly 1 `<meta name="description">` tag per page
  - Character count and non-emptiness
  - Synchronization with `og:description` and `twitter:description`
  - Presence of correct canonical URL and hreflang links
  - Absence of duplicate or conflicting meta tags
  - Absence of English text on localized tool pages

---

### Task 4: Generate Final Audit Report

**Files:**
- Output: Final validation report table containing URL, Meta description, Language, Character count, Result (PASS/FAIL), and Audit notes.

- [ ] **Step 1: Compile the 72-row audit table**
  Include all 9 tools across 8 languages with character count and PASS status.

- [ ] **Step 2: Report additional routes audited**
  Include `/tools` and `/tools/thumbnail` analysis.

