# Component Inventory

## Shared Components (`src/components/`)

### `HeaderImage`
**File:** `src/components/HeaderImage.tsx`  
**Props:** none  
Renders the site logo (Jaxsenville sign image) as a link to `/`. Uses a `srcSet` with four responsive widths (304w, 608w, 912w, 2050w from `public/images/`). Has a visually-hidden `<h1>` for SEO. Uses `fetchPriority="high"` — this is the LCP element.

### `PageTitleButton`
**File:** `src/components/PageTitleButton.tsx`  
**Props:** `{ text?: string }`  
Navigation button showing the current section name with an inline SVG icon. Returns `null` if `text` is undefined. Used in the `(single)` layout nav bar. Dynamically capitalizes the text and loads the matching SVG from `public/menu/`.

---

## Home Page (`src/pages/index/`)

### `MenuButtons` (+ `MenuButton`)
**File:** `src/pages/index/components/MenuButtons.tsx`  
**Props:** none (internal `MenuButton` takes `{ text: string }`)  
Four navigation cards linking to `/art`, `/blahg`, `/music`, `/contact`. Each card shows the section name and its SVG icon.

---

## Art Section (`src/pages/(single)/art/`)

### `ArtPiece`
**File:** `src/pages/(single)/art/components/ArtPiece.tsx`  
**Props:** `{ piece: IArt | ArtSkeleton, spot?: number }`  
Renders a framed art card with title, date (formatted via date-fns), and media type. Uses `<Suspense>` for image fallback. Images use `loading="lazy"`. Displays `lowRez` image in the gallery listing context.

---

## Blahg Section (`src/pages/(single)/blahg/`)

### `ListedBlahgPost`
**File:** `src/pages/(single)/blahg/components/ListedBlahgPost.tsx`  
**Props:** `{ data: PostListing, top: boolean }`  
Clickable card for the blog listing page. Shows title and creation date. `PostListing` type: `{ ID, title, created_at, url, heroImage? }`.

### `BlahgPost`
**File:** `src/pages/(single)/blahg/@glahb/components/BlahgPost.tsx`  
**Props:** `{ data: Post }`  
Full blog post view. Renders hero image (if present), title, date, and `content` as HTML converted from Markdown via Showdown. Injects a `BlogPosting` JSON-LD schema tag. `Post` extends `PostListing` with `content: string`.

---

## Music Section (`src/pages/(single)/music/`)

### `DSP`
**File:** `src/pages/(single)/music/components/DSP.tsx`  
**Props:** `{ name: string, link: string }`  
A labelled link to a Digital Service Provider (Spotify, Apple Music, YouTube, etc.). Loads the matching SVG icon from `public/icon/`.

### `Release`
**File:** `src/pages/(single)/music/components/Release.tsx`  
**Props:** `{ release: IRelease, top?: boolean }`  
Album card showing cover art, title, Spotify link, and a track list. Uses `<Suspense>` for the cover image. `IRelease`: `{ name, date, cover, spotify, tracks: ISong[], slug }`.

### `Song`
**File:** `src/pages/(single)/music/components/Song.tsx`  
**Props:** `{ song: ISong }`  
Single track row: position number, name, and optional Bandcamp embed. `ISong`: `{ pos, name?, embed? }`.

### `BandcampEmbed`
**File:** `src/pages/(single)/music/components/BandcampEmbed.tsx`  
**Props:** `{ embed: IBandcampEmbed }`  
Bandcamp iframe embed. Wrapped in `clientOnly()` from `vike-react` — **renders nothing on the server**; loads only in the browser. Uses `IntersectionObserver` to defer iframe initialization until the embed scrolls into view (performance).

`IBandcampEmbed`: `{ track_id, name?, album?: IBandcampAlbum }`  
`IBandcampAlbum`: `{ id: number, url: string }`

The iframe `src` is constructed differently depending on whether an album reference is present.

---

## Contact Section (`src/pages/(single)/contact/`)

### `ContactComponent`
**File:** `src/pages/(single)/contact/components/ContactComponent.tsx`  
**Props:** none  
Static contact info card: email, Instagram, Bluesky links with SVG icons. No form — just links.

---

## Layouts

### Root Layout
**File:** `src/pages/Layout.tsx`  
**Props:** `{ children: ReactNode }`  
Active on every page. Sets global metadata defaults via `useMetadata.setGlobalDefaults()` (title "Jaxsenville", description, Open Graph image, keywords, robots). Wraps app in `<StrictMode>`. Renders `<header>` containing `<HeaderImage>` and `<main role="main">` containing children.

### (single) Layout
**File:** `src/pages/(single)/+Layout.tsx`  
**Props:** `{ children: ReactNode }`  
Active on all pages under `(single)/` (art, blahg, music, contact). Reads section name from `useData<Data>()` (provided by `(single)/+data.tsx`). Renders a `<nav>` with `<PageTitleButton>` and an Instagram link that appears only when `pathname === '/art'`. Wraps children in `<div className="Gallery">`.

---

## Error Page

### Error Page
**File:** `src/pages/_error/+Page.tsx`  
Handles unmatched routes and thrown errors. Reads `pageContext.abortReason` or `pageContext.is404` to display an appropriate message.
