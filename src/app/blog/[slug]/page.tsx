import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/SimpleNavigation'
import { BlogPostPage } from '@/components/SimpleBlog'
import { getAllPosts, getPostBySlug } from '@/server/mdx.server'

interface BlogPostPageProps {
  readonly params: Promise<{ readonly slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: [...post.tags],
    },
  }
}

const BlogPostPageComponent: React.FC<BlogPostPageProps> = async ({ params }) => {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main>
        <BlogPostPage post={post} />
      </main>
    </>
  )
}

export default BlogPostPageComponent