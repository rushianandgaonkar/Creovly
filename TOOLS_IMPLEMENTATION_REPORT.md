# Individual creator tools — implementation and testing

All eight tools in the central registry are available. This pass completed the six tools remaining after the compressor and resizer. Existing URLs are preserved. Publish Studio and editorial guides remain previews.

## Delivered in this pass

| Tool | Implemented behavior | Important limit |
| --- | --- | --- |
| Shorts Safe Zone Checker | Still-frame upload, adjustable margins, manual content box, overlap feedback, annotated 1080 × 1920 PNG export | A manual planning guide, not official device measurements or automatic content detection. No video playback. |
| Title Checker | Conservative character-unit count, whitespace/punctuation/capitalization checks, exact topic phrase location, adjustable two-line preview, clipboard summary | Heuristic feedback, without CTR scores, SEO predictions, AI rewrites, or a guaranteed display cutoff. |
| Revenue Calculator | Monthly/annual lower and upper scenarios using monthly views and an entered RPM range | USD assumptions; RPM is already after platform share. Annual = monthly × 12. |
| RPM Calculator | Creator revenue divided by same-period views × 1,000 | Use engaged views for Shorts. No inferred CPM. Zero views rejected. |
| Watch Hours Calculator | Remaining hours, progress, constant-pace months, additional views from average view duration | No rolling-window simulation or eligibility verdict. Zero growth and already-reached goals handled. |
| Monetization Calculator | Platform, sponsorship, affiliate and other income; monthly costs; annual scenario | Entered assumptions only. Costs deducted once; taxes excluded. Losses remain negative. |

Shared calculator definitions, formulas, validation and result formatting live in `lib/creator-calculators.ts`. The four calculator routes share the server-rendered page shell and interactive form/result components. All processing remains local. Inputs/results are held in memory, with no new persistence or external services.

Registry statuses, canonical/indexing metadata, homepage, tool directory, category text, footer and phase documentation reflect the implemented tools. The result panel now supports embedding inside the existing results surface, with responsive cards that keep ordinary currency amounts readable.

## Verification

- `npm test`: 20 passing tests, including the existing compressor/resizer coverage and new calculator, title, Shorts geometry, validation and cancellation cases.
- `npm run lint`: passes.
- `npm run build`: passes with all existing routes generated.
- Browser calculations: revenue 150,000 views at RPM 2–5 yields monthly USD 300–750; RPM 1,850 / 420,000 yields USD 4.40 displayed; watch-hours example yields 2,180 remaining, 45.5%, 6.4 months, and 29,067 views; income example yields USD 3,150 total and USD 2,650 after costs.
- Actual clipboard contents verified for all four calculators and the title checker after the success acknowledgement.
- Validation tested with empty inputs, inverted RPM range, zero RPM denominator, zero growth, and costs above income. Error focus, result invalidation on edits and resets checked.
- Title browser check exercised an over-limit draft, emoji, repeated spaces/punctuation and exact phrase placement.
- Shorts browser check exercised local upload, content-box containment and overlap, changed settings clearing an old export, and a real PNG download. Download decoded to 1080 × 1920; pixels verified the shaded reserved area, central padding and fitted source image.
- Six populated tools checked at viewport widths 375, 768, 1280 and 1600 without page-level horizontal overflow. Final calculator layout rechecked after the card readability fix. Light/dark switching checked; browser warning/error logs were empty.

## Remaining release checks and exclusions

Browser verification used the in-app Chromium browser. Firefox, Safari, real mobile devices and actual YouTube player variations still require testing before a public release. Drag/drop uses the previously implemented shared DropZone; file selection in this pass used the chooser.

No authentication, databases, payments, analytics vendors, AI APIs, channel connections, currency conversion, Studio engine or guide articles were added. Manual Shorts margins and title heuristics are explicitly labelled. The watch-hours model does not promise monetization eligibility.

## Platform references reviewed

- YouTube RPM and CPM: https://support.google.com/youtube/answer/9314357?hl=en
- YouTube Partner Program: https://support.google.com/youtube/answer/72851?hl=en
- YouTube upload/title guidance: https://support.google.com/youtube/answer/57407?hl=en

Relevant official links are included on the tool pages. Platform requirements can change; the calculators expose assumptions instead of presenting eligibility decisions or niche benchmarks.
