# Infrastructure & Deployment

## Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "pnpm build"
  publish = "dist/client"
  NODE_VERSION = "22.21.1"
```

- Build output goes to `dist/client/` — Vike writes static HTML and assets there.
- Node 22 is pinned explicitly to match the local dev environment.

### Redirects

```toml
# Strip trailing slashes — Vike SSG generates no-trailing-slash URLs
[[redirects]]
  from = "/*/"
  to = "/:splat"
  status = 301
  force = true

# 404 fallback for any URL not matched by a pre-rendered file
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

Any URL the prerender didn't produce (stale links, typos) hits the 404 fallback.

## Cache Headers (`public/_headers`)

Netlify applies these headers to matching paths:

```
/assets/*   → Cache-Control: public, max-age=31536000, immutable
/images/*   → Cache-Control: public, max-age=31536000, immutable
/*.svg      → Cache-Control: public, max-age=31536000, immutable
```

- One-year cache (31,536,000 s) with `immutable` — browsers never revalidate these.
- Vite content-hashes filenames in `/assets/` on every build, so cache-busting is automatic.
- Images and SVGs in `public/` are not content-hashed, but they change rarely.

## Environment Variables

Required in `.env` (and as Netlify environment variables for CI builds):

| Variable | Purpose |
|----------|---------|
| `VITE_CONTENTFUL_SPACE` | Contentful space ID |
| `VITE_CONTENTFUL_ACCESS_TOKEN` | Contentful Delivery API token (read-only) |

Both are consumed at **build time** (Vike fetches Contentful during prerender). They are not exposed to the browser bundle at runtime because all data fetching happens during SSG. The `VITE_` prefix makes them available to `import.meta.env` inside Vite.

## Static Assets (`public/`)

Everything in `public/` is copied verbatim to `dist/client/` with no processing.

| Path | Contents |
|------|----------|
| `public/images/` | Responsive sign image: `jaxsenvillesign-304w.webp`, `-608w.webp`, `-912w.webp`, `-2050w.webp`; also `background.webp`, `q.webp` |
| `public/icon/` | Social media SVG icons: apple, bluesky, instagram, spotify, youtube |
| `public/menu/` | Nav section SVG icons: art, blahg, contact, music, phone |
| `public/favicon/` | Favicon PNG files (multiple sizes) + `site.webmanifest` |
| `public/Monotony-Regular.*` | Custom font in `.ttf`, `.woff`, `.woff2` formats |
| `public/_headers` | Netlify cache rules |
| `public/_redirects` | Netlify trailing-slash redirect (duplicates `netlify.toml` for safety) |
| `public/robots.txt` | Standard crawl permissions |
| `public/sitemap.xml` | Static sitemap (manually maintained) |

## Analytics

Umami analytics is injected via `src/pages/+client.tsx`. The script tag is appended to the document at runtime — it does not appear in the pre-rendered HTML. No analytics in dev (the Umami instance only counts production traffic).

## Font Loading

`Monotony-Regular` is the custom display font. It is:
- Stored in `public/` in all three formats (ttf, woff, woff2)
- Preloaded via a `<link rel="preload">` tag injected in `+client.tsx`
- Referenced in CSS via `@font-face`

## Build Optimizations

- **Terser** minifies JS and drops `console.*` and `debugger` statements in production.
- **Chunk splitting** — Vite splits output into `vendor` (React, React-DOM, node_modules) and `vike` chunks.
- **Chunk size warning** threshold is set to 1000 KB in `vite.config.ts`.
- **`optimizeDeps`** pre-bundles React and React-DOM for faster cold dev starts.
