# Creator Guides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the three Creator Guides on Creovly with verified official YouTube documentation citations, worked examples, actionable checklists, and links to relevant creator tools.

**Architecture:** Define centralized guide data and content modules in `lib/guides.ts` to power both dynamic or statically generated individual routes (`/guides/[slug]`) and the index page (`/guides`). Use shared, accessible UI components following the Creovly design system (`PageHero` with violet tone, Geist typography, light/dark contrast, and zero external backend dependencies).

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Node.js test runner (`node --test`).

**Spec:** User instructions approving three guides subject to corrections:
- Verify platform requirements against current official documentation and link sources beside factual claims.
- Update thumbnail recommendations: 1280×720 (min 640px), 16:9, JPG/PNG recommended for YouTube upload, 2MB mobile upload limit vs. 50MB desktop limit.
- Remove unsupported audience percentages and guaranteed CTR claims; focus on legibility and contrast at small viewport scales.
- Distinguish long-form RPM from Shorts RPM, clarify included revenue streams, and prevent double deduction of YouTube's 45% revenue share.
- Label Shorts safe zones as practical recommendations with device and interface variation caveats.
- Include a worked example, actionable checklist, relevant tool links, and "Last verified: October 2026" in each guide.
- Update navigation (remove Preview badge) and directory indexing.

## Global Constraints

- 100% client-side / static rendering. No external analytics, tracking, or AI APIs.
- Strict adherence to `DESIGN.md`: neutral surfaces, violet tone for guides, Geist Sans/Mono typography, mobile-first responsive layout without horizontal overflow.
- Strict adherence to `PRODUCT.md`: no fake benchmarks, no guaranteed performance claims, accurate and honest numbers.
- Automated testing via `node --test tests/*.test.cjs`.
- Clean lint (`npm run lint`) and production build (`npm run build`).

## Review Focus

1. **Official citations presence**: Every factual platform claim (limits, revenue share, aspect ratios) must cite its official source directly with an external link.
2. **Double deduction prevention in RPM guide**: Explicitly warn creators that RPM is calculated *after* YouTube's revenue split, so deducting 45% again from RPM is an error.
3. **Format & file size clarity in Thumbnail guide**: Distinguish 2MB mobile video thumbnail upload limit from 50MB desktop limit, and explain why JPEG/PNG are recommended for YouTube uploads even if WebP is supported.
4. **Interface variability in Shorts guide**: Clearly emphasize that overlay positions vary across mobile aspect ratios and title lengths, framing margins as practical planning heuristics rather than fixed guarantees.
5. **Responsive and dark theme contrast**: Guides must read comfortably on mobile (375px) without overflow and maintain WCAG AA contrast in both light and dark themes.

---

### Task 1: Guide Data & Integrity Test Suite

**Files:**
- Create: `lib/guides.ts`
- Create: `tests/guides.test.cjs`

**Interfaces:**
- Produces: `GuideItem` interface, `guides` array, `getGuideBySlug(slug: string)` helper in `lib/guides.ts`.

- [ ] **Step 1: Write the failing test**
Create `tests/guides.test.cjs` verifying that all three guides exist, have required slugs, titles, reading times, last verified dates, worked examples, checklists, official documentation links, and valid related tools from `toolRegistry`.

- [ ] **Step 2: Run test to verify it fails**
Run: `npm test`
Expected: FAIL (cannot find module `../lib/guides` or test failure).

- [ ] **Step 3: Implement guide definitions in `lib/guides.ts`**
Create structured definitions for:
1. `youtube-thumbnail-blueprint`
2. `decoding-youtube-rpm`
3. `youtube-shorts-safe-zone`
Include metadata, official platform citations, worked examples, checklists, and related tool IDs.

- [ ] **Step 4: Run test to verify it passes**
Run: `npm test`
Expected: PASS (all 30+ tests passing).

---

### Task 2: Shared Guide UI Components

**Files:**
- Create: `components/guides/GuideArticle.tsx`
- Create: `components/guides/WorkedExampleCard.tsx`
- Create: `components/guides/ActionChecklist.tsx`

