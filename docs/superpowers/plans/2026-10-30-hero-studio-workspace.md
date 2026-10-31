# Hero Section: Publish Studio Interactive Workspace Preview

**Goal:** Integrate a flagship, true-to-scale interactive fragment of Publish Studio into the Creovly homepage Hero section, fulfilling the `design-taste-frontend` requirement for strong first-screen media coverage and demonstrating immediate product capability without sign-up.

---

## Technical & UX Specification

### 1. Component Structure
- Create `components/home/StudioHeroWorkspace.tsx` (`'use client'`, `data-ui`):
  - **Studio Stage Header**: Clean browser/studio titlebar with project name, format toggle (`16:9 Long-Form` / `9:16 Shorts`), and local-engine status indicator.
  - **Split Workbench Layout**:
    - **Left Column: Metadata & Title Stress-Tester**:
      - Real input field with active sample creator title: `"How I Automated My Video Production (And Saved 15 Hours)"`.
      - Real-time character counter (`58/100`) and visual mobile feed truncation preview indicator.
      - Description & keyword tag pills (`#productivity`, `#creator`, `#automation`).
    - **Center Column: Visual Thumbnail Verification**:
      - 16:9 high-resolution thumbnail display using real image asset (`/examples/compressor-source.jpg`).
      - Verified badges: `1280 × 720 HD`, `< 2 MB (1.1 MB WebP)`, and bottom-right YouTube timestamp `14:20`.
      - Preset switcher buttons allowing user to preview different creator thumbnail styles.
    - **Right Column: Pre-Publish Readiness Scorecard**:
      - Interactive 11-point checklist mini-list (Thumbnail Specs, Safe Zones, Title Length, Audio Licensing, Description Links).
      - Live completion score: `10/11 Checks Passed`.
      - Direct action: `Open in Publish Studio →`.

### 2. Integration into `CreatorHero.tsx`
- Refactor `components/home/CreatorHero.tsx`:
  - Retain clear, punchy copy: *"Create smarter. Publish better."* and *"The pre-publish workspace for YouTube creators."*
  - Place `StudioHeroWorkspace` prominently beneath the call-to-action buttons.
  - Responsive framing: seamless multi-column on desktop (≥1024px), clean stack on tablet/mobile.

### 3. Verification & Quality Gates
- `npm test`: Confirm 46/46 unit tests continue to pass.
- `npm run lint`: Confirm 0 errors, 0 warnings.
- `npm run build`: Confirm clean production build.
- `design-taste-frontend` inspection (`inspect.mjs`): Verify first-screen media coverage, image detection, and layout stability.

---

## Tasks
- [x] Task 1: Build `components/home/StudioHeroWorkspace.tsx` with authentic studio controls and interactive preview states.
- [x] Task 2: Integrate `StudioHeroWorkspace` into `components/home/CreatorHero.tsx`.
- [x] Task 3: Verify with `npm test`, `npm run lint`, and `npm run build`.
- [x] Task 4: Run `inspect.mjs` to capture updated desktop and mobile renders.
