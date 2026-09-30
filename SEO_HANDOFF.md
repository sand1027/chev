# Chev SEO launch handoff

## What is already implemented

- Indexable public routes: `/`, `/about`, `/services`, `/pricing`, `/reviews`, `/faq`, `/blog`, `/contact`, and published `/blog/[slug]` articles.
- Unique page title, meta description, canonical URL, Open Graph title/description, and Twitter metadata on each public page.
- A crawlable `robots.txt` that allows all bots and references `sitemap.xml`.
- A generated sitemap that includes all public pages and published blog articles only.
- Visible breadcrumbs and matching `BreadcrumbList` structured data on non-home pages.
- `FAQPage` JSON-LD on `/faq` and `Article` JSON-LD on published posts.
- A helpful 404 page and static blog routes; source contains no redirects, rewrite rules, middleware, or application-defined 405 responses.

## Required before launch

1. Set `NEXT_PUBLIC_SITE_URL` in the production environment to the final HTTPS domain. Do not leave the fallback domain in production.
2. Replace every placeholder in `data/site.ts` and `data/articles.ts`: counsellor name, verified bio/qualifications, exact public prices/currency, email, and approved review details.
3. Add a real 1200×630 Open Graph image and a rights-cleared counsellor portrait. Keep the original source image outside the public folder and commit a compressed `.webp` derivative for the website.
4. Replace anonymous reviews only with client-approved wording. Do not add review-rating markup unless reviews, ratings, dates, and consent are all verifiable.
5. Add a cookie/consent implementation appropriate to the markets served before enabling GA4 or Firebase analytics.

## Google Search Console submission

Search Console requires an account with verified ownership, so this must be completed by the site owner after deployment:

1. Open Google Search Console and add the final domain property.
2. Verify ownership using the recommended DNS record or another approved verification method.
3. In **Sitemaps**, submit `https://YOUR-DOMAIN/sitemap.xml`.
4. Inspect the homepage and each important page, then use **Request indexing** after the deployed URLs return HTTP 200.
5. Check **Page indexing** and **Crawl stats** after Google has recrawled the site. Fix any deployment-level blocks, headers, redirect chains, or 4xx errors there.

## Publishing a blog article

1. Add an article record to `data/articles.ts` with a unique, human-readable slug, a concise description, an accurate publication date, author data, and editor-reviewed body sections.
2. Mark it `status: "published"`. Published posts automatically appear on `/blog`, generate a static `/blog/[slug]` page, link to related articles, and enter the sitemap at the next deployment.
3. Keep a draft as `status: "draft"`; drafts never create public URLs or sitemap entries.
4. Write for a real reader and cite primary sources where factual claims need evidence. Do not publish generic or unreviewed AI-generated content.

## Image performance rules

- Use `next/image` for each final counsellor, service, and article image; provide explicit `width` and `height` (or a stable `fill` container plus `sizes`) to prevent layout shift.
- Use meaningful alt text for informative images. Use `alt=""` only for decorative images.
- Convert editorial photos to WebP before committing. Aim for appropriately sized source files rather than uploading oversized originals.
- Give `priority` only to the single above-the-fold LCP image; let all below-the-fold images load lazily.
- Supply responsive `sizes` for images in cards and grids.

## Honest expectations

Technical SEO makes crawling, indexing, page quality, and measurement possible; it cannot guarantee a #1 ranking, a Forbes backlink, or a specific traffic outcome. Editorial backlinks need relationship-building and independently useful content, while rankings depend on competition, authority, relevance, and ongoing performance.
