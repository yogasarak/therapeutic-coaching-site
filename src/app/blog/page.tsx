import React from 'react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import BlogGridPage from '@/components/BlogGridPage'
import { getAllPosts } from '@/lib/blog'
import Footer from '@/features/layout/Footer'
import { defaultSocialLinks } from '@/content/socialLinks'


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

const BlogPage = () => {
  const posts = getAllPosts()

  return (
    <>
      <Navigation />
      <main>
        {/* <BlogListPage posts={posts} /> */}
        <BlogGridPage posts={posts} />
      </main>
      <Footer 
        socialLinks={defaultSocialLinks}
        contactEmail="hello@yourcoachingpractice.com"
      />
    </>
  )
}

export default BlogPage
