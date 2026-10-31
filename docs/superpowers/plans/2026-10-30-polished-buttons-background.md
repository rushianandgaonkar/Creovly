# Polished Background Color, Pill Buttons, and Floating Shadows

**Goal:** Apply the warm, polished background color atmosphere, pill-shaped buttons, and soft diffused shadows from the user's reference image while keeping the changes simple, centralized, and robust.

---

## Design Specifications

### 1. Polished Warm Ambient Background (`app/globals.css`)
- Light theme canvas tokens:
  - `--bg-canvas`: `#faf8f5` (warm porcelain base, replacing flat `#fafafa`).
  - `--bg-canvas-elevated`: `#ffffff` (crisp white for cards & elevated buttons).
  - `--bg-canvas-subtle`: `#f4efe6` (soft warm secondary surface).
  - `--border-hairline`: `#e8e3d8` (soft warm border tone).
- Ambient radiant background on `body`:
  - Soft amber/peach glow in top-center (`rgba(254, 238, 218, 0.55)`).
  - Subtle lavender whisper in bottom-right (`rgba(235, 230, 254, 0.45)`).
  - Seamlessly blends into the porcelain base with fixed attachment.
- Dark theme equivalent:
  - Deep obsidian base (`#090a0f`) with deep twilight radial depth.

### 2. Button Styling & Floating Shadows (`Button.tsx` & `globals.css`)
- Defined refined shadow tokens:
  - `--shadow-button-primary`: multi-layer diffused shadow (`0 4px 14px -2px rgba(15, 23, 42, 0.22), 0 2px 5px -1px rgba(15, 23, 42, 0.12)`).
  - `--shadow-button-primary-hover`: elevated depth on hover (`0 8px 22px -3px rgba(15, 23, 42, 0.30), 0 3px 8px -1px rgba(15, 23, 42, 0.16)`).
  - `--shadow-button-elevated`: soft floating ambient shadow (`0 4px 18px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`).
  - `--shadow-button-elevated-hover`: elevated depth on hover (`0 8px 24px -3px rgba(15, 23, 42, 0.10), 0 3px 8px -1px rgba(15, 23, 42, 0.06)`).
- Updated button variants in `components/ui/Button.tsx`:
  - `primary`: `rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] shadow-[var(--shadow-button-primary)] hover:shadow-[var(--shadow-button-primary-hover)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150`.
  - `outline`: `rounded-full bg-[var(--bg-canvas-elevated)] text-[var(--text-ink)] border border-[var(--border-hairline)] shadow-[var(--shadow-button-elevated)] hover:shadow-[var(--shadow-button-elevated-hover)] hover:border-[var(--border-hairline-strong)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-150`.
  - Sizes: Comfortable pill padding (`sm: px-4`, `md: px-5`, `lg: px-7`).

---

## Completed Tasks

- [x] Task 1: Update design tokens and ambient background in `app/globals.css`.
- [x] Task 2: Refine `Button.tsx` with pill geometry, floating shadows, and subtle interactive micro-lifts.
- [x] Task 3: Verify with `npm test` (46/46 passed), `npm run lint` (0 errors), and `npm run build` (21/21 routes prerendered).
- [x] Task 4: Run `inspect.mjs` to capture and verify the real-browser render (`.taste-skill/inspect-buttons/`).
