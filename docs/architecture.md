# Architecture Overview

## Stack Summary
- **Framework**: Next.js 15 App Router (React 19) with TypeScript in strict mode.
- **Styling**: styled-components v6 with deterministic `componentId`s, theme tokens, and SSR registry.
- **Content**: Authorable MDX files compiled via `next-mdx-remote` in a shared library.
- **Delivery**: Static generation (`generateStaticParams`) for posts + incremental front-matter caching stored in `.cache/frontmatter.json`.
- **Validation**: `scripts/validate-content.js` walks MDX for asset references and fails builds on missing/disallowed URLs.

## Rendering Model
| Route | Rendering | Notes |
| ----- | --------- | ----- |
| `/` | Static (`next build`) | Pure server components; only portal CTAs ship JS |
| `/blog` | Static | Blog metadata supplied from cached snapshot; spotlight modal is a client island |
| `/blog/[slug]` | Static (SSG) | Fetches sanitized HTML + precompiled MDX; prefers MDX tree on the client |
| `/client-portal` | Client | Fully interactive demo; isolated so landing/blog stay lean |
| `/_not-found`, `/loading` | Client components | Styled with theme tokens; no global CSS |

## MDX Pipeline
1. **Front-matter** parsed with `gray-matter` for metadata, reading time, and tags.
2. **Snapshot caching** persists non-body metadata alongside the directory mtime.
3. **Body compilation** via `compileBlogMdx` (lazy import of `next-mdx-remote/rsc`) using:
   - `remark-gfm`
   - `rehype-slug`
   - `rehype-autolink-headings`
   - `rehype-sanitize` extended to allow modal attributes, audio, iframe hosts.
4. **Sanitized HTML** retained for fallback rendering + RSS/static use.
5. **Compiled React tree** cached in-memory per slug to avoid rework during SSG and runtime hydration.

Custom MDX components (e.g., `ModalBlock`) live in `src/components/mdx`, with separate maps for RSC and client contexts.

## Styling & Theming
- Single theme object (`src/utils/theme.ts`) consumed via `ThemeProvider` in `ClientThemeProvider`.
- `StyledComponentsRegistry` ensures styles render SSR + hydrate cleanly.
- No global CSS; all atoms leverage theme tokens for color, spacing, typography.
- Fallback routes (`loading`, `not-found`) use styled-components so design tokens apply uniformly.

## Content Safety
- Sanitiser denies `<script>` and unknown attributes by default while whitelisting modal data attributes.
- Asset validator script enforces:
  - Supabase-hosted image assets (`https://asgngaofemmqdyjcetkm.supabase.co/...`) alongside local audio under `/audio/*`.
  - Remote embeds only on approved hosts (SoundCloud, YouTube, Vimeo, Supabase media bucket).
- SoundCloud metadata lives in `src/content/media/soundcloudTracks.ts` so blog posts and client cards reuse a single source of truth.

## Testing & Tooling
- **Unit tests** (Jest + RTL) cover:
  - `BlogPostContent` MDX vs HTML fallback
  - Spotlight modal open/close flows
  - `getPostBySlug` sanitisation + compile caching (with MDX compiler mocked)
- **Content validation**: `npm run validate:content`
- **Build**: `npm run build`
- **Dependency resolution**: use `npm ci` for reproducible installs

## Deployment Notes
- Targeted for Vercel free tier: static assets only, minimal client bundles, portal isolated to a single page.
- Security headers (CSP, HSTS, permissions policy) configured in `next.config.mjs`.
- Robots + sitemap generated at build time for search engines.

This structure keeps content authoring frictionless (drop-in MDX + spotlight data), preserves strict separation between server and client islands, and keeps the runtime footprint small enough for free-tier hosting.
