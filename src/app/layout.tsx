import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/utils/theme'
import GlobalStyles from '@/components/GlobalStyles'

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
  metadataBase: new URL('https://your-coaching-site.vercel.app'),
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
    url: 'https://your-coaching-site.vercel.app',
    title: 'Therapeutic Coaching | Transform Your Life',
    description: 'Professional therapeutic coaching services to help you unlock your potential and create lasting positive change.',
    siteName: 'Therapeutic Coaching',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Therapeutic Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Therapeutic Coaching | Transform Your Life',
    description: 'Professional therapeutic coaching services to help you unlock your potential and create lasting positive change.',
    images: ['/images/og-image.jpg'],
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

interface RootLayoutProps {
  readonly children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout