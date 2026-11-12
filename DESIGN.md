# Creovly Design System

This document is the source of truth for how Creovly looks and behaves. Change the visual system here first, then in code. Framework migrations and refactors preserve what is written here; they are not permission to redesign.

## Quick reference

- Theme: **Paper and tally**. Warm paper canvas, charcoal ink, one tally-orange accent. Dark mode is a warm darkroom, not a cold black.
- Fonts: Bricolage Grotesque for H1/H2 and the hero; Geist Sans for interface and body; Geist Mono only for real technical values.
- One accent-filled action per view. Everything else is ink, paper, and hairlines.
- No gradient panels on inner pages. The only atmospheric wash is the homepage hero light leak.
- Cards: 12px radius, 1px hairline, soft shadow in light mode, surface steps in dark mode.
- Every color pair in section 3 is checked against WCAG AA. Do not introduce new text colors without checking contrast.

## 1. Product Identity

Creovly is a modern pre-publish workspace for YouTube creators.

Brand promise: **Create smarter. Publish better.**

Creovly should feel like a creator's workbench: focused, fast, trustworthy, warm, and useful before a creator hits Publish. It must not look like a generic SEO-tools directory, an admin dashboard template, or a copy of another SaaS brand's palette and type.

## 2. Visual Theme: Paper and Tally

The metaphor is a creator's desk and studio:
- **Paper**: the canvas is warm off-white paper, not cold white. Cards are clean white sheets laid on it. The hanging tool gallery's Polaroid cards belong naturally in this world.
- **Ink**: text is warm charcoal, never pure black.
- **Tally**: the single accent is the orange of a camera's recording light. It marks the one thing to do next: the primary action, focus, and selection.
- **Darkroom**: dark mode is a warm near-black with lifted warm-gray surfaces, so creators working late get the same calm.

Character: minimal, editorial, tactile. Strong typography and generous whitespace carry the design; color is used sparingly and with intent.

## 3. Color Tokens

Use CSS variables. Never hard-code brand hex values in components. Token names below are the existing names where they already exist; only values change. New tokens are marked *(new)*.

### Brand

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--brand-primary` | `#1A1714` | `#F3EFE8` | Ink buttons, strong UI marks |
| `--brand-on-primary` | `#FFFFFF` | `#1A1714` | Text on `--brand-primary` |
| `--brand-accent` | `#C2410C` | `#FB923C` | Primary action fill, focus ring, selected marks, accent icons |
| `--brand-on-accent` *(new)* | `#FFFFFF` | `#1A1714` | Text on `--brand-accent` |
| `--brand-accent-deep` | `#9A3412` | `#FDBA74` | Accent hover/pressed fill, **text links** |
| `--brand-accent-soft` | `#FCE8DA` | `#3A2416` | Selected backgrounds, accent tints; text on it uses `--brand-accent-deep` |

Rule: in light mode `--brand-accent` is a fill color, not a text color. It fails AA as text on the darker paper surfaces. Use `--brand-accent-deep` for any accent-colored text, including links.

### Surfaces

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg-canvas` | `#F5F3EE` | `#12100E` | Page background (paper / darkroom) |
| `--bg-canvas-elevated` | `#FFFFFF` | `#1C1916` | Cards, panels, inputs, header on scroll |
| `--bg-canvas-subtle` | `#EFECE5` | `#24201C` | Hover rows, secondary panels, gallery wash; dark mode's highest card step |
| `--bg-canvas-inset` | `#E9E5DC` | `#0C0A09` | Wells, code blocks, drop-zone interior, progress tracks |

### Text

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--text-ink` | `#1A1714` | `#F3EFE8` | Headings, primary text |
| `--text-body` | `#4A443D` | `#CFC8BD` | Body copy |
| `--text-muted` | `#6B635A` | `#A39B90` | Supporting text, captions, metadata |
| `--text-faint` | `#9C948A` | `#6F675E` | Disabled text and decoration only; never essential information |

