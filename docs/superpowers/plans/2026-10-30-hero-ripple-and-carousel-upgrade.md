# Implementation Plan: Hero Interactive Ripple & Rounded Apple-Card Carousel Upgrade

**Date:** 2026-10-30  
**Feature:** Hero Interactive Ripple Canvas, Apple-Style Rounded Carousel Cards, and Gallery Visible Border & Shadow Elevation.

---

## 1. Helpful Skills Assessment

| Skill | Purpose & Role in this Task |
|---|---|
| **`using-superpowers`** | Ensures structured discipline: planning first, verification gates, and clear communication. |
| **`writing-plans`** | Creates bite-sized, testable implementation tasks before editing code. |
| **`design-taste-frontend`** | Provides anti-slop visual guidance: clean typography, visible borders for floating surfaces, brand harmony, and real-browser visual inspection via `inspect.mjs`. |
| **`ui-styling` / `design-system`** | Handles Tailwind tokens, CSS keyframe animations, rounded geometry scales, and accessible micro-interactions. |
| **`verification-before-completion`** | Guarantees all unit tests (`npm test`), lint (`npm run lint`), and production build (`npm run build`) pass before declaring completion. |

---

## 2. Design & Architecture Specifications

### Component 1: Interactive Ripple Background (`Hero_Page_Prompt.txt`)
- **File:** `components/ui/interactive-ripple-background.tsx`
- **Behavior:**
  - `use client` component that captures clicks and spawns expanding concentric ripple rings at click coordinates.
  - Spawns periodic ambient ripples at random locations every 3.8 seconds so the hero surface feels alive and tactile.
  - Automatically cleans up expired ripples after 2 seconds.
- **Creovly Design Integration:**
  - Next.js App Router and Tailwind v4 compatible: `@keyframes ripple` and `.animate-ripple` in `app/globals.css`.
  - Ripple border colors tuned to Creovly’s warm porcelain palette:
    - Inner ring: warm amber (`rgba(245, 158, 11, 0.35)`)
    - Middle ring: lavender mist (`rgba(168, 85, 247, 0.25)`)
    - Outer ring: sky accent (`rgba(14, 165, 233, 0.2)`)
  - All hero content (`CreatorHero.tsx`), buttons, and `StudioHeroWorkspace` in `relative z-10` with `pointer-events-auto` so full interactivity and accessibility remain intact.

### Component 2: Modern Rounded Carousel Cards (`Carousel.txt`)
- **Files:** `components/ui/polaroid-line-carousel.tsx` and `components/ui/polaroid-line-carousel.module.css`
- **Card Geometry & Layout:**
  - Upgraded cards from vintage 3px flat polaroid prints to modern Apple Card style:
    - `border-radius: 20px` (`rounded-2xl`), elevated clean white surface (`var(--frame-surface)`), hairline border (`var(--border-hairline)`).
    - Diffused floating shadow (`0 6px 20px -3px rgba(15, 23, 42, 0.06)`).
    - Removed vintage clothes-peg clip (`.clip`).
    - Inside card:
      - Picture frame with `border-radius: 14px` and full-bleed high-res tool illustration.
      - Pill category tag in upper right (`rounded-full px-2.5 py-0.5 text-[11px]`).
      - Bold, legible tool name and description.
      - Circular action button (`h-8.5 w-8.5 rounded-full bg-slate-50 border flex items-center justify-center`) with `ArrowUpRight` rotating 45° on card hover (`.print:hover .actionIcon`).
  - Preserved drag-to-scroll, keyboard arrow navigation, and math clamping (100% test pass rate in `tests/polaroid-navigation.test.cjs`).

### Component 3: Gallery Container Visible Border & Subtle Shadow
- **File:** `components/ui/polaroid-line-carousel.module.css` (`.gallery` / `polaroid-line-carousel_gallery__LnpGv`)
- **Fix:**
  - Added thin visible border:
    - Light: `border: 1px solid var(--border-hairline-strong);`
    - Dark: `border: 1px solid var(--border-hairline-strong);`
  - Added subtle floating shadow:
    - Light: `box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04);`
    - Dark: `box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.5), 0 4px 14px -2px rgba(0, 0, 0, 0.3);`

---

## 3. Completed Tasks

- [x] Task 1: CSS Animation & Keyframes Setup (`@keyframes ripple` & `.animate-ripple` in `app/globals.css`).
- [x] Task 2: Build `interactive-ripple-background.tsx` with cursor click and ambient periodic ripples.
- [x] Task 3: Integrate Ripple Background into Hero Page (`components/home/CreatorHero.tsx`).
- [x] Task 4: Upgrade Carousel Cards to Apple Card Style and add thin visible border & shadow to `.gallery` (`components/ui/polaroid-line-carousel.module.css` & `components/ui/polaroid-line-carousel.tsx`).
- [x] Task 5: Verification Suite (`npm test` 46/46 passed, `npm run lint` 0 warnings, `npm run build` 21/21 routes passed, `inspect.mjs` browser visual checks verified).
