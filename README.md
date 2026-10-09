# Creovly

**Create smarter. Publish better.**

Creovly is a pre-publish workspace and toolkit for YouTube creators. It is being built as a polished creator SaaS product rather than a generic collection of SEO utilities.

## Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Local development

```bash
npm install
npm run dev
```

Then open the local URL printed by Next.js.

## Production checks

Before considering a task complete:

```bash
npm run lint
npm run build
```

Both should complete without errors.

Regression tests run with `npm test`. The thumbnail compressor is available at `/tools/youtube-thumbnail-compressor`; the thumbnail category is at `/tools/thumbnail`. It processes images locally and preserves their dimensions. The resizer at `/tools/youtube-thumbnail-resizer` supports crop positioning, padding, custom dimensions, and local export. All eight individual tools are functional; Publish Studio and editorial guides remain previews.

## Project structure

```text
app/                  Routes, layouts, metadata
components/
  layout/             Header, Footer, navigation
  ui/                 Buttons, badges, shared primitives
  form/               Inputs, selects, sliders, toggles, drop zones
  results/            Metrics, progress, score and result panels
config/                Site navigation and tool registry
lib/                   Shared utilities
public/                Static assets
styles/                Global styles/design tokens when needed
```

The exact structure may evolve, but reusable components must remain centralized rather than copied into individual tool pages.

## Product areas

- Tools directory
- Thumbnail tools
- Title tools
- Money & Growth calculators
- Shorts tools
- Publish Studio
- Pre-Publish Checklist
- Creator Guides

## Current development phase

The project is currently in **Step 2: Individual creator tools**.

The thumbnail tools, title checker, and four money and growth calculators are implemented while preserving the existing visual identity. Studio and editorial guides remain previews; authentication, payments, databases, and external AI services remain out of scope.

Read `DESIGN.md` before making UI changes.