### Borders

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--border-hairline` | `#E4DFD5` | `#2E2A25` | Card and divider hairlines |
| `--border-hairline-subtle` | `#EDE9E1` | `#24201C` | Quiet separators inside cards |
| `--border-hairline-strong` | `#D3CCBF` | `#3D3832` | Hover borders, hanging gallery line |
| `--border-control` *(new)* | `#8C8378` | `#6F675E` | Resting border of inputs, selects, checkboxes, toggles (meets 3:1) |

### States

States never reuse the brand accent. Always pair state color with an icon and text. Each state has four tokens: `--state-{name}` (icons, dots, fills), `--state-{name}-text` (text), `--state-{name}-bg` (tinted background), `--state-{name}-border`.

| State | Icon / Text / Bg / Border (light) | Icon / Text / Bg / Border (dark) |
| --- | --- | --- |
| success | `#15803D` / `#166534` / `#DCFCE7` / `#BBF7D0` | `#4ADE80` / `#4ADE80` / `#0F2A1A` / `#14532D` |
| warning | `#B45309` / `#854D0E` / `#FEF3C7` / `#FDE68A` | `#FACC15` / `#FACC15` / `#2E2410` / `#713F12` |
| error | `#DC2626` / `#B91C1C` / `#FEE2E2` / `#FECACA` | `#F87171` / `#F87171` / `#2F1515` / `#7F1D1D` |
| info | `#1D4ED8` / `#1D4ED8` / `#DBEAFE` / `#BFDBFE` | `#60A5FA` / `#60A5FA` / `#13213A` / `#1E3A8A` |

Text on a `-bg` background uses the matching `-text` token.

### Category tags

Categories are shown with a small tag, not with full-color panels. Use Tailwind's palette: light `bg-{hue}-100 text-{hue}-800`, dark `bg-{hue}-950 text-{hue}-300`.

| Category | Hue |
| --- | --- |
| Thumbnails | `blue` |
| Shorts | `rose` |
| Titles and guides | `violet` |
| Money and growth | `teal` |
| Checklist | `amber` |
| Directory and Publish Studio | `indigo` |

### Verified contrast

Checked with the WCAG 2 formula (AA: 4.5:1 text, 3:1 UI boundaries):
- Light: ink/canvas 16.1, body/canvas 8.7, muted/canvas 5.3, muted/inset 4.7, white on accent 5.2, accent-deep/canvas 6.6, accent-deep on accent-soft 6.2, control border on white 3.7, success 6.4, warning 6.2, error 5.8, info 6.0 (all on canvas).
- Dark: ink/canvas 16.6, body/canvas 11.4, muted/canvas 6.9, muted/subtle 5.9, ink on accent 7.9, accent/canvas 8.4, accent-deep on accent-soft 8.6, control border on elevated 3.2, all state colors ≥ 6.8 on canvas.

## 4. Typography

### Families

| Role | Family | Loading |
| --- | --- | --- |
| Display (hero, H1, H2) | **Bricolage Grotesque** | `next/font/google`, variable, `latin` + `latin-ext` subsets |
| Interface and body | **Geist Sans** | existing setup |
| Technical values | **Geist Mono** | existing setup |

- Japanese and Korean pages: the display and interface fonts do not cover CJK. Fall back to the system CJK stack (`"Hiragino Sans", "Yu Gothic", "Noto Sans JP"` / `"Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR"`), and remove negative letter-spacing for those locales.
- Geist Mono is for real values only: dimensions, durations, file sizes, character counts, RPM figures. It is not a decorative eyebrow style.

### Scale

