# Creovly Agent Instructions

## Product

Creovly is a creator SaaS product and pre-publish workspace for YouTube creators.

Brand promise: **Create smarter. Publish better.**

Read `DESIGN.md` before changing UI or page architecture.

## Required stack

Use:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

Do not introduce Astro pages/components into the migrated project.

## Development commands

Use the project's npm scripts:

```bash
npm install
npm run dev
npm run lint
npm run build
```

Before declaring work complete, run lint and production build and resolve errors introduced by the task.

## Architecture rules

- Prefer Server Components for static content.
- Add `use client` only when interaction/browser APIs require it.
- Keep shared UI in reusable components.
- Keep navigation/site metadata/tool definitions in centralized configuration.
- Do not duplicate page shells or form/result primitives.
- Preserve established URLs unless a migration requires a documented redirect.

## Scope discipline

Follow the requested phase exactly.

During Step 1.5, do not add:
- authentication
- databases
- payments
- AI APIs
- analytics vendors
- unrelated new tools
- speculative backend services

Do not silently implement future roadmap items.

## Content integrity

Never claim a feature works unless it is implemented.

Examples:
- Do not say data auto-saves unless local persistence is actually wired.
- Do not say processing is 100% client-side unless the feature actually processes locally.
- Do not show fabricated usage counts, testimonials, revenue claims, ratings, or benchmarks.
- Planned tools should be clearly treated as planned/preview when not functional.

## Design integrity

Preserve the established Creovly design direction during refactors and migrations. Do not redesign simply because the framework changes.

Do not expose internal design-system documentation on customer-facing pages. Do not mention inspiration brands such as Vercel in public UI or code comments intended to define Creovly's identity.

## Accessibility and quality

- semantic HTML
- keyboard navigation
- visible focus states
- form labels
- responsive layouts
- light/dark contrast
- avoid unnecessary client JavaScript
- no console errors in normal usage
