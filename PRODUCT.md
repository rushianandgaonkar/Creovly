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
- Creator preparation: configurable thumbnail dimensions and file-size targets, conservative title-length checks, and manual 9:16 Shorts planning margins. Verify current platform requirements before changing upload guidance.
- Local project archiving: saving metadata drafts and exporting zipped project assets (.zip) for upload readiness

## Capabilities and Constraints

### Implemented Capabilities (Step 3 Phase)
- **Local Publish Studio**: Multi-pane project workspace combining title analysis, description, thumbnail upload/inspection, Shorts planning, checklist items, local text draft save/load, and ZIP export.
- **Logo Background Remover**: Local solid-color background removal with a background color control, tolerance, border-connected removal, and transparent PNG export. No feathering, image eyedropper, or photo-subject detection.
- **Thumbnail Tools**: Local JPEG/PNG/WebP compression with user-selected targets that may not be achievable, plus a resizer with presets, custom dimensions, cropping and padding. Compression supports up to 10 images, 50 MB aggregate input, per-file results, cancellation and ZIP export.
- **Shorts Safe Zone Guide**: Manual 9:16 planning margins and an optional content rectangle, with geometric overlap checks and annotated PNG export. Margins are not official YouTube measurements.
- **Channel Artwork Presets**: The existing resizer includes banner (2560×1440), profile (800×800 Creovly preset), and watermark asset (150×150) canvases. Banner and circle guides are preview-only; exports stay rectangular. Watermark preparation does not place logos on images or remove backgrounds.
- **Title Checker**: Character-unit counter, illustrative wrapping preview, whitespace/punctuation/uppercase checks, and optional exact topic phrase matching. No sentiment analysis or predicted click-through score.
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
