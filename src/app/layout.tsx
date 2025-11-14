import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import ClientThemeProvider from '@/components/ClientThemeProvider'
import BackToTop from '@/components/BackToTop'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import DemoTour from '@/features/demo/DemoTourWrapper'
import { Analytics } from '@vercel/analytics/react'
import { FAVICON_URL, HERO_SOCIAL_IMAGE_URL } from '@/config/externalAssets'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-coaching-site.vercel.app'),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-coaching-site.vercel.app',
  },
  icons: {
    icon: [
      { url: FAVICON_URL, type: 'image/png', sizes: '32x32' },
      { url: FAVICON_URL, type: 'image/png', sizes: '192x192' },
    ],
    shortcut: [FAVICON_URL],
    apple: [
      { url: FAVICON_URL, sizes: '180x180', type: 'image/png' },
    ],
  },
  title: {
    default: 'Therapeutic Coaching | Transform Your Life',
    template: '%s | Therapeutic Coaching',
  },
  description: 'Professional therapeutic coaching services to help you unlock your potential, overcome challenges, and create lasting positive change in your life.',
  keywords: ['therapeutic coaching', 'life coaching', 'personal development', 'mental health', 'transformation'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Therapeutic Coaching',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-coaching-site.vercel.app',
    title: 'Therapeutic Coaching | Transform Your Life',
    description: 'Professional therapeutic coaching services to help you unlock your potential and create lasting positive change.',
    siteName: 'Therapeutic Coaching',
    images: [
      { url: HERO_SOCIAL_IMAGE_URL, width: 1200, height: 630, alt: 'Therapeutic Coaching Preview' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Therapeutic Coaching | Transform Your Life',
    description: 'Professional therapeutic coaching services to help you unlock your potential and create lasting positive change.',
    images: [HERO_SOCIAL_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const RootLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={FAVICON_URL} />
        <link rel="apple-touch-icon" href={FAVICON_URL} />
      </head>
      <body className={`${inter.variable} ${merriweather.variable}`}>
        <StyledComponentsRegistry>
          <ClientThemeProvider>
            <DemoTour />
            {children}
            <BackToTop />
            <Analytics />
          </ClientThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
