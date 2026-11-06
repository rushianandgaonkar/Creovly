# Creovly: implement the keyword plan (instructions for the coding agent)

**Goal:** make the existing pages and three new guides target the keywords in
`docs/creovly-keyword-map.md`. This is wording and content work only.

**Before you start**
- Apply `creovly-seo-fixes.patch` first. It adds the optional `seoTitle` on guides and strips the duplicate "| Creovly" from titles.
- Follow `CLAUDE.md`. Run `npm run lint` and `npm run build` before you say it's done.
- **English only for now.** Don't touch the other 7 locales except where a step says so.
- **Don't add features.** Every sentence must describe something the site actually does today. Check the tool before you write about it.
- **Don't keyword-stuff.** Use each primary keyword naturally in the title, H1, first paragraph and one H2. Aim for 2–3 mentions per page.
- Page `<title>` gets " | Creovly" added automatically, so keep titles to 50 characters or less. Keep descriptions to 70–160 characters.

I haven't opened the tool-page body files (`config/tool-guidance.ts`, `config/calculator-faqs.ts`, `components/tools/*`). Read the relevant one before editing it.

---

## Step 1. Add `seoTitle` for tools (small code change)

Tool names appear in the H1, nav and cards, so don't rename them. Add a search-only title instead, the same way guides already work.

1. `config/i18n.ts`: add `seoTitle?: string` to `ToolTranslation`.
2. `config/site.ts`: add `seoTitle?: string` to the `toolRegistry` entry type.
3. `lib/metadata.ts`, in `createToolMetadata`:
   `const title = localeData?.seoTitle || tool.seoTitle || localeData?.title || tool.title;`
4. Set it only where the table below says so. Add it to the `en` entry in `config/i18n.ts` and to `toolRegistry` in `config/site.ts`, so both match.

## Step 2. Metadata for existing tool pages

Edit `title`/`seoTitle` and `description` in **both** `config/site.ts` (`toolRegistry`) and the `en` block of `config/i18n.ts` (`tools`). Keep the two in sync.

| Tool slug | seoTitle (≤50) | New description (70–160) | Add to `keywords` |
|---|---|---|---|
| `youtube-revenue-calculator` | `YouTube Money Calculator: Views to Revenue` | `Free YouTube money calculator. Enter monthly views and an RPM range to estimate your monthly and yearly YouTube revenue in your browser.` | `youtube video money calculator`, `youtube views to money calculator`, `youtube ad revenue calculator` |
| `youtube-monetization-calculator` | no change | `Free YouTube monetization calculator. Estimate channel income from ads, sponsorships and affiliates, then subtract expenses for monthly earnings.` | `youtube income calculator`, `youtube channel income calculator` |
| `youtube-title-checker` | no change | `Free YouTube title checker. Analyze title length, punctuation, keyword placement and mobile truncation before you publish your next video.` | `youtube title analyzer`, `youtube title tester`, `youtube title length checker` |
| `youtube-shorts-safe-zone` | no change | `Check YouTube Shorts safe zones before publishing. Preview overlay guides, keep key content clear of buttons and export an annotated safe zone guide.` | `youtube shorts safe zone template` |
| `youtube-thumbnail-resizer` | no change | no change | `youtube thumbnail size`, `youtube thumbnail dimensions`, `youtube thumbnail aspect ratio` |

**Safe zone check:** only write "template" if the exported file is an image. If it isn't, leave that keyword out.

## Step 3. On-page copy for existing pages

Put the primary keyword in the **H1 or first paragraph** and one H2. Add FAQ entries where noted. FAQ answers must be accurate and short (2–3 sentences). Look in `config/calculator-faqs.ts` and `config/tool-guidance.ts` for where each page's copy lives.

| Page | Primary keyword | What to add |
|---|---|---|
| `/tools/youtube-revenue-calculator` | youtube money calculator | Intro line: "Use this YouTube money calculator to turn monthly views and RPM into estimated revenue." H2 "YouTube views to money". FAQ: "Does this work for Shorts?" (answer only what the tool really does) |
| `/tools/youtube-monetization-calculator` | youtube monetization calculator | First paragraph says "YouTube monetization calculator" and "income". Link to the new monetization requirements guide (Step 4). |
| `/tools/youtube-title-checker` | youtube title checker | FAQ: "How long should a YouTube title be?" Use the limits the tool itself checks. |
| `/tools/youtube-shorts-safe-zone` | youtube shorts safe zone | H2 "YouTube Shorts safe zone template". Link to the Shorts safe zone guide. |
| `/guides/youtube-thumbnail-blueprint` | youtube thumbnail size | Don't change the guide `title`. Make the first paragraph say "YouTube thumbnail size", add H2s "YouTube thumbnail size and dimensions: 1280×720" and "YouTube thumbnail aspect ratio", and an FAQ "What size is a YouTube thumbnail?". Add one line on Shorts thumbnail size **only after checking YouTube Help** (see rules below). |
| `/tools/youtube-thumbnail-resizer` | youtube thumbnail resizer | First paragraph says "YouTube thumbnail size (1280×720)". Link to the thumbnail guide. |

## Step 4. Three new guides

Add to `lib/guides.ts` (and the `en` block of `config/guides-i18n.ts`). Follow the shape of the existing guides: `slug`, `title`, `seoTitle`, `description`, `category`, `readTime`, `lastVerified`, `officialSources`, `contentSections`, `workedExample`, `checklist`, `relatedToolIds`, and `faqs`.

| Slug | title | seoTitle (≤50) | Primary keywords | Link to tools |
|---|---|---|---|---|
| `youtube-banner-size` | YouTube Banner Size: Dimensions, Safe Area & Template | `YouTube Banner Size: Dimensions & Safe Area` | youtube banner size, youtube banner template | thumbnail resizer |
| `youtube-monetization-requirements` | YouTube Monetization Requirements Explained | `YouTube Monetization Requirements Explained` | youtube monetization requirements, youtube monetization checker | watch hours calculator, monetization calculator |
| `how-to-change-youtube-thumbnail` | How to Change a YouTube Thumbnail, Step by Step | `How to Change a YouTube Thumbnail (Step by Step)` | how to change thumbnail on youtube, edit thumbnail, Shorts thumbnail | thumbnail resizer, thumbnail compressor |

**Rules for these guides:**
- **Verify every number against YouTube Help** before writing it (banner pixel sizes and safe area, partner program thresholds, thumbnail size limit). These change over time, so don't write them from memory. Put the pages you used in `officialSources` and set `lastVerified` to today's date.
- If a requirement differs by country or program tier, say so instead of giving one number.
- Don't promise income or approval. Write what the requirements are, not that meeting them guarantees monetization.
- **Open Graph images:** the guide page uses `/og/${slug}.png`. Those three files don't exist, so either create them or change the guide page to fall back to `/og-image.png` when the file is missing.
- Add the three slugs to the sitemap (check `app/sitemap.ts`, since it may read from `guides` automatically), and to `llms.txt` if guides are listed there.
- `generateStaticParams` already uses `guides`, so the pages build automatically. Confirm they appear in `out/`.
- Add the new guides to the localized-guide fallback: `getLocalizedGuide` falls back to `en`, so the other locales will show English text. That's fine for now, but don't add hreflang alternates for locales without a translation. Check `getLanguageAlternates` and fix it if it would advertise untranslated URLs.

## Step 5. Internal links

- Each new guide links to its related tool(s) in the body and in `relatedToolIds`.
- The thumbnail guide links to the "how to change a thumbnail" guide, and the other way round.
- The watch-hours and monetization calculators link to the monetization requirements guide.
- Use descriptive link text (for example "YouTube monetization requirements"), not "click here".

## Step 6. Check before you finish

1. `npm run lint` and `npm run build` pass.
2. In `out/`, confirm each `<title>` is 50 characters or less before the brand, and each description is 70–160 characters. For example:
   `grep -o "<title>[^<]*" out/tools/youtube-revenue-calculator.html`
   (If the output isn't flat `.html` files, check `out/tools/youtube-revenue-calculator/index.html`.)
3. The revenue calculator title reads `YouTube Money Calculator: Views to Revenue | Creovly`, and its on-page H1 is still "YouTube Revenue Calculator".
4. The three new guides build, have a canonical URL and are in `sitemap.xml`.
5. No page claims something the tool doesn't do.

## Not in this task

- Keywords for the **watch hours calculator, RPM calculator and logo background remover** haven't been researched yet.
- Non-English locales.
- "Thumbnail downloader", "thumbnail maker" and similar tools. They're a different product, so skip them.
- Cloudflare www redirect, Search Console and backlinks: see `docs/SEO_FIXES_2026-11.md`.
