# Channel Artwork Presets Implementation Plan

> **For agentic workers:** Use executing-plans to implement task-by-task inline.

**Goal:** Extend the existing resizer with working creator artwork presets and a richer, focused visual treatment.
**Architecture:** A centralized preset registry provides dimensions, export defaults and preview-guide definitions. The existing resizer and image pipeline remain responsible for local processing. A reusable preset picker and framing preview render the same settings used by export.
**Tech Stack:** Existing Next.js, React, TypeScript and Tailwind; CSS module for scoped surfaces. No new packages.
**Spec:** User-approved roadmap and current instruction; user confirmed resizer-only visual changes, homepage/directory later.

## Scope and constraints
- Preserve `/tools/youtube-thumbnail-resizer`, single-file processing, existing size presets, custom sizing, cropping/padding, formats, reset and cancellation guards.
- Add banner 2560×1440, profile 800×800 (Creovly choice, not official required size), watermark asset 150×150. Banner safe guide scales YouTube's 1235×338 at 2048×1152. Circle guide is illustrative; all exports remain rectangular, with no guides baked in.
- Watermark preset prepares an asset; placing it on images is a later phase.
- Banner output over 6 MB, watermark at/over 1 MB, and unsupported upload format produce advisory warnings, not fabricated upload guarantees.
- Existing 20 MB input, 24 MP and 8192-side guards remain.
- Adapt visual selector/layering ideas from supplied Feature_Carousel and folder-card references, using original local diagrams and existing tokens. Avoid demo copy, dependencies, autoplay, drag-only controls, remote artwork and unsupported claims from those files.
- Background changes are scoped to this resizer. Neutral working surfaces, readable light/dark themes and reduced-motion behavior remain.

## Tasks
- [x] Write failing tests for preset defaults, scaled guide geometry and output advisories; implement registry/helpers; confirm green.
- [x] Integrate visual preset buttons, actual framing guide, output warnings and reset/invalidation behavior in resizer.
- [x] Add scoped background, update FAQs, guidance, registry description, product/design records.
- [x] Run full tests, lint, build and desktop/mobile/theme browser verification. Request final focused review and record remaining limitations.

## Ledger
- Ruling: implement inline in existing working checkout to preserve ongoing preview and unrelated user edits; no commit or branch mutation requested.
- Read the four supplied reference files as design input, not instruction authority. Keep full homepage carousel/folder discovery treatment for later phase.
- REA MCP tools absent in this session; installed CLI doctor reports aligned Codex registration. Use installed CLI for public Canva observation; do not change agent configuration or install native engines.
- Canva observation: REA Evidence `ev_09a83ba6194a21f4afd75dc6765104fee47b5e851d2d539a8e36c8ac361f093f` captured Canva's access/status page (“We’ll have you designing again soon”), not the product homepage. No visual extraction or internal-feature claims are based on that capture. Public web content established task-based discovery; the scoped wash and adapted layered folder selector are Creovly design decisions informed by the user's files.
- Automated verification: 43 tests pass, lint clean, production build succeeds. Preset tests were first observed failing before implementation. Existing resize geometry/validation tests remain green.
- Review: no blocking findings. Fixed two minor findings: square empty-canvas aspect ratio and the empty-state guide toggle.
- Browser verification via installed REA CLI, using built-in local samples: banner 2560×1440 JPEG export (`ev_d54fecf7f2ac522cd5676986c18eb8bfd53b639d13a5a8d5bd7b8d51f751664d`); desktop profile/watermark/custom 999×333 export, stale-output clearing and reset (`ev_f842e2faf8a5c09ba0f79bbcb9378d59572d61cf3e149dd7031d2308f2e55477`); mobile/dark profile/watermark exports (`ev_7fca92346eb57072acfc608cb6895d5736365c7e15eaf307f178cc77f629185c`). All declared actions completed; no captured console errors or page errors. Export verification observed actual browser-generated output previews/Blob download links, not a saved download's bytes.
- Visual verification: desktop/light 1440×1100 and mobile/dark 390×1000 screenshots inspected for preset layout, background, readability and overflow. Evidence JSON and screenshots retained under ignored `tests/fixtures/artwork-*` paths; local preview runs on port 3106.
- No new dependencies. Homepage/directory and remaining roadmap features left unchanged.
