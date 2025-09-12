import { MetadataRoute } from 'next'

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
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
