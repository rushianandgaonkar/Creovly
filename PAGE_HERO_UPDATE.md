# Inner-page gradients

Adapted the supplied static radial gradient into `components/ui/gradient-background-4.tsx`, with a shared `PageHero` wrapper and CSS theme tokens. No new packages, state, assets, or context providers are needed. Removed unused imports/state from the supplied example; the component remains server-compatible.

Applied gradient title panels to all eight tools through `ToolPageShell`, plus the directory, thumbnail category, checklist, Guides preview, and Studio preview. Color mapping is blue for thumbnails, rose for Shorts, violet for titles/guides, teal for money/growth, amber for checklist, and indigo for directory/Studio. Forms and results retain neutral surfaces.

Verified representative pages in light/dark mode and all page types at 375px without horizontal overflow. Browser checks reported no console warnings/errors. The existing homepage treatment remains intact.

Validation: `npm run lint` and `npm run build` passed; all 17 pages generated.