| Style | Size | Line height | Tracking | Weight | Family |
| --- | --- | --- | --- | --- | --- |
| Hero | `clamp(2.5rem, 5.5vw, 4.25rem)` | 1.02 | -0.03em | 700 | Display |
| H1 | `clamp(2rem, 4vw, 2.75rem)` | 1.08 | -0.025em | 650 | Display |
| H2 | `clamp(1.5rem, 3vw, 2rem)` | 1.15 | -0.02em | 600 | Display |
| H3 | 1.25rem | 1.3 | -0.01em | 600 | Sans |
| Body large | 1.125rem | 1.65 | 0 | 400 | Sans |
| Body | 1rem | 1.65 | 0 | 400 | Sans |
| Small | 0.875rem | 1.5 | 0 | 400/500 | Sans |
| Meta | 0.75rem | 1.4 | 0 | 500 | Mono |

Rules:
- Sentence case for headings, buttons, and labels. No all-caps eyebrows or wide-tracked uppercase.
- Body text measure: 60–72 characters.
- Typography should communicate creator confidence, not developer documentation.

## 5. Shape, Spacing, and Elevation

### Radius

| Element | Radius |
| --- | --- |
| Marketing CTAs, tags, chips, segmented toggles | 9999px (pill) |
| Product buttons, inputs, selects | 8px |
| Cards, tool cards, alerts, panels | 12px |
| Large panels, product screenshot frames | 16px |
| Polaroid cards (picture inset 14px) | 20px |

### Spacing

- 4px base unit. Common steps: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Section padding: 96px desktop, 64px mobile. Card padding: 24px desktop, 20px mobile.

### Elevation

Light mode uses hairlines plus soft, warm shadows:
- `--shadow-whisper` (cards, inputs, page hero): `0 1px 2px rgb(26 23 20 / 0.06), 0 4px 16px rgb(26 23 20 / 0.04)`
- `--shadow-floating` (hover, popovers): `0 2px 4px rgb(26 23 20 / 0.06), 0 12px 32px rgb(26 23 20 / 0.08)`
- `--shadow-button-primary`: a faint orange-tinted lift under the accent button

Dark mode keeps shadows minimal and black (never white or colored glows). Hierarchy comes from surface steps: canvas → elevated → subtle, each with a hairline border.

Avoid glassmorphism, giant shadows, neon glow, and decorative blobs.

### Focus

- `:focus-visible`: 2px solid `--brand-accent` outline with 2px offset. Never remove focus without replacing it.
- Every interactive control has visible hover, focus, pressed, disabled, error, and selected states.

## 6. Motion

- Hover and focus transitions: 150ms ease-out. Panels and disclosure: 200–240ms ease-out.
- Polaroid cards may tilt or lift slightly on hover/focus. No autoplay anywhere.
- Respect `prefers-reduced-motion`: remove transforms and smooth scrolling, keep instant state changes.
- No animation libraries for marketing sections; CSS transitions are enough.

## 7. Signature Treatments

These are the only decorative elements. Do not add others without updating this section.

1. **Homepage hero light leak.** Two soft warm-orange radial washes (`rgb(251 146 60 / 0.24)` and `rgb(253 186 116 / 0.22)`, 45% opacity in dark mode) fading into the canvas behind the top of the homepage hero. It is the `.hero-aurora` class in `globals.css`, used only by `CreatorHero`.
2. **Paper page hero.** Inner pages use the shared `PageHero`: a white sheet (`--bg-canvas-elevated`, 16px radius, hairline, `--shadow-whisper`) on the canvas, with a small 44×4px category tab on its top edge colored by the `tone` prop. Inside: the category chip, H1 in `--text-ink`, a one-sentence benefit, optionally a mono metadata row. No gradient panels, no colored titles.
3. **Hanging tool gallery.** Polaroid cards on `--bg-canvas-elevated` with restrained tilt and a fine hanging line in a warm string color, on a scoped `--bg-canvas-subtle` → `--bg-canvas` wash. Hover and selection use an accent border with a faint orange lift. In dark mode the cards are elevated dark paper on the canvas.
4. **Mono metadata chips.** Small Geist Mono values such as `1280×720 · 1.8 MB` or `58 / 100 characters`, shown only for values that come from the user's actual file or input. Never fabricated.
5. **Real product frames.** Marketing may show real Publish Studio captures in a 16px-radius elevated frame with a hairline border. No invented results, scores, or usage numbers.
6. **Resizer workspace wash.** The channel-artwork resizer keeps its scoped background wash around the workspace, retinted to warm neutral (`--bg-canvas-subtle` to `--bg-canvas`). Its preset selector keeps the small layered folder diagrams; selection is explicit and keyboard accessible.