**Interfaces:**
- Consumes: `GuideItem` from `lib/guides.ts`, `PageHero` from `components/ui/PageHero.tsx`, `ToolCard` from `components/ui/ToolCard.tsx`.
- Produces: Accessible, responsive guide article components with semantic headings, breadcrumbs, official citation badges, worked example callouts, and checklists.

- [ ] **Step 1: Implement `WorkedExampleCard.tsx`**
Renders a structured, high-contrast calculation or visual framing example with step-by-step numbers.

- [ ] **Step 2: Implement `ActionChecklist.tsx`**
Renders a practical pre-publish checklist with interactive or static checkboxes for creators to follow before uploading.

- [ ] **Step 3: Implement `GuideArticle.tsx`**
Assembles the complete guide layout: breadcrumbs, violet `PageHero`, metadata strip (category, reading time, "Last verified: October 2026"), prose content, callout cards for official documentation, worked example, actionable checklist, and related tool recommendations.

---

### Task 3: Author and Route Individual Guide Pages

**Files:**
- Create: `app/guides/[slug]/page.tsx`

**Interfaces:**
- Consumes: `guides`, `getGuideBySlug` from `lib/guides.ts`, `GuideArticle` from `components/guides/GuideArticle.tsx`.
- Produces: Static routes for all three guides with dynamic SEO metadata, Open Graph tags, canonical URLs, and full content.

- [ ] **Step 1: Implement `app/guides/[slug]/page.tsx`**
Generate static params (`generateStaticParams`) for the three slugs:
- `youtube-thumbnail-blueprint`
- `decoding-youtube-rpm`
- `youtube-shorts-safe-zone`
Render 404 (`notFound()`) if slug does not exist.
Generate metadata (`generateMetadata`) with canonical path and social tags.

- [ ] **Step 2: Verify static route generation**
Run: `npm run build`
Expected: Build passes with `/guides/youtube-thumbnail-blueprint`, `/guides/decoding-youtube-rpm`, and `/guides/youtube-shorts-safe-zone` generated.

---

### Task 4: Update Guide Directory & Navigation

**Files:**
- Modify: `app/guides/page.tsx`
- Modify: `config/site.ts`

**Interfaces:**
- Consumes: `guides` from `lib/guides.ts`.
- Produces: Fully interactive `/guides` landing page linking to each individual guide, updated secondary navigation without preview badge, and indexing enabled.

- [ ] **Step 1: Update `app/guides/page.tsx`**
Replace "Coming Soon" with active "Read guide →" links pointing to `/guides/${guide.slug}`. Remove `noindex: true` so the educational guides can be indexed by search engines.

- [ ] **Step 2: Update `config/site.ts`**
Remove `badge: 'Preview'` from `secondaryNavItems` for Creator Guides and update any footer navigation references.

- [ ] **Step 3: Run lint and production build**
Run: `npm run lint` and `npm run build`
Expected: Clean pass with all 20+ routes compiled.

---

### Task 5: Final Validation & Mismatch Audit

**Files:**
- Review: `lib/image-compression.ts`, `lib/image-resize.ts`, `lib/shorts-guide.ts`, `lib/creator-calculators.ts`

- [ ] **Step 1: Run full test suite**
Run: `npm test`
Verify all regression tests and new guide integrity tests pass.

- [ ] **Step 2: Audit behavior alignment between guides and tools**
Check tool limitations and capabilities in existing code:
- Thumbnail compressor/resizer limits (20MB input limit, 2MB target recommendation, 1280×720 aspect ratio).
- Shorts safe zone margins (15% top, 28% bottom, 18% right in Creovly tool vs guide recommendations).
- RPM and Revenue calculator formulas (RPM formula: `(Revenue / Views) * 1000`, gross vs net).
Document any nuances or discrepancies.

- [ ] **Step 3: Final production build verification**
Run: `npm run build`
Ensure no compilation errors, static generation issues, or typing defects.
