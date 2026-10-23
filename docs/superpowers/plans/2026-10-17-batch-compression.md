# Batch Thumbnail Compression Implementation Plan

> **For agentic workers:** Use executing-plans to implement task-by-task in this session.

**Goal:** Extend the existing compressor to bounded local batches with per-file outcomes and real ZIP downloads.
**Architecture:** Sequential processing reuses compressImage and its cancellation/signature guards. Shared DropZone gains opt-in multiple selection; other tools retain single selection. A batch library owns limits, cancellation, and output filenames. ZIP reuses createStudioZip, without dependencies.
**Tech Stack:** Existing Next.js, React, TypeScript, Tailwind, Node test runner.
**Spec:** User-approved implementation sequence in this conversation; scope today is foundation reconciliation and batch compression before the subsequent phases.

## Constraints and review focus
- Preserve existing routes, theme, samples, formats and single-file usability.
- Maximum 10 inputs, 20 MB each, 50 MB aggregate input, 60 MB aggregate completed output. Existing dimension/signature/animation guards apply.
- Processing is sequential. Individual errors do not stop later valid files. Cancellation discards late results and marks unprocessed files cancelled; completed files remain downloadable.
- Settings changes or replacing the batch invalidate results. Removing one item retains the other completed results. Reset/unmount cancels work and stale callbacks cannot restore it.
- Distinct ASCII ZIP filenames retain ordering; ZIP includes completed files only, including valid outputs whose size target was missed.
- Size target success must not claim platform eligibility. PNG can grow; WebP is not described as a recommended YouTube upload format.

## Tasks
- [x] Write and run failing batch tests for limits, per-file errors, serial execution, late cancellation, output bounds and filename collisions.
- [x] Implement lib/batch-compression.ts; run tests green.
- [x] Add opt-in multiple selection to DropZone; integrate bounded queue/settings/progress/cancel/results/downloads/ZIP into ThumbnailCompressor.
- [x] Reconcile product claims and update compressor guidance/FAQ/registry.
- [x] Run tests, lint and production build; review changes and record evidence.
- [ ] Finish browser checks of mixed inputs, single-file operation, cancellation, downloaded ZIP and mobile/theme behavior. Native file-picker automation could not target its dialog reliably; these checks remain pending.

## Execution ledger
- Ruling: continue in the existing workspace, preserving user changes and index; this is the ongoing local preview checkout, with unrelated work already present. No commits, branches, or destructive operations are part of this task.
- Ruling: execute inline under the user's explicit instruction to begin implementation; do not request another execution-method approval.
- Foundation: source confirms solid-color logo removal, manual Shorts margins and basic title checks; PRODUCT.md currently overstates several of these capabilities and will be corrected.
- Verification: 40 tests pass, lint has no warnings/errors, production build generates all 21 pages. A review found leading underscores could violate the shared ZIP writer's filename rule; a failing integration test reproduced it and the normalization fix passed.
- Scope: later roadmap features and homepage/directory redesign remain for subsequent phases.
