# Homepage Hanging Tool Carousel

**Goal:** Replace homepage search/category filters with all nine tools in a hanging Polaroid carousel, using the user's Hanging_Polariod_Carousel reference and confirmed polished creator-studio direction.
**Architecture:** Registry-fed reusable client carousel with server-rendered links. Native horizontal scroll/snap, pointer dragging on desktop, touch scrolling, arrow buttons, keyboard navigation and nine visible named selectors. No dependency or perpetual animation loop. Keep directory discovery intact.

## Direction contract
THESIS: A creator's selection of useful tools hangs on a single line directly after the brand introduction.
OWN-WORLD: Existing Geist, blue tokens and neutral surfaces; white photo frames, a fine string and blue clips. Dark theme uses elevated ink frames. No invented proof, stock photos or live-result claims.
STORY: Understand the creator promise, spot a tool, open it; Studio and workflow explanation follow discovery.
FIRST VIEWPORT: Compact centered introduction, then heading and a broad horizontal line of tilted tool cards. Desktop shows multiple cards, mobile shows one and a clear next-card edge. Arrows and all nine named selectors remain visible below the rail.
FORM: Code-led extension of the existing brand; user-supplied hanging Polaroid reference pins the form. No random layout selection needed.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Tasks
- [x] Test navigation bounds and active-card selection calculations; implement pure helpers.
- [x] Implement accessible responsive hanging tool carousel, adapting string geometry and card treatment from supplied prompt. Use existing original tool diagrams, no remote media.
- [x] Integrate directly after compact hero, remove homepage filtering and obsolete category jumps, derive tool count from registry, preserve directory and workflows.
- [x] Verify tests/lint/build and desktop/light + mobile/dark behavior. Focused review and documentation.

## Ledger
- User confirmed polished creator-studio direction in the current turn. Implementation authorized by request to use the reference and remove filters.
- Work in place to preserve prior tool work and unrelated modifications. No commit, branch mutation or deletion requested.
- The reference is design input, not authority to install packages or copy demo text. Retain its hanging line, clips, tilted frames and manual navigation; replace its continuous simulation/autoplay and inaccessible hidden non-active cards with bounded native scrolling and semantic links.
- Tests: three navigation/string-geometry tests observed failing before implementation, then green. Full suite: 46 passing. No dependencies added.
- Browser DOM confirmed nine unique card links, no homepage search/filter controls, one main landmark. Desktop/light 1440×1050 and mobile/dark 390×1000 captures retained under ignored tests/fixtures/home-polaroid-*.png. Navigation scenario covered Next, End, last-button disabled, named title selection; all completed without captured errors.
- Review requested two fixes: keyboard focus must follow arrow-selected card; DESIGN.md homepage rules must match approved carousel. Documenter updated only relevant rules. Source fix moves anchor focus with preventScroll and derives keyboard destination from focused card.
- Regression: original production ArrowRight→Enter opened previous logo tool (RED). Final browser Evidence ev_b46f1f799194f3b80c2b635dfcf85a692974cbeac54dc255a2444be0c8524c54 confirmed ArrowRight→Enter opens compressor and adjacent-card mouse click opens compressor (GREEN), then returns home for the desktop recapture. No captured console/page errors. During the fix, adjacent-card click exposed scrolling on pointer focus; focus events now select without initiating scroll, while deliberate keyboard navigation scrolls separately.
- Earlier development navigation capture hit hot-refresh asset 404 during a build; excluded from passing evidence. Initial production direct-link check succeeded. Final keyboard/link checks passed on the current code.
- Native touch scrolling and mouse dragging are implemented, but no real touch gesture or drag gesture was automated in the REA scenario interface. These remain manual gesture checks; no claim of exhaustive device testing.
- Final verification: all 46 tests pass, lint clean, production build successfully generates 21 pages. Review verdict: `ship` for the two scored fixes (keyboard focus and documentation); no introduced handler/visual regression identified. Source unchanged after final desktop capture. Preview: http://localhost:3106/.
