# Jaxsenville.com — Documentation Index

Jaxsenville.com is a static-site-generated portfolio/promotion site for artist Jaxsen Honeycutt. All pages are pre-rendered at build time from a Contentful CMS; there are no runtime CMS calls in production. Built with Vike (SSG on Vite), React 19, TypeScript, and deployed to Netlify.

## Docs

| File | Contents |
|------|----------|
| [architecture.md](./architecture.md) | Tech stack, SSG data flow, layout hierarchy, key design decisions |
| [routing.md](./routing.md) | Vike file conventions, URL table, slugs, prerender flow, JSON-LD schemas |
| [content-model.md](./content-model.md) | Contentful content types, field shapes, type generation, error handling |
| [components.md](./components.md) | Every UI component with file path, props, and notes |
| [infrastructure.md](./infrastructure.md) | Netlify config, caching, analytics, env vars, static assets |

## Quick Start

```bash
pnpm i
cp .env.example .env
# fill in VITE_CONTENTFUL_SPACE and VITE_CONTENTFUL_ACCESS_TOKEN
pnpm dev
```

## Commands

```bash
pnpm dev             # Vike dev server
pnpm build           # tsc + vike build (type-check + full SSG build)
pnpm lint            # ESLint
pnpm preview         # Build then serve locally
pnpm generate-types  # Regenerate src/types/contentful.d.ts from CMS schema
```

## Environment Variables

```
VITE_CONTENTFUL_SPACE=           # Contentful space ID
VITE_CONTENTFUL_ACCESS_TOKEN=    # Contentful delivery API token
```

Both are required at build time and dev time. See `.env.example`.
