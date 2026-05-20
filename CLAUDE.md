# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Type-check and build for production (tsc && vike build)
pnpm lint         # Run ESLint
pnpm preview      # Build and preview production locally
pnpm generate-types  # Regenerate Contentful TypeScript types from CMS schema
```

## Environment Variables

Requires a `.env` file with:
- `VITE_CONTENTFUL_SPACE` — Contentful space ID
- `VITE_CONTENTFUL_ACCESS_TOKEN` — Contentful delivery API token

## Architecture

**Static Site Generation (SSG)** via [Vike](https://vike.dev/) (meta-framework on top of Vite) with `prerender: true` set globally in `src/pages/+config.ts`. All pages are pre-rendered at build time by fetching from Contentful.

**Routing** follows Vike's file-based convention:
- `src/pages/index/` → `/`
- `src/pages/(single)/music/` → `/music` (the `(single)` segment is a layout group, not a URL segment)
- `src/pages/(single)/music/@albumSlug/` → `/music/:albumSlug`
- `src/pages/(single)/music/@albumSlug/@songSlug/` → `/music/:albumSlug/:songSlug`
- Same pattern for `/art/@artId` and `/blahg/@glahb`

Dynamic route segments use `@param` naming; the URL slug is generated from content names via `createSlug()` in `src/utils/transformers.ts`.

**Content flow:**
1. `onBeforePrerenderStart` files enumerate all dynamic URLs at build time (fetches Contentful to discover all albums, songs, art pieces, etc.)
2. `+data.tsx` files fetch the specific entry for each pre-rendered page
3. Pages consume data via `useData<Data>()` from `vike-react`

**Contentful integration** (`src/services/contentful-service.ts`) wraps the Contentful client with typed methods for content types: `release`, `bandcampAlbum`, `art`, `blahg`. Generated types live in `src/types/contentful.d.ts` (run `generate-types` after CMS schema changes). Hand-written response interfaces are in `src/types/contentful-response.ts`.

**Layout hierarchy:**
- `src/pages/Layout.tsx` — root layout; sets global metadata defaults via `vike-metadata-react`; wraps everything in `<StrictMode>` + `<Suspense>`
- `src/pages/(single)/+Layout.tsx` — shared layout for music/art/blahg sections; adds `<PageTitleButton>` and a `.Gallery` wrapper; reads the current section name from `(single)/+data.tsx`
- `src/pages/(single)/music/+Layout.tsx` — music-specific sub-layout

**Key utilities:**
- `src/utils/transformers.ts` — converts raw Contentful entries to typed UI models; `createSlug()` is the canonical slug function used in both prerender and data files
- `src/utils/urlize.ts` — URL helpers
- `src/utils/error-handler.ts` — Contentful error normalization

**Bandcamp embeds** are loaded client-only (`clientOnly()` from `vike-react`) with an `IntersectionObserver` to defer loading until the embed scrolls into view.

**Build:** Vite with Terser minification; `console.*` and debugger statements are stripped in production. Chunks are split into `vendor` (React/React-DOM + other node_modules) and `vike`.

**Deployment:** Netlify. Caching rules are in `public/_headers`.