Working forms, results, and educational sections always sit on neutral surfaces.

## 8. Layout Principles

- Marketing content max width: approximately 1152–1200px.
- Tool workspace content may be wider where necessary.
- Mobile-first responsive behavior with strong vertical rhythm.
- Tool pages put the working interface above explanatory SEO content.
- On desktop, complex tools may use an input/workspace + results layout.
- On mobile, stack controls logically with primary actions easy to reach.

## 9. Components

Maintain reusable components for: Header, Footer, Wordmark/logo, Theme toggle, Button, Badge, Tool card, Tool page shell/layout, Inputs and number inputs, Select, Slider, Toggle, Textarea, Drop zone, Alert, Metric card, Progress bar, Score indicator, Result summary panel, SEO metadata helpers.

Do not duplicate these primitives inside individual pages.

### Specs

- **Button, primary** (`variant="primary"`, default): `--brand-accent` fill, `--brand-on-accent` text, hover `--brand-accent-deep`. One per view; when a later step becomes the main action, demote the earlier one to `outline`.
- **Button, outline**: `--bg-canvas-elevated` fill, hairline border, `--text-ink` text, soft lift on hover. The usual partner to a primary button.
- **Button, secondary**: `--bg-canvas-subtle` fill, hairline border, `--text-ink` text.
- **Button, ghost**: transparent, `--text-body` text, hover `--bg-canvas-subtle`.
- **Inputs, selects, textareas**: `--bg-canvas-elevated` fill, `--border-control` border, 8px radius, 40px minimum height (44px touch targets on mobile), accent focus ring, `--state-error` border plus message on error.
- **Card / tool card**: `--bg-canvas-elevated`, `--border-hairline`, 12px radius, `--shadow-whisper` in light mode; hover raises to `--shadow-floating` and `--border-hairline-strong`.
- **Badge / tag**: pill, category tint from section 3, `0.75rem` text, weight 500.
- **Alert**: state `-soft` background, state-colored icon and title, `--text-body` description.
- **Drop zone**: `--bg-canvas-inset`, 1.5px dashed `--border-control`; drag-over switches to `--brand-accent-soft` with an accent border.
- **Progress / score**: track `--bg-canvas-inset`, fill `--brand-accent`; score meaning comes from text and state color, never color alone.
- **Links**: `--brand-accent-deep`, underlined on hover and focus; inline body links are always underlined.

## 10. Header and Navigation

- Primary navigation contains Tools, Publish Studio, and Checklist, followed by the language selector and the theme toggle.
- Thumbnail, title, and money/growth categories belong in tool-discovery filters and group headings, not in duplicated header links.
- Preserve existing category and individual tool URLs.
- Mobile navigation must be intentional and accessible.
- Publish Studio is a working local workspace. Guides remain a secondary destination.

## 11. Tool Page Experience

Every real tool page follows this pattern:
1. Paper page hero: tool name and one-sentence benefit
2. Working interface near the top
3. Results/preview state
4. Privacy/local-processing note only when technically true
5. Concise instructions
6. Relevant technical/spec information
7. FAQ when useful
8. Related Creovly tools and guides

Do not fabricate functionality. If a tool is not implemented, label it as preview/coming soon or keep it out of production navigation.

## 12. Homepage Rules

The homepage is a customer-facing product page, not a design-system playground.

Keep:
- compact centered introduction with the brand promise, the hero light leak, and direct tool/Publish Studio actions
- the registry-fed hanging Polaroid tool gallery directly after the introduction, showing every available tool from the tool registry
- Polaroid cards with existing decorative tool diagrams, without fabricated live results
- manual arrow controls, native horizontal/touch scrolling, desktop dragging, and keyboard navigation with visible focus and semantic links to the existing tool URLs
- named jump selectors below the cards, with a clear current selection and tool count derived from the registry
- subtle hover/focus motion only; no autoplay, with reduced-motion support
- a direct link to the tool directory, where working search and category filters remain available
- working Publish Studio introduction below the tools, using a real product frame
- category/product benefits and a creator-oriented workflow story
- privacy or browser-processing claims only where true

Do not expose:
- design token showcases or component primitive demos
- implementation notes or internal developer terminology
- references to other brands used as inspiration
- fake usage metrics or unsupported product claims

## 13. Content Voice

Voice: concise, capable, creator-focused, practical.

Prefer:
- "Check your thumbnail before publishing."
- "Estimate revenue from views and RPM."
- "See how your title may truncate on mobile."

Avoid:
- generic SEO-tool filler
- exaggerated AI claims
- corporate buzzword stacks
- developer-facing language such as "design primitives," "tokens," or "component matrix" in customer copy

## 14. Accessibility

Minimum requirements:
- semantic HTML and keyboard-accessible controls
- visible focus states (section 5)
- labels for form fields; appropriate ARIA only where necessary
- AA contrast in both themes, using the verified pairs in section 3
- form control boundaries at 3:1 (`--border-control`)
- reduced-motion support
- no interaction or status that depends only on color; the orange accent and the error red must never be the only way to tell an action from a problem

## 15. Performance

Creovly should feel immediate.
- prefer server-rendered/static content where interaction is unnecessary
- use client components only for actual interaction
- lazy-load heavy modules and optimize images
- load fonts through `next/font`; ship only the display-font weights actually used
- avoid large animation libraries and JavaScript for static marketing sections

## 16. Framework Direction

Production foundation: Next.js App Router, React, TypeScript, Tailwind CSS.

Theme values live as CSS variables in `app/globals.css` (`:root` and `.dark`) and components read them with `var(--…)`, so a palette change is a token change, not a component rewrite.

## 17. Product Architecture Direction

Creovly grows around: tool directory, thumbnail tools, title tools, Shorts tools, revenue/RPM/monetization calculators, Publish Studio, Pre-Publish Checklist, and creator guides.

Build reusable patterns first. Do not create each tool as an isolated microsite.

## 18. Scope

Feature scope and the current phase are defined in `CLAUDE.md`. This document governs visual and interaction design only.

Unless the current phase allows it: no publishing to YouTube, external AI APIs, authentication, databases, payments, analytics vendors, automatic video/content analysis, or unrelated tool categories.

## 19. Do and Don't

Do:
- let paper, ink, and type do the work
- keep one accent-filled action per view
- show real values in mono, only when they come from the user's input
- use category tags to signal tool type
- check contrast for every new text color

Don't:
- add gradient panels, glass effects, neon, or blobs
- use the accent for warnings, errors, or decoration
- color headings by category
- use pure black `#000` or pure white `#FFF` canvas
- show fabricated scores, results, counts, or testimonials

## 20. Intentional Exceptions

These deliberately differ from the rules above:
- **Blue stays** for the Thumbnails category dot, the info state and `Alert` info variant, thumbnail illustrations and safe-zone guides in `ToolIllustration` and `BannerResizer`, and the YouTube-style "…more" link in the description preview.
- **Uppercase labels stay** inside `ToolIllustration`, whose tiny decorative mockups imitate tool screens.
- **One primary per section** in long workspaces such as Publish Studio, where each section has its own main action. Toolbars use outline and ghost buttons.
