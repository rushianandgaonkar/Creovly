# Publish Studio — local workspace

Replaced the fixed Studio mockup at `/studio` with a real browser-based project workspace. The existing gradient hero and shared form/results primitives are preserved. Studio is linked in the primary navigation and homepage; obsolete preview labels and metadata were removed.

## Working features

- Project name, channel preview, title, exact topic phrase, and description editing.
- Shared title analysis, colored title length feedback, exact excess counts, and description-length/angle-bracket checks.
- Validated still JPEG/PNG/WebP selection, actual dimensions, format, and file size. Existing 20 MB/24 megapixel/8,192px safety limits and animation rejection apply.
- Integrated JPEG preparation using the existing resizer/compressor: 1280×720 for standard video, 1080×1920 for Shorts; whole-image white padding or center crop; 2 MB preparation target, with actual output size and enlargement warnings.
- Combined image/title/channel preview and current-image download.
- Separate automatic checks and five explicit user confirmations. No synthetic CTR, readability, or impact scores. Editing invalidates confirmations.
- Shorts planning margins/content box, geometric overlap feedback, and annotated PNG export. Invalid settings show an error and stop guide export.
- Explicit local draft save/load/delete. One text/settings draft is stored in localStorage; images are never stored. Loading resets image state and confirmations. New project preserves a previously saved draft.
- Actual clipboard copy and a local ZIP containing `metadata.txt`, `project.json`, `checks.txt`, the current image if present, and the optional Shorts planning guide. Incomplete checks are recorded accurately and do not prevent draft export. Invalid guide settings must be corrected for a Shorts package.

## Boundaries

No YouTube connection or publishing, video processing, cloud storage, AI calls, policy/legal audit, automated text/face detection, or performance prediction. Preview wrapping and manually selected Shorts margins are illustrative. ZIP import is not implemented; text/settings drafts load from this browser only. Source images are not included if a prepared output is selected.

Checks reference YouTube's official thumbnail and upload guidance, verified during implementation. Mobile/desktop thumbnail targets are distinguished; the prepared JPEG always targets 2 MB. The framing check uses a 1% aspect-ratio tolerance and a 640px minimum on the relevant axis, rather than claiming to enforce every recommended resolution.

## Validation

- Final lint and production build passed; all 17 pages generated successfully.
- Responsive browser checks at 375px, 768px, and 1280px showed no horizontal overflow. Light and dark themes were reviewed, with no console errors during normal use.
- 26 regression tests passed, including six new Studio tests for true initial state, actual input checks, Shorts overlap/invalid settings, untrusted draft validation, and ZIP headers/CRC/offsets/filenames/limits.
- Browser: metadata editing, exact title overflow, manual-check invalidation, actual clipboard contents, image selection/preparation, save/load across reload, image/confirmation reset on load, saved test-draft deletion, both content modes, real ZIP downloads, and invalid Shorts export handling.
- Independently opened both downloaded ZIPs with Python's standard `zipfile`, verified all CRCs, JSON and metadata contents, and image dimensions with Pillow.
- Test thumbnail: actual 3.15 MB PNG → 716.3 KB 1280×720 JPEG (browser encoder output). Standard report recorded 11/11 after explicit test confirmations. Shorts package included 1080×1920 JPEG and annotated PNG and recorded 7/12 with manual checks unconfirmed.
