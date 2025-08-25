import React from 'react'
import type { Metadata } from 'next'
import Navigation from '@/components/SimpleNavigation'
import { BlogListPage } from '@/components/SimpleBlog'
import { getAllPosts } from '@/server/mdx.server'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on personal growth, healing, and the therapeutic journey from a professional therapeutic coach.',
  keywords: ['therapeutic coaching', 'personal growth', 'mental health', 'healing', 'blog'],
  openGraph: {
    title: 'Blog | Therapeutic Coaching',
    description: 'Insights on personal growth, healing, and the therapeutic journey from a professional therapeutic coach.',
    type: 'website',
  },
}

const BlogPage: React.FC = () => {
  const posts = getAllPosts()

  return (
    <>
      <Navigation />
      <main>
        <BlogListPage posts={posts} />
      </main>
    </>
  )
}

export default BlogPage