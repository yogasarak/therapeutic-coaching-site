import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

// Ensure Node APIs like `fs` are available and force static generation.
export const runtime = 'nodejs'
export const dynamic = 'force-static'
// Cache and re-generate the sitemap every 24 hours (ISR-style).
export const revalidate = 60 * 60 * 24

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-coaching-site.vercel.app'
  const posts = getAllPosts()

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  const blogPosts = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts]
}
