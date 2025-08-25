# Therapeutic Coaching Website

A modern, responsive therapeutic coaching website built with Next.js 15, TypeScript, and styled-components v5. Features include a one-page landing with smooth scroll navigation, MDX blog system, and Vercel deployment optimization.

## 🚀 Features

### Core Functionality
- **Responsive One-Page Landing**: Story, services, testimonials, and contact sections
- **Smart Navigation**: Auto-highlighting sticky nav with mobile hamburger menu
- **MDX Blog System**: Future-proof blog with support for text, images, and audio content
- **Performance Optimized**: Built for fast loading and excellent Lighthouse scores
- **SEO Ready**: Complete metadata, Open Graph tags, sitemap, and robots.txt
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support

### Technical Features
- **Functional Programming Style**: Immutable state, pure components, strict TypeScript
- **Styled Components**: SSR-optimized with theme provider and global styles
- **Security Headers**: Content Security Policy, HTTPS enforcement, and security best practices
- **Vercel Deployment**: Optimized for free Vercel hosting with automatic deployments

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.0 (App Router)
- **Language**: TypeScript (strict mode, no `any` types)
- **Styling**: Styled Components + CSS Variables
- **Content**: MDX with Gray Matter for frontmatter
- **Deployment**: Vercel
- **Fonts**: Inter + Merriweather (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coaching_site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   ├── globals.css        # Global CSS variables
│   ├── layout.tsx         # Root layout with styled-components
│   ├── loading.tsx        # Loading UI
│   ├── not-found.tsx      # 404 page
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # React components
│   ├── Simple*.tsx        # CSS-based simple components
│   ├── Styled*.tsx        # Styled-components based components
│   ├── GlobalStyles.tsx   # Global styled-components
│   └── StyledComponentsRegistry.tsx # SSR registry
├── content/
│   └── blog/              # MDX blog posts
├── server/
│   └── mdx.server.ts      # Server-side MDX utilities
├── types/
│   ├── index.ts           # TypeScript type definitions
│   └── styled.d.ts        # Styled-components theme types
└── utils/
    ├── index.ts           # Utility functions
    ├── theme.ts           # Design system theme
    └── mdx.ts             # Client-side MDX utilities
```

## 📝 Content Management

### Adding Blog Posts

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Blog Post Title"
   excerpt: "Brief description for SEO and previews"
   date: "2024-01-15"
   author: "Therapeutic Coach"
   tags: ["coaching", "personal growth"]
   featured: true
   ---
   ```
3. Write your content in Markdown/MDX format
4. Images go in `public/images/`
5. Audio files go in `public/audio/`

### Customizing Content

- **Hero Section**: Edit `src/components/HeroSection.tsx` or `SimpleHero.tsx`
- **Services**: Update the `services` array in `ServicesSection.tsx`
- **Testimonials**: Modify the `testimonials` array in `TestimonialsSection.tsx`
- **Contact Info**: Update contact details in `ContactSection.tsx`

## 🎨 Design System

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

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Development Guidelines

1. **TypeScript**: Use strict types, no `any`, prefer `readonly` arrays
2. **Components**: Use `React.FC<Props>` with explicit prop interfaces
3. **Functions**: Keep pure, avoid mutations, use spread operators
4. **Styling**: Use `as const` for type safety where applicable
5. **Performance**: Minimize client-side JavaScript, optimize images

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
- ✅ **Image Optimization**: Next.js automatic image optimization
- ✅ **Font Optimization**: Google Fonts with font-display: swap
- ✅ **Code Splitting**: Automatic with Next.js App Router
- ✅ **SSR/SSG**: Server-side rendering for optimal performance
- ✅ **Compression**: Automatic gzip/brotli compression on Vercel

## 📊 Performance & SEO

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100  
- **SEO**: 100

### SEO Features
- ✅ Semantic HTML structure
- ✅ Open Graph meta tags
- ✅ Twitter Card tags
- ✅ Structured data ready
- ✅ XML sitemap generation
- ✅ Robots.txt configuration
- ✅ Canonical URLs

### Accessibility Features
- ✅ Skip links for keyboard navigation
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Reduced motion support
- ✅ Screen reader optimization
- ✅ Color contrast compliance

## 🔒 Security

### Security Headers
- **CSP**: Content Security Policy configured
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **Referrer-Policy**: Referrer information control

### Best Practices
- ✅ No inline scripts (except styled-components SSR)
- ✅ Secure font loading
- ✅ Input sanitization
- ✅ HTTPS enforcement
- ✅ Environment variable protection

## 🧪 Testing

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

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Styled Components Guide](https://styled-components.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes following the code style guidelines
4. Test thoroughly (manual testing checklist above)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Built with ❤️ for therapeutic coaching professionals**