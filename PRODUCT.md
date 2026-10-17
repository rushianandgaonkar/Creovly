# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Independent YouTube creators, video editors, and channel managers preparing video metadata, thumbnails, Shorts framing, and revenue projections before uploading to YouTube.

## Product Purpose

Creovly is a modern pre-publish workspace and creator SaaS product for YouTube creators. It helps creators optimize their titles, verify thumbnails, check Shorts safe zones, calculate revenue scenarios, and assemble complete project packages before publishing.

## Positioning

A zero-friction, local-first pre-publish command center:
- 100% client-side processing directly in the browser
- Zero sign-up, login, or subscriptions required
- Complete privacy: media and draft data never leave the creator's local device
- Focused pre-publish utility rather than generic SEO directories or cloud-dependent AI wrappers

## Operating Context

- Pre-upload phase of YouTube content production
- Desktop and mobile browser environments
- YouTube platform constraints: 1280×720 thumbnail resolution, 2MB thumbnail file size limit, 100-character title limit with ~50-60 character mobile truncation boundary, 9:16 Shorts interactive UI overlay safe zones
- Local project archiving: saving metadata drafts and exporting zipped project assets (.zip) for upload readiness

## Capabilities and Constraints

### Implemented Capabilities (Step 3 Phase)
- **Local Publish Studio**: Multi-pane project workspace combining title analysis, description, thumbnail upload/inspection, Shorts planning, checklist items, local text draft save/load, and ZIP export.
- **Logo Background Remover**: Pure client-side canvas-based solid background remover with tolerance, edge feathering, eyedropper color picker, and transparent PNG export.
- **Thumbnail Tools**: Browser-based client-side compressor (JPEG/WebP export under 2MB) and resizer (1280×720 HD with aspect fit/fill options).
- **Shorts Safe Zone Guide**: Interactive 9:16 preview with official YouTube mobile overlay masks (avatar, like/comment sidebar, sound title, progress bar).
- **Title Checker**: Live character counter, mobile truncation preview, sentiment, and power word analysis.
- **Calculators**: YouTube revenue, RPM, monetization, and watch hours calculators.
- **Pre-Publish Checklist**: Comprehensive interactive launch checklist.

### Durable Constraints (Out of Scope for Current Phase)
- No direct YouTube API publishing or OAuth authentication
- No server-side databases, accounts, or user persistence
- No paid tiers, billing, or paywalls
- No external cloud AI APIs or server-side image processing
- No analytics trackers or telemetry vendors

## Brand Commitments

- Brand Name: **Creovly**
- Brand Promise: **Create smarter. Publish better.**
- Voice: Concise, capable, practical, creator-focused. No buzzword stacks, no developer jargon in customer copy, and no exaggerated AI claims.
- Visual Language: Near-white/light-neutral canvas with elevated crisp surfaces, restrained blue accent (`#0070f3`), Geist typography, and generous whitespace. Dark mode supported with equivalent contrast.

## Evidence on Hand

- Verified client-side algorithms in `lib/` (`studio.ts`, `logo-background.ts`, `title-analysis.ts`, `studio-zip.ts`)
- Automated unit test suites in `tests/` (`logo-background.test.cjs`, `studio.test.cjs`)
- Sample test images and creator marks in `public/examples/`
- Zero external backend dependencies verified in `package.json`

## Product Principles

1. **Local-First & Private**: Processing belongs in the creator's browser. Files and text drafts never touch external servers.
2. **Absolute Content Integrity**: Never claim a feature works unless it is implemented. Never fabricate ratings, user counts, or benchmarks.
3. **Frictionless Velocity**: Instant tool access without sign-up forms, account verification, or paywalls.
4. **Focused Pre-Publish Utility**: Tools designed exclusively for the critical moments before clicking "Publish".

## Accessibility & Inclusion

- WCAG AA compliance for contrast in both light and dark themes
- Semantic HTML throughout with clear heading hierarchy
- Full keyboard navigation and visible focus rings on all interactive elements
- Screen-reader accessible form controls with explicit labels and `aria-live` status regions
- Respect for `prefers-reduced-motion` settings across all transitions
