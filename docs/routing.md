# Routing

## Vike File Conventions

Vike uses special `+`-prefixed filenames within a folder to define a route.

| File | Purpose |
|------|---------|
| `+Page.tsx` | The React component rendered for this route |
| `+data.tsx` | Exports `data()` — fetches data for this route at prerender/request time |
| `+Layout.tsx` | Layout wrapper applied to this route and all children |
| `+onBeforePrerenderStart.tsx` | Exports `onBeforePrerenderStart()` — returns all URLs to pre-render for dynamic segments |
| `+config.ts` | Vike route/plugin config (only at root) |
| `+client.tsx` | Code that runs only in the browser (analytics, font preloading, etc.) |

## URL Map

| URL | Folder path |
|-----|-------------|
| `/` | `src/pages/index/` |
| `/art` | `src/pages/(single)/art/` |
| `/art/:artId` | `src/pages/(single)/art/@artId/` |
| `/blahg` | `src/pages/(single)/blahg/` |
| `/blahg/:glahb` | `src/pages/(single)/blahg/@glahb/` |
| `/music` | `src/pages/(single)/music/` |
| `/music/:albumSlug` | `src/pages/(single)/music/@albumSlug/` |
| `/music/:albumSlug/:songSlug` | `src/pages/(single)/music/@albumSlug/@songSlug/` |
| `/contact` | `src/pages/(single)/contact/` |
| `*` (unmatched/404) | `src/pages/_error/` |

**`(single)` is a layout group** — the parentheses tell Vike not to include this folder name in the URL. It exists only to attach `(single)/+Layout.tsx` to the art/blahg/music/contact sections.

**`@param` syntax** — a folder prefixed with `@` is a dynamic segment. The value is available in the data function via `pageContext.routeParams.param`.

## Slug Generation

Two slug functions exist; use `createSlug()` for new code:

- **`createSlug(name)`** in `src/utils/transformers.ts` — lowercase, strips non-alphanumeric except spaces, replaces spaces with hyphens. Used by music and prerender files.
- **`urlize(title)`** in `src/utils/urlize.ts` — similar but slightly different regex. Used by art section.

Both are used in pairs: the `+onBeforePrerenderStart.tsx` generates the URL with one function, and the corresponding `+data.tsx` finds the content using the same function. Mixing them would cause 404s.

## Pre-Render Flow

For each section with dynamic routes (art, blahg, music/album, music/song):

1. `+onBeforePrerenderStart.tsx` — fetches all entries from Contentful, maps each to its URL using the slug function, returns the array of URL strings.
2. Vike calls the corresponding `+data.tsx` for each URL, passing the route param.
3. `+data.tsx` re-fetches from Contentful, finds the entry by slug, and returns it.
4. Vike renders the page component with that data and writes static HTML.

The blahg section uses the Contentful `fields.url` value directly as the slug (not derived from title), so it's author-controlled.

## JSON-LD Structured Data

These pages inject JSON-LD `<script type="application/ld+json">` for SEO:

| Page | Schema type |
|------|-------------|
| `/art/:artId` | `CreativeWork` |
| `/blahg/:glahb` | `BlogPosting` |
| `/music/:albumSlug` | `MusicAlbum` |
| `/music/:albumSlug/:songSlug` | `MusicRecording` |

The schemas are inlined in the respective `+Page.tsx` files using `useMetadata()` or a `<script>` tag rendered into the page.

## Data Fetching Notes

- Music listing (`/music` `+data.tsx`) fetches **all** content types (releases, songs, bandcamp embeds, bandcamp albums) in one `Promise.all()`.
- Art and blahg listings fetch their respective single content type ordered by date descending.
- Dynamic detail pages re-fetch all entries and filter by slug client-side (Contentful delivery API doesn't support slug lookups natively with nested includes).
- All data fetches use include depth 2 (`include: 2`) to resolve linked entries.
