# Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Vike](https://vike.dev/) 0.4.x (SSG meta-framework on Vite) |
| UI | React 19 + TypeScript 5.7 (strict mode) |
| CMS | Contentful (delivery API, include depth 2) |
| Markdown | Showdown 2.x (blahg posts only) |
| Dates | date-fns 4.x |
| Build tool | Vite 6.x + Terser (drops console/debugger in prod) |
| Package manager | pnpm |
| Hosting | Netlify (static files from `dist/client/`) |
| Analytics | Umami (injected client-side in `+client.tsx`) |

## Static Site Generation

`prerender: true` is set globally in `src/pages/+config.ts`. At build time Vike:

1. Calls every `+onBeforePrerenderStart.tsx` to enumerate all dynamic URLs
2. For each URL, runs the matching `+data.tsx` to fetch the page's data from Contentful
3. Renders the page to static HTML and writes it to `dist/client/`

Result: zero runtime CMS calls in production. All content is baked into HTML at build time.

## SSG Data Flow

```
Contentful API
  └─> contentfulService (src/services/contentful-service.ts)
        └─> transformers (src/utils/transformers.ts)   ← flatten + slug + resolve refs
              └─> +data.tsx (per-page data file)
                    └─> useData<Data>()                ← consumed in component
                          └─> Page component
```

Key files in the chain:
- **`src/utils/contentful.ts`** — creates the single Contentful client from env vars
- **`src/services/contentful-service.ts`** — typed wrapper; all CMS calls go through here
- **`src/utils/transformers.ts`** — canonical slug function + data-flattening utilities
- **`src/utils/error-handler.ts`** — `ContentfulError` class + `logError()` / `handleContentfulError()`

## Build Pipeline

```
pnpm build
  → tsc (type-check; fails fast on type errors)
  → vike build
      → fetch all Contentful entries (onBeforePrerenderStart files)
      → enumerate routes
      → pre-render all pages to dist/client/
```

Output directory: `dist/client/` — this is what Netlify serves.

## Layout Hierarchy

```
src/pages/Layout.tsx          (root — always active)
  └─ src/pages/(single)/+Layout.tsx   (active for /art, /blahg, /music, /contact)
       └─ +Page.tsx                   (leaf page component)
```

- **Root Layout** sets global metadata defaults (`vike-metadata-react`), wraps app in `<StrictMode>`, renders `<header>` (with `HeaderImage`) and `<main>`.
- **`(single)` Layout** adds the nav bar (`PageTitleButton`), conditionally shows the Instagram link on `/art`, and wraps content in `.Gallery` (CSS Grid).
- **`(single)`** is a Vike layout group — it groups pages under a shared layout without adding a URL segment.

## Key Design Decisions

**SSG over SSR** — Content is all static; pre-rendering gives instant load times and eliminates runtime CMS latency.

**Layout groups** — The `(single)` folder name (parentheses syntax) lets music, art, blahg, and contact share a layout without adding `/single/` to their URLs.

**Slug generation** — `createSlug()` in `transformers.ts` is the canonical function. Both the `+onBeforePrerenderStart.tsx` enumeration and the `+data.tsx` lookup use the same function, so slugs always match. `urlize()` exists in `src/utils/urlize.ts` and is used in a couple of places (art section); prefer `createSlug()` for new work.

**Bandcamp embeds client-only** — Third-party iframes are wrapped in `clientOnly()` from `vike-react` so they don't block SSR and are loaded lazily via `IntersectionObserver` (only when scrolled into view).

**Centralized error handling** — All Contentful errors go through `handleContentfulError()` which throws a `ContentfulError` with context. `logError()` outputs to console in dev only (Terser strips `console.*` in prod).

**Metadata via vike-metadata-react** — Global defaults set in root Layout; individual pages override with `useMetadata({ title, description, openGraph, ... })`.

## Client-Side Features

These run only in the browser, injected via `src/pages/+client.tsx`:

- **Umami analytics** — script tag injected at runtime
- **Font preloading** — `Monotony-Regular.woff2` declared as `<link rel="preload">`
- **Favicon** — Multiple sizes (180×180, 32×32, 16×16) + web manifest
