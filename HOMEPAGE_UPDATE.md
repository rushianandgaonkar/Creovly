# Tools-first homepage and hydration follow-up

## Homepage

- Replaced the large marketing hero with a compact introduction and the existing brand line.
- All eight registry tools now appear on the homepage, before the checklist and clearly labelled Publish Studio preview.
- Shared ToolDiscovery component powers both `/` and `/tools`, with local text search, category filters, result counts, clear filters, and an empty state.
- Existing `/tools#thumbnail`, `/tools#title`, and `/tools#money-growth` anchors remain valid.
- Header action now leads to tool discovery; Studio navigation explicitly says Preview. Removed sample scores and showcase results from the homepage.
- Server-rendered page content is retained; client interaction is limited to tool discovery and existing navigation/theme controls.

## Reported data-next-badge warning

The attribute was located in the installed Next.js development-tools bundle, not in application components. Configured `devIndicators: false` using the supported Next.js option. This hides the development badge; Next.js still reports application build/runtime errors. No new hydration-warning suppression was added.

Development builds now use `.next-dev`, while production uses `.next`, to prevent local development from overwriting files used by the production preview. The development folder is ignored by Git and its generated TypeScript definitions are included in tsconfig.

Reference: https://nextjs.org/docs/app/api-reference/config/next-config-js/devIndicators

## Verification

- Production build and lint pass; all 20 existing regression tests pass.
- Browser search and category filtering checked, including combined filters, no results, clearing filters, keyboard activation, and existing title-category navigation.
- Homepage checked at 375, 768, 1280, and 1600 pixel widths with no horizontal overflow. First tool cards begin within an 800-pixel-high initial viewport at all four widths.
- Development checks exercised the homepage, directory, title checker, compressor, and checklist, including reloads after theme changes. No warning/error logs observed.
- The configured development badge is hidden (its ancestor has display:none); the framework may still keep its internal nodes in the development shadow DOM.
- Production homepage/directory interaction checks produced no warning/error logs.

The original full hydration attribute diff was not supplied, so the exact mismatched attribute was not confirmed. The reported badge-specific path has been mitigated, and the warning was not reproduced in the checks after the change.
# Approved visual refinement — October 7, 2026

- Compact centered brand promise with a static blue radial glow and faint grid; tool discovery follows immediately.
- Homepage-only decorative SVG diagrams distinguish all eight tools. They contain no live outputs, invented scores, or performance claims and are hidden from assistive technology.
- Primary header navigation is Tools and Checklist. Removed the duplicate discovery CTA and category navigation; existing routes and category anchors remain intact.
- Studio and Guides are secondary footer links, both labelled Preview. The Studio preview and checklist cards remain below the tool collection.
- Existing search, category filtering, status messaging, and shared tool-card components are reused. No animation or component library was added.
- Mobile navigation supports Escape with focus returned to its toggle.
- Verified search and filters, light/dark appearance, mobile menu, no horizontal overflow at 375/768/1280px, and no browser console warnings/errors during development checks.
- Tailwind documentation snapshot initialized with user approval; generated documentation is excluded from Git.
- Final validation: `npm run lint` and `npm run build` passed. Production build generated all 17 pages.
