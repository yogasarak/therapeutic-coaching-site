import React from 'react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { BlogListPage } from '@/components/BlogComponents'
import { getAllPosts } from '@/lib/blog'


export const metadata: Metadata = {
  title: 'Blog List View',
  description: 'Insights on personal growth, healing, and the therapeutic journey - List View',
  keywords: ['therapeutic coaching', 'personal growth', 'mental health', 'healing', 'blog'],
  openGraph: {
    title: 'Blog List View | Therapeutic Coaching',
    description: 'Insights on personal growth, healing, and the therapeutic journey - List View',
    type: 'website',
  },
}

const BlogListViewPage = () => {
  const posts = getAllPosts()

  return (
    <>
      <Navigation />
      <main>
        <BlogListPage posts={posts} showViewToggle={true} />
      </main>
    </>
  )
}

export default BlogListViewPage
