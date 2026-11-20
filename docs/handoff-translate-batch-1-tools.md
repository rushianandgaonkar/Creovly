# Handoff: translate the four batch-1 tools into all 8 locales

Branch: `feat/tools-batch-1` (commit `1bc7840`). Work on top of it.
Locales: `en, es, ja, fr, de, pt, ko, it`. Today every locale shows English for these four pages.

| Tool | Slug | Component | Logic |
| --- | --- | --- | --- |
| Thumbnail size checker | `youtube-thumbnail-size` | `components/tools/ThumbnailSizeChecker.tsx` | `lib/thumbnail-size.ts` |
| Best time to post | `best-time-to-post-on-youtube` | `components/tools/BestTimeToPost.tsx` | `lib/post-time.ts` (no strings) |
| Hashtag generator | `youtube-hashtag-generator` | `components/tools/HashtagGenerator.tsx` | `lib/hashtags.ts` (no strings) |
| CPM calculator | `youtube-cpm-calculator` | `components/tools/CalculatorPage.tsx` + `CreatorCalculator.tsx` (kind `cpm`) | `lib/creator-calculators.ts` |
| Banner maker (added after batch 1) | `youtube-banner-maker` | `components/tools/BannerMaker.tsx` | `lib/banner-maker.ts` (only the default title/tagline strings) |

Treat the banner maker like the three non-calculator tools: message module `bannerMaker` (labels, font names, view names, view notes, guide label, colour labels, photo/dim/remove, download button and status strings), FAQ key `bannerMaker`, steps, `translations[loc].tools` entry and `toolFeatureTags`. Localize `DEFAULT_DESIGN.title`/`tagline` by passing translated defaults from the component.

The English source copy lives in `config/tool-content.ts` (about paragraphs, source link, FAQs) and inline in the three components. Follow the pattern the existing tools use (copy `scriptLength` / `words-to-minutes-calculator` end to end); do not invent a new i18n mechanism.

## 1. Page metadata, hero, cards (`config/i18n.ts`)

For each of the 8 `translations[locale].tools` blocks (en starts ~line 194, es ~415, ja ~640, fr ~865, de ~1090, pt ~1315, ko ~1540, it ~1765), add an entry per slug with the same shape as `'words-to-minutes-calculator'`:
`title, seoTitle (≤50 chars), description, categoryLabel, keywords[]`.
English values: copy from the `toolRegistry` entries at the end of `config/site.ts`.
Category labels must match that locale's existing labels (`Thumbnail Tools` for thumbnail size; `Title Tools` for best time and hashtags; `Money & Growth` for CPM).
Also add the four slugs to `toolFeatureTags` (~line 2003) for every locale (short chip text; no middle dots in new text, use commas).

This alone localizes `<title>`, meta description, hreflang pages, PageHero, breadcrumbs and tool cards (`createToolMetadata`, `ToolPageShell`).

## 2. How-to steps (`config/tool-guidance-i18n.ts`)

Add the four slugs to `toolPlaybookTranslations[locale].tools` for every locale (3 steps each, `{ title, body }`). English source: the `steps` arrays at the end of `config/tool-guidance.ts`.

## 3. FAQs and about text (messages)

1. `messages/en/tools.ts` → `faqs`: add keys `thumbnailSize`, `bestTimeToPost`, `hashtagGenerator`, `cpm` with the FAQ arrays from `config/tool-content.ts`. Add the same keys, translated, to `tools.faqs` in every `messages/<locale>/index.ts` (the `Messages` type will force all locales).
2. Map the slugs to those keys in **both** `slugToFaqKey` maps: `components/tools/ToolPageShell.tsx` (~line 66) and `lib/structured-data.ts` (~line 129). FAQ JSON-LD then follows the page language automatically.
3. Create message modules like `messages/en/scriptLength.ts` for the three non-calculator tools: `thumbnailSize`, `bestTimeToPost`, `hashtagGenerator`. Each holds `title`, `about1`, `about2`, `sourceLabel` (where the tool has a source link), and the UI strings in section 4. Register them in `messages/en/index.ts` and add translated objects to every locale index.
4. In `ToolPageShell.tsx` add the three slugs to the `about` map (~line 330) and to `getToolLocalizedTitle`; add the same title cases to `components/tools/ToolDiscovery.tsx` and `components/ui/QuickSearchModal.tsx`.
5. When everything renders from messages, delete the matching entries from `config/tool-content.ts` and simplify `ContentToolPage.tsx` (it can just render `ToolPageShell` with the registry title; keep the YouTube Help source links, localized `hl=` is optional).

## 4. UI strings inside the components

Replace every literal with `t.<module>.<key>` via `useI18n()`. Inventory:

- **HashtagGenerator**: field label, hint, placeholder; `Add #Shorts` + hint; `Load example`, `Clear`; `Your hashtags`; `Select a hashtag to leave it out.`; dropped-count sentence (use `{count}`/`{max}` placeholders); `No hashtags selected.`; `Copy hashtags`; copied status (singular/plural) and copy-failed status; paste advice; empty state; `aria-label` of the list. Keep the example input in English or localize it (output hashtags come from the user's words, so either works).
- **BestTimeToPost**: intro paragraph (Studio path must use the locale's YouTube Studio menu names: Analytics, Audience, "When your viewers are on YouTube"); labels `Audience peak hour`, `Publish`, `Peak hour time zone`, `Your time zone`; the four lead options; no-data tip; `Next publish time`; the `{day}, your time ({time} for your audience).` sentence; table caption and 3 headers; DST note; loading state. Also switch the three `Intl.DateTimeFormat('en-US', …)` calls and `hourLabel` to the active locale (`useI18n().locale`), so ja/ko get local time formats.
- **ThumbnailSizeChecker**: `Video`/`Shorts`, group aria-label; the five spec row labels and the two text values (`2 MB mobile, 50 MB desktop`, `JPG or PNG`; reuse `seo.thumbnailSpecs.maxSizeVal` from `tool-guidance-i18n.ts`, already translated); drop-zone label; error title/body; result row labels; level words `Pass`/`Note`/`Check`/`Fix`; resize/compress link text; empty state.
- **lib/thumbnail-size.ts** builds English `label`/`detail` strings. Change it to return only `id`, `level` and the numbers (`side`, ratio, `bytes`, target ratio), and build the sentences in the component from message templates with placeholders. Update `tests/batch-two-tools.test.cjs` (it asserts `level` and `id`, which stay the same).
- **CPM** (`lib/creator-calculators.ts` kind `cpm`): add `calculator.cpm` to `messages/en/calculator.ts` and every locale, mirroring `calculator.rpm`: `title`, `note`, `fields.{views,rate,cpm,share}.{label,suffix}`, `metrics.{creator,gross,playbacks,rpm}`. Then add `cpm` cases to `getLocalizedTitle`/`getLocalizedNote`/`getLocalizedField`/`getLocalizedMetricLabel` in `CreatorCalculator.tsx` and the two switches in `CalculatorPage.tsx` (remove the `kind === 'cpm' ? tool.title` shortcut). Metric `detail`, `formula` and `explanation` strings stay English for every calculator kind today; match the other kinds.

## 5. Content rules (from CLAUDE.md, DESIGN.md, Hallmark)

- Keep facts identical to English: 3840×2160 recommended, 1280×720 valid, 640 px minimum, 2 MB mobile / 50 MB desktop, JPG or PNG; 60-hashtag rule; 55% long-form share. No new numbers, no benchmarks, no "best time" claims.
- Sentence case. No all-caps labels, no middle-dot-joined strings, no arrows glued to link text.
- Use the locale's existing terms (check that locale's resizer/compressor strings for "thumbnail", "upload", "YouTube Studio").

## 6. Done when

- Every locale × 4 tools shows no English UI text except brand names and hashtags (check `/es/tools/youtube-hashtag-generator`, `/ja/tools/best-time-to-post-on-youtube`, etc.).
- `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run validate:i18n` (100%) and `npm run build` pass.
- `tests/multilingual-pages.test.cjs` passes with the new `translations[loc].tools` entries.
- FAQ JSON-LD on a localized page is in that language (view source of `/de/tools/youtube-cpm-calculator`).
- Spot-check 375 px width on one CJK locale for overflow (long labels in the spec list and table headers).
