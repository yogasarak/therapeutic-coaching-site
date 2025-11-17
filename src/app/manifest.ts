import { MetadataRoute } from 'next'
import { ASSET_URLS } from '@/constants/assets'

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
      { src: ASSET_URLS.favicon, sizes: '192x192', type: 'image/png' },
      { src: ASSET_URLS.favicon, sizes: '512x512', type: 'image/png' },
    ],
  }
}
