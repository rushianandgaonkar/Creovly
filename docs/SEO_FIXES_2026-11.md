# SEO fixes — November 2026 (from OpenSEO audit)

This patch covers the code changes from the OpenSEO site audit of creovly.com.
Two items need action outside the repo; they are at the bottom.

## What the patch changes

| # | Fix | Files |
|---|-----|-------|
| 3 | Duplicated brand in titles ("Contacto — Creovly \| Creovly"). `createPageMetadata` now strips a trailing "— Creovly" / "\| Creovly" before the layout template adds " \| Creovly". Fixes guides index, contact, privacy and terms in all 7 non-English locales. | `lib/metadata.ts` |
| 4 | Titles over 60 chars. New optional `seoTitle` on guides (used only for `<title>`; the on-page H1 still uses `title`). Shorter page titles for About and Studio. | `lib/guides.ts`, `config/guides-i18n.ts`, `config/i18n.ts`, `app/about/page.tsx`, `app/guides/[slug]/page.tsx`, `app/[locale]/[...slug]/page.tsx` |
| 5 | Meta descriptions over 160 chars on /about and /privacy. | `app/about/page.tsx`, `app/privacy/page.tsx` |
| 6b | Meta descriptions under 70 characters on /es/terms and the Japanese home, checklist, studio, tools and tools/thumbnail pages. All are now 70–160 characters. (The Japanese home description is also shown in the hero, so that on-page text gets longer too.) | `config/i18n.ts` |
| 6 | Localized /tools/thumbnail reused the tools-directory description and had a title like "Herramientas — Herramientas de miniaturas". Added a `thumbnailCategory` title and description for es, ja, fr, de, pt, ko and it. | `config/i18n.ts`, `app/[locale]/[...slug]/page.tsx` |
| 7 | Heading levels skipped. Footer column headings were `<h4>` (H2 → H4 skip on every page), so they're now `<h2>`. Contact sidebar headings were `<h3>` directly under the H1, so they're now `<h2>`. Classes are unchanged, so nothing looks different. | `components/layout/Footer.tsx`, `components/contact/ContactContent.tsx` |

## How to apply

```bash
git checkout -b seo/openseo-audit-fixes
git apply --check creovly-seo-fixes.patch
git am creovly-seo-fixes.patch      # or: git apply creovly-seo-fixes.patch
npm run build                        # static export to ./out
```

Before merging, check that:
- `npm run build` and the type check pass.
- In `out/`, `/es/contact` has `<title>Contacto | Creovly</title>`.
- In `out/`, `/guides/decoding-youtube-rpm` has `<title>YouTube RPM Explained: How Creators Get Paid | Creovly</title>`, and its H1 is unchanged.
- In `out/`, `/es/tools/thumbnail` has its own meta description.

Then deploy the usual way.

---

## #1 — Redirect www → apex with a 301 (Cloudflare dashboard, not code)

`https://www.creovly.com/` currently serves a full 200 page with a canonical
tag pointing at `https://creovly.com/`. It should 301 instead. `public/_redirects`
can't match on hostname, so set this up as a zone-level **Redirect Rule**:

Go to Cloudflare dashboard → creovly.com zone → **Rules → Redirect Rules → Create rule**.

- **Name:** `www to apex`
- **When incoming requests match:** Custom filter expression
  `(http.host eq "www.creovly.com")`
- **Then:** Dynamic redirect
  - Expression: `concat("https://creovly.com", http.request.uri.path)`
  - Status code: **301**
  - **Preserve query string:** on
- Deploy.

The `www` DNS record must stay proxied (orange cloud) so the rule can run.

Check it:

```bash
curl -sI https://www.creovly.com/tools?x=1 | grep -iE "^(HTTP|location)"
# expect: HTTP/2 301  and  location: https://creovly.com/tools?x=1
```

## #2 — Indexing and backlinks (manual, not code)

The site had 0 ranked keywords and 1 referring domain at audit time.

1. **Google Search Console:** add the `creovly.com` Domain property, verify it with a DNS TXT record in Cloudflare, then submit `https://creovly.com/sitemap.xml`.
2. **Bing Webmaster Tools:** import the property from Search Console and submit the same sitemap.
3. **Request indexing** in Search Console for the homepage, `/tools`, and the top 3–4 tool pages.
4. **List the free tools** on Product Hunt, AlternativeTo, SaaSHub, Toolify and "free YouTube tools" roundup posts.
5. **Link from your own profiles:** your YouTube channel's "About" links, social bios, and any creator communities you're active in (only where self-promotion is allowed).
