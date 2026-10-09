# Creovly Step 1.5 review

## Correction pass completed

The five requested corrections from this review have now been implemented:

- Tool cards and shared pages display registry status. Tool and Studio outputs are labelled samples, unsupported processing/privacy claims were removed, and inactive tool/export actions are disabled.
- Preview results no longer expose Copy. The reusable panel requires a supplied asynchronous copy handler before showing the action and waits for successful completion before reporting success.
- Tailwind dark utilities now follow the selected HTML theme class. Native controls use the matching color scheme. Geist Sans and Geist Mono are applied, and pulse animation/smooth scrolling respect reduced motion.
- Shared metadata supplies per-page canonical, Open Graph, and Twitter values from centralized site/tool configuration. Unfinished tool, Studio, and guide previews use `noindex, follow`.
- Unimplemented company/legal footer links are hidden. Both SVG and ICO favicons use the existing Creovly viewfinder glyph.

Validation: lint and production build passed. Browser checks covered all 13 preserved pages at 375, 768, 1280, and 1600 pixels (52 page/width combinations), with no page-level overflow or captured console warnings/errors. All tool pages had sample headings, no Copy actions, and disabled processing/export buttons. Computed browser fonts confirmed Geist Sans/Mono. Manual theme switching updated the icons and native color scheme, and the saved choice survived reload.

Step 2 has not been started. The findings below are the historical review; the additional navigation accessibility suggestions were outside the five requested corrections.

---

Reviewed the current workspace against the supplied migration prompt and the original implementation in `creovly.zip`. No application source changes were made during this review.

## Verdict

The framework migration is substantially complete, and the existing tool interfaces were preserved. Step 1.5 needs a focused correction pass before Step 2. Keep all eight individual tool pages; their calculation and image-processing engines should remain deferred.

## Verified

- Installed Next.js version: 15.5.27. App Router, React, strict TypeScript, and Tailwind CSS are in use. Astro is absent from application dependencies and the active source tree.
- `npm run lint` passes without warnings or errors. Its `next lint` command emits a deprecation notice; switching to the ESLint CLI is a maintenance improvement.
- `npm run build` passes, including TypeScript validation and static page generation.
- All 13 required routes return HTTP 200: `/`, `/tools`, `/studio`, `/checklist`, `/guides`, and all eight tool URLs specified in the migration prompt.
- All 13 pages were checked at widths of 375, 768, 1280, and 1600 pixels. No page-level horizontal overflow was detected. The directory category bar scrolls horizontally as intended. Tablet navigation wraps tightly and could use a later refinement.
- Homepage and tool screenshots retain the intended mesh hero, neutral surfaces, hairline cards, wordmark, and button treatment. Original ZIP source comparison confirms that the useful page structures and prototype interfaces were largely retained. This was not a pixel-by-pixel before/after screenshot comparison.
- The homepage design-system showcase was replaced with Prepare → Check → Publish content.
- Studio is labelled Workspace Preview, its unsupported autosave claim was removed, and guide cards no longer link to missing articles.
- Checklist interaction and local persistence work: selecting a checkbox, then reloading, retained `1 of 6 completed`.
- The theme switch changes background tokens and survives navigation. Its utility styles have the defect described below.
- No warning/error console messages were captured during the normal responsive page checks.
- No authentication, databases, payments, external AI services, or other Step 2 implementation was found.

## Required corrections

### P1 — Make prototype status visible and remove unsupported claims

`components/ui/ToolCard.tsx:11` declares a status prop, but the component never consumes it and callers do not pass registry status. All eight registry entries are preview tools, yet cards say Open tool and Browser-safe and carry Popular/New/Free badges. Several tool results say Ready or Analyzed.

`components/tools/ToolPageShell.tsx:113` calls fixed sample results Live Output. Its default FAQ at line 24 claims actual client-side processing, and its privacy/standards language implies implemented, validated tools. The homepage also advertises functioning analysis and presents sample scores without explicit sample labels.

Render status from the registry in cards and the shared page shell. Label static outputs Sample results, explain that processing is not implemented, and disable or clearly identify inactive analysis/download/export controls. Correct platform-wide processing, guarantee, performance, and popularity claims. Preserve the interfaces and example output styling.

### P2 — Copy reports success without copying

`components/results/ResultSummaryPanel.tsx:29` sets Copied! even when no `onCopy` callback is supplied. Tool pages use the default Copy action without a callback; no clipboard write occurs.

Hide or disable Copy for prototype results, or implement it with a real clipboard write and error handling. Display success only after copying succeeds.

### P2 — Theme utilities ignore the selected theme

`app/globals.css:1` imports Tailwind without overriding its dark variant. Production CSS places `dark:*` rules inside `@media (prefers-color-scheme: dark)`, while the theme switch sets an HTML `.dark` class.

Browser verification: after switching to dark on a light-system browser, the canvas became black but the toggle still displayed the moon icon. Semantic colors also follow system theme rather than the selected theme.

Configure Tailwind's dark variant to follow the HTML class and set the native `color-scheme` appropriately. Verify explicit light/dark overrides with both system preferences. Honor reduced motion for smooth scrolling and pulse animation.

### P2 — Geist loads but is not applied

`app/layout.tsx:63` attaches the generated font variable classes, but `app/globals.css` never maps Tailwind's sans/mono font tokens to those variables and does not apply the generated font class.

The browser computed body font is the system stack, and production `.font-mono` uses Tailwind's default monospace stack. Wire the loaded Geist Sans and Geist Mono variables into actual font-family rules to preserve the requested typography.

### P2 — Complete the metadata foundation

`app/layout.tsx:17` defines defaults, while individual pages only override title/description. None of the 13 generated pages includes a canonical link. Every page inherits the homepage Open Graph title and URL rather than its own page metadata.

Create a small shared metadata helper using centralized site configuration. Supply per-page canonical URLs, Open Graph and Twitter titles/descriptions, and appropriate preview indexing policy. Avoid repeating brand/domain/tool metadata independently across page files.

### P2 — Remove dead footer destinations

`config/site.ts:65` exposes `/about`, `/contact`, `/privacy`, `/terms`, and `/disclaimer`; all five return HTTP 404. Hide these links until their destinations exist. This phase does not require writing new company or legal pages.

### P3 — Remove the remaining Astro starter favicon

`public/favicon.svg:1` still contains Astro's starter logo, and `app/layout.tsx:42` references it. Replace the starter favicon with Creovly branding and verify the ICO asset too.

## Additional accessibility cleanup

- `components/form/DropZone.tsx:60`: the visually hidden file input has no visible focus treatment on its container; add a focus-within state. It advertises drag-and-drop and a size limit but implements neither; mark it as a prototype or change the wording rather than expanding processing scope.
- `app/tools/page.tsx:40`: category anchor links are wrapped in a tablist without tab roles or tab behavior. Use navigation semantics for these section links.
- `components/layout/Header.tsx:83`: mobile navigation opens and links can be reached, but Escape does not dismiss it. Add dismissal and sensible focus handling.
- `app/globals.css:100`: reduced-motion support is missing for smooth scrolling and repeating pulse animations.

UI checks used the [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md), alongside the project's DESIGN.md and migration requirements.

## Next step

Complete these Step 1.5 corrections, rerun lint/build and the targeted browser checks, then proceed to Step 2's page/category architecture and one genuinely working reference tool. No redesign or tool-engine implementation is needed to close this review.
