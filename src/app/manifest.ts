import { MetadataRoute } from 'next'
import { FAVICON_URL } from '@/config/externalAssets'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Therapeutic Coaching',
    short_name: 'TherapeuticCoaching',
    description: 'Professional therapeutic coaching services to help you unlock your potential and create lasting positive change.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2D5A87',
    icons: [
      { src: FAVICON_URL, sizes: '192x192', type: 'image/png' },
      { src: FAVICON_URL, sizes: '512x512', type: 'image/png' },
    ],
  }
}
