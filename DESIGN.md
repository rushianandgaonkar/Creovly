# Creovly Design System

## 1. Product Identity

Creovly is a modern pre-publish workspace for YouTube creators.

Brand promise: **Create smarter. Publish better.**

Creovly should feel like a polished creator SaaS product: focused, fast, trustworthy, technical without being cold, and useful before a creator hits Publish. It must not look like a generic SEO-tools directory, an admin dashboard template, or a clone of another SaaS brand.

## 2. Visual Direction

The visual language is minimal and premium:
- near-white/light-neutral canvas with crisp elevated surfaces
- near-black primary text
- restrained blue accent for actions and interactive states
- subtle multicolor mesh/ambient gradient used sparingly, primarily in major marketing moments
- thin neutral borders and soft shadows instead of heavy cards
- generous whitespace
- strong typography and clear hierarchy
- dark mode supported with equivalent contrast and restraint

The current Creovly visual direction should be preserved during framework migration. Migration is not permission to redesign the product.

## 3. Brand Colors

Use CSS variables/design tokens rather than scattered hard-coded values.

### Core
- `--brand-primary`: #171717
- `--brand-on-primary`: #ffffff
- `--brand-accent`: #0070f3
- `--brand-accent-deep`: #0761d1
- `--brand-accent-soft`: #d3e5ff

### Surfaces
- `--bg-canvas`: #fafafa
- `--bg-canvas-elevated`: #ffffff
- `--bg-canvas-subtle`: #f4f4f5
- `--bg-canvas-inset`: #f2f2f2

### Text
- `--text-ink`: #171717
- `--text-body`: #52525b
- `--text-muted`: #71717a
- `--text-faint`: #a1a1aa

### Borders
- `--border-hairline`: #e4e4e7
- `--border-hairline-subtle`: #f4f4f5
- `--border-hairline-strong`: #d4d4d8

### Semantic
Use dedicated success, warning, error, and info tokens. Do not use the brand blue as a substitute for every semantic state.

## 4. Typography

Preferred family: **Geist Sans** for interface and marketing copy, **Geist Mono** only for compact technical labels, metadata, and numeric/technical accents.

Fallbacks may use modern system sans/mono stacks.

Guidelines:
- Hero: bold/semibold, tight tracking, responsive scale
- Section headings: semibold/bold with compact tracking
- Body: comfortable line-height and high readability
- Mono eyebrow labels: small and restrained; do not overuse
- Avoid excessive uppercase copy

Typography should communicate creator confidence, not developer documentation.

## 5. Shape & Elevation

- Marketing CTA buttons may use rounded/pill treatment.
- Product controls should use consistent medium-radius shapes.
- Cards should use thin borders and minimal shadows.
- Avoid glassmorphism overload, giant shadows, excessive gradients, neon effects, and decorative blobs.
- Interactive controls must have visible hover, focus, disabled, error, and selected states.

## 6. Gradient Usage

The ambient mesh gradient is a Creovly flourish, not page chrome.

Use it primarily in:
- homepage hero
- occasional flagship Publish Studio marketing moments
- subtle empty-state or premium feature accents when justified

Inner pages use a compact gradient title panel, approved after the homepage refinement. Use the shared PageHero and GradientBackground components: blue for thumbnails, rose for Shorts, violet for titles/guides, teal for money/growth, amber for the checklist, and indigo for the directory/Studio. Match the title color to the panel and provide equivalent dark-theme colors.

Keep gradients confined to the introduction; working forms, results, and educational sections retain clear neutral surfaces. Do not repeat decorative gradients behind each section.

The homepage hanging tool gallery may use a scoped soft-blue background wash behind white paper cards, with a deep-blue wash and elevated dark paper in dark mode. This gallery treatment does not extend to working tool interfaces or other homepage sections.

Channel artwork phase: the resizer may use a scoped cool-blue and warm-neutral background wash around the workspace, as requested by the user. Forms and results retain neutral surfaces. Its preset selector uses small layered folder diagrams adapted from the supplied design references; selection is explicit and keyboard accessible. The directory retains its existing discovery interface.

## 7. Layout Principles

- Marketing content max width: approximately 1152–1200px
- Tool workspace content may be wider where necessary
- Mobile-first responsive behavior
- Strong vertical rhythm
- Tool pages should prioritize the working interface above explanatory SEO content
- On desktop, complex tools may use input/workspace + results layouts
- On mobile, stack controls logically with primary actions easy to reach

## 8. Core Reusable Components

Maintain reusable components for:
- Header
- Footer
- Wordmark/logo
- Theme toggle
- Button
- Badge
- Tool card
- Tool page shell/layout
- Inputs and number inputs
- Select
- Slider
- Toggle
- Textarea
- Drop zone
- Alert
- Metric card
- Progress bar
- Score indicator
- Result summary panel
- SEO metadata helpers

Do not duplicate these primitives inside individual pages.

## 9. Header & Navigation

Primary navigation currently contains Tools, Publish Studio, and Checklist, followed by the theme toggle.
Thumbnail, title, and money/growth categories belong in tool-discovery filters and group headings rather than duplicated header links.
Preserve existing category and individual tool URLs.

Mobile navigation must be intentional and accessible.

Publish Studio is a working local workspace. Guides remain a secondary preview destination.

## 10. Tool Page Experience

Every real tool page should eventually follow a consistent pattern:
1. Clear tool name and one-sentence benefit
2. Working interface near the top
3. Results/preview state
4. Privacy/local-processing note only when technically true
5. Concise instructions
6. Relevant technical/spec information
7. FAQ when useful
8. Related Creovly tools

Do not fabricate functionality. If a tool is not implemented, label it as preview/coming soon or keep it out of production navigation.

## 11. Homepage Rules

The homepage is a customer-facing product page, not a design-system playground.

Keep:
- compact centered introduction with the brand promise and direct tool/Publish Studio actions
- a registry-fed hanging Polaroid tool carousel directly after the introduction, showing all nine available tools
- white paper cards with restrained tilt, a fine hanging line, blue clips, and existing decorative tool diagrams, without fabricated live results; dark mode uses elevated dark paper with readable text
- manual arrow controls, native horizontal/touch scrolling, desktop dragging, and keyboard navigation with visible focus and semantic links to the existing tool URLs
- all nine named jump selectors below the cards, with a clear current selection and tool count
- subtle hover/focus motion only; no autoplay, with reduced-motion support for card treatment and scrolling
- a direct link to the tool directory, where working search and category filters remain available
- working Publish Studio introduction below the tools
- useful tool discovery
- category/product benefits
- privacy or browser-processing claims only where true
- creator-oriented workflow story

This homepage discovery change preserves the existing working tool pages and their URLs.

Do not expose:
- design token showcases
- component primitive demos
- implementation notes
- references to Vercel or other inspiration brands
- internal developer terminology
- fake usage metrics or unsupported product claims

## 12. Content Voice

Voice: concise, capable, creator-focused, practical.

Prefer:
- “Check your thumbnail before publishing.”
- “Estimate revenue from views and RPM.”
- “See how your title may truncate on mobile.”

Avoid:
- generic SEO-tool filler
- exaggerated AI claims
- corporate buzzword stacks
- developer-facing language such as “design primitives,” “tokens,” or “component matrix” in customer copy

## 13. Accessibility

Minimum requirements:
- semantic HTML
- keyboard-accessible controls
- visible focus states
- labels for form fields
- appropriate ARIA only where necessary
- sufficient color contrast in both themes
- reduced-motion consideration
- no interaction that depends only on color

## 14. Performance

Creovly should feel immediate.
- prefer server-rendered/static content where interaction is unnecessary
- use client components only for actual interaction
- lazy-load heavy modules
- optimize images
- avoid large animation libraries unless justified
- avoid shipping JavaScript for static marketing sections

## 15. Framework Direction

Production foundation:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

Framework migration must preserve the established Creovly visual system and URL structure wherever practical.

## 16. Product Architecture Direction

Creovly will grow around these areas:
- Tool directory
- Thumbnail tools
- Title tools
- Shorts tools
- Revenue/RPM/monetization calculators
- Publish Preview / Publish Studio
- Pre-Publish Checklist
- Creator guides

Build reusable patterns first. Do not create each tool as an isolated microsite.

## 17. Current Phase

Current phase: **Step 3 — Local Publish Studio**, explicitly requested after the individual tools and visual refinements.

Allowed now:
- complete shared tool-page demonstrations, three-step instructions, specific FAQs, and three relevant next-tool links; examples remain distinct from live results
- implement the requested solid-color logo background remover with local processing, actual before/after previews, and transparent PNG export
- add the thumbnail category page while preserving individual tool URLs
- implement all eight individual browser-based tools: compressor, resizer, manual Shorts guide, title checker, and four money and growth calculators
- establish reusable upload, error, results, and tool-page patterns
- preserve the approved visual system; editorial guides remain previews
- implement a local Studio project with metadata checks, thumbnail preparation, manual Shorts planning, manual review, explicit text-draft saving/loading, and project ZIP export

Out of scope: publishing to YouTube, external AI APIs, authentication, databases, payments, analytics vendors, automatic video/content analysis, and unrelated tool categories.



