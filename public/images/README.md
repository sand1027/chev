# Chev image assets

Add only rights-cleared final images here. Preferred file naming:

- `counsellor-portrait.webp`
- `og-default.webp` (1200×630)
- `articles/<article-slug>.webp`

Before adding an image:

1. Keep the original outside `public/`; export an appropriately sized WebP for the site.
2. Record meaningful alt text beside the image in the relevant typed content record.
3. Render it through `next/image` with known width/height or a stable `fill` container and `sizes`.
4. Use `priority` only for the one meaningful above-the-fold image on a page.

Do not commit uncompressed camera originals, images without publishing rights, or decorative images presented as content.
