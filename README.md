# Therapeutic Coaching Website

Therapeutic Coaching Website is a production-ready Next.js 15 + TypeScript + styled-components build pairing a password-gated client portal with synchronized text/audio MDX posts, modal storytelling, search, and canonicalized topic badges—all wrapped in a responsive one-page marketing experience tuned for Vercel.

It doubles as an advanced Next.js App Router showcase: server actions, hardened CSP/HSTS headers, cached MDX pipelines, a styled-components SSR registry, Jest coverage, and automation for content validation plus clean rebuilds, giving nontechnical practitioners a turnkey experience while engineers can inspect the architectural depth.

![Therapeutic Nexus preview](https://asgngaofemmqdyjcetkm.supabase.co/storage/v1/object/public/therapeutic%20nexus%20images/therapeutic-nexus.png)


## Features

### Core Functionality
- **Responsive One-Page Landing**: Story, services, testimonials, and contact sections
- **Smart Navigation**: Auto-highlighting sticky nav with mobile hamburger menu
- **MDX Blog System**: Hot-swappable posts with front-matter caching, sanitised Markdown, and reusable modal content
- **Performance Optimized**: Built for fast loading and excellent Lighthouse scores
- **SEO Ready**: Complete metadata, Open Graph tags, sitemap, and robots.txt
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support

### Technical Features
- **Functional Programming Style**: Immutable state, pure components, strict TypeScript
- **Styled Components**: SSR-optimized with theme provider, registry, and deterministic class names
- **Security Headers**: Content Security Policy, HTTPS enforcement, and security best practices
- **Vercel Deployment**: Optimized for free Vercel hosting with automatic deployments

## Tech Stack

- **Framework**: Next.js 15.5.0 (App Router)
- **Language**: TypeScript (strict mode, no `any` types)
- **Styling**: Styled-components with theme tokens
- **Content**: MDX (next-mdx-remote) + gray-matter
- **Deployment**: Vercel
- **Fonts**: Inter + Merriweather (Google Fonts)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coaching_site
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
├── app/
│   ├── blog/                # Blog index + article routes
│   ├── client-portal/       # Client portal demo
│   ├── layout.tsx           # Root layout with Styled Components registry
│   ├── loading.tsx          # Loading state (styled-components)
│   ├── not-found.tsx        # 404 page (styled-components)
│   ├── page.tsx             # Landing page
│   ├── robots.ts            # Robots.txt generation
│   └── sitemap.ts           # Sitemap generation
├── components/              # Reusable components & feature modules
│   ├── mdx/                 # MDX client + RSC component maps
│   ├── BlogGridPage.tsx     # Blog listing with spotlight modal
│   └── ...
├── content/
│   ├── blog/                # Authorable MDX posts
│   └── spotlights.ts        # Spotlight modal content data
├── features/                # Portal features (cards, modals, etc.)
├── lib/
│   ├── blog.ts              # MDX loader, sanitiser, caching
│   ├── mdx.ts               # Shared MDX compiler
│   └── cache/frontmatter.ts # Front-matter snapshot helpers
├── scripts/                 # Content validation scripts
├── types/                   # Shared TypeScript types
└── utils/                   # Theme + utility helpers
```

## Content Management & Filters

### Blog authoring workflow

1. Create `src/content/blog/<slug>.mdx` with front matter:
   ```yaml
   ---
   title: "Your Blog Post Title"
   excerpt: "Short SEO + preview copy"
   date: "2024-01-15"
   author: "Therapeutic Coach"
   tags: ["coaching", "personal growth"]
   featured: true
   ---
   ```
2. Write Markdown/MDX. Modal callouts are supported via `<button data-modal="true" ...>` etc.
3. Store referenced assets under `public/images` or `public/audio`.
4. Run the content validator:
   ```bash
   npm run validate:content
   ```
   This ensures all local and external assets are resolvable and on approved hosts.
5. Commit the MDX file (the front-matter snapshot regenerates automatically on the next build).

### Blog search & filters

- Keyword search auto-selects the matching topic chip (typing “audio” toggles the audio badge), keeping the chips and text entry in sync.
- Selected filters surface in a gradient badge under the topic controls, with a “Clear selection” action to reset.

### Protected assets

- Sensitive files live outside `public/` in `protected-assets/`.
- The route handler at `/api/protected-images/[...assetPath]` streams files only when the request includes the `ASSET_ACCESS_TOKEN`.
- Set `ASSET_ACCESS_TOKEN` in your environment (Vercel → Environment Variables) and supply it via the `x-protected-token` header or `?token=` query when requesting an asset.
- Keep in mind: files committed to a public repo remain visible via Git history—move private media out of version control to keep them truly private.

### Customizing Content

- **Hero Section**: Edit `src/components/HeroSection.tsx` or `SimpleHero.tsx`
- **Services**: Update the `services` array in `ServicesSection.tsx`
- **Testimonials**: Modify the `testimonials` array in `TestimonialsSection.tsx`
- **Contact Info**: Update contact details in `ContactSection.tsx`

## Design System

### Colors
```css
--color-primary: #2D5A87     /* Navy blue */
--color-secondary: #8FBC8F   /* Sage green */
--color-accent: #F4A460      /* Sandy brown */
--color-background: #FFFFFF  /* White */
--color-surface: #F8F9FA     /* Light gray */
```

### Typography
- **Primary Font**: Inter (sans-serif)
- **Secondary Font**: Merriweather (serif, used for headings)

### Spacing Scale
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 1.5rem   /* 24px */
--spacing-lg: 2rem     /* 32px */
--spacing-xl: 3rem     /* 48px */
--spacing-xxl: 4rem    /* 64px */
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run clean:build  # Remove .next, reinstall, rebuild
```

### Working with `.next` builds

- The development server (`npm run dev`) watches files and hot-reloads—no need to delete `.next` between edits. Restart only when you change env vars, config (e.g., `next.config.mjs`), or upgrade dependencies.
- Production builds (`npm run build`) must be re-run whenever you change server logic, static props, MDX content, or environment configuration. This regenerates static pages and bundles.
- If you suspect stale artifacts (for example after major dependency updates or branch switches), run:
  ```bash
  npm run clean:build
  ```
  This command deletes the `.next` build directory and then runs `npm run build` for a clean production build.
  Run once beforehand to make the script executable:
  ```bash
  chmod +x scripts/clean-rebuild.sh
  ```

### Development Guidelines

1. **TypeScript**: strict types, `readonly` data, prefer discriminated unions for content data
2. **Components**: keep server/client components separate; annotate client roots with `'use client'`
3. **Styling**: Styled-components only; leverage theme tokens and avoid inline styles
4. **Performance**: use `npm ci`, rely on cached front-matter, keep modals lazy and data-driven
5. **Testing**: `npm test -- --runInBand` covers MDX compilation, modal flows, and sanitisation

### Further Reading

- [Technical architecture overview](docs/architecture.md)

### Code Style Examples

```typescript
// ✅ Good: Strict typing with readonly
interface NavigationProps {
  readonly sections: ReadonlyArray<NavigationSection>
  readonly activeSection: string
}

// ✅ Good: Pure function with spread
const addSection = (sections: ReadonlyArray<Section>, newSection: Section) => 
  [...sections, newSection]

// ✅ Good: Discriminated union
type ButtonVariant = 'primary' | 'secondary' | 'ghost'

// ❌ Bad: Any type
const handleClick = (data: any) => { ... }
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Environment Variables** (if needed)
   - Set in Vercel dashboard
   - Add to `.env.local` for local development

3. **Domain Setup**
   - Configure custom domain in Vercel dashboard
   - Update `metadataBase` in `src/app/layout.tsx`
   - Update sitemap URLs in `src/app/sitemap.ts`

### Build Optimization

The project includes:
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Google Fonts with font-display: swap
- **Code Splitting**: Automatic with Next.js App Router
- **SSR/SSG**: Server-side rendering for optimal performance
- **Compression**: Automatic gzip/brotli compression on Vercel

## 🎵 Embeds & Audio

- Overview
  - External embeds (SoundCloud, YouTube, Vimeo) remain opt-in via CSP and HTML sanitization.
  - Local audio uses the reusable `<AudioPlayer />` component that wraps a native `<audio>` tag for maximum compatibility and zero third-party dependencies.
  - SoundCloud embeds are registered once in `src/content/media/soundcloudTracks.ts` and reused via `<SoundCloudEmbed />` or `MediaEmbed`.

- CSP (next.config.mjs)
  - Update `frame-src` when enabling additional iframe providers (YouTube, Vimeo, etc.).
  - Local audio is served from `/public/audio` and does not require CSP changes.

- Sanitization (src/lib/blog.ts)
  - Markdown is sanitized with `sanitize-html`; allowed iframes are limited to SoundCloud, YouTube, and Vimeo hosts.
  - `<audio>` tags are allowed by default so the MDX `<AudioPlayer />` renders safely.

- Markdown usage (in .mdx files)
  - Import the shared player and track metadata once, then reuse:
    ```mdx
    import AudioPlayer from '@/components/AudioPlayer'
    import { audioTracks } from '@/content/media/audioTracks'

    <AudioPlayer src={audioTracks.transitionMeditation.src} aria-label="Guided meditation" />
    ```
- For SoundCloud tracks, register the embed once and drop in the component:
  ```mdx
  import SoundCloudEmbed from '@/components/embeds/SoundCloudEmbed'

  <SoundCloudEmbed trackKey="sweetSweetSteep" />
  ```
- Example content: the `Meditation: Sweet Sweet Steep` blog post and the matching client-portal card both pull from the same `sweetSweetSteep` track definition.
  - For iframe providers, continue to paste the embed HTML (sanitizer keeps approved attributes).

- Security notes
  - Keep CSP restrictive (`frame-src 'self' https://www.youtube.com https://player.vimeo.com`).
  - `object-src 'none'` and `base-uri 'self'` stay enforced.
  - Sanitizer strips script tags and unexpected attributes by default.


## Performance & SEO

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100  
- **SEO**: 100

### SEO Features
- Semantic HTML structure
- Open Graph meta tags
- Twitter Card tags
- Structured data ready
- XML sitemap generation
- Robots.txt configuration
- Canonical URLs

### Accessibility Features
- Skip links for keyboard navigation
- ARIA labels and roles
- Focus management
- Reduced motion support
- Screen reader optimization
- Color contrast compliance

## Security

### Security Headers
- **CSP**: Content Security Policy configured
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Referrer information control

### Best Practices
- No inline scripts (except styled-components SSR)
- Secure font loading
- Input sanitization
- HTTPS enforcement
- Environment variable protection

## Testing

### Manual Testing Checklist

**Navigation**:
- [ ] Desktop sticky navigation works
- [ ] Mobile hamburger menu functions
- [ ] Active section highlighting works
- [ ] Smooth scrolling to sections

**Responsive Design**:
- [ ] Mobile (< 768px) layout
- [ ] Tablet (768px - 1024px) layout  
- [ ] Desktop (> 1024px) layout
- [ ] All text remains readable

**Blog System**:
- [ ] Blog listing page loads
- [ ] Individual blog posts render
- [ ] MDX content displays correctly
- [ ] Reading time calculation works

**Forms**:
- [ ] Contact form validation
- [ ] Form submission feedback
- [ ] Accessible form labels

## 🐛 Troubleshooting

### Common Issues

**Build Errors**:
- Check TypeScript strict mode compliance
- Verify all imports are correctly typed
- Ensure MDX files have proper frontmatter

**Styled Components SSR**:
- Verify StyledComponentsRegistry is properly configured
- Check that client components are marked with 'use client'
- Ensure theme provider wraps all styled components

**MDX Content**:
- Verify frontmatter YAML syntax
- Check file encoding (should be UTF-8)
- Ensure images/audio files exist in public directory

### Performance Issues

- Use Next.js built-in Image component
- Minimize client-side JavaScript
- Optimize images before uploading
- Check bundle size with `npm run build`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Styled Components Guide](https://styled-components.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)


## License

This project is licensed by Sara Keyser 2025 under the MIT License. See LICENSE file for details.

