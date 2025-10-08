import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import BlogPostContent from '@/components/BlogPostContent'
import { getAllPosts, getPostBySlug } from '@/lib/blog'


interface BlogPostParams { readonly slug: string }
interface BlogPostPageProps {
  readonly params?: Promise<any>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolved: BlogPostParams = params ? await params : { slug: '' }
  const { slug } = resolved
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-coaching-site.vercel.app'
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags],
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
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

const BlogPostPageComponent = async ({ params }: BlogPostPageProps) => {
  const resolved: BlogPostParams = params ? await params : { slug: '' }
  const { slug } = resolved
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Navigation />
      <main>
        <BlogPostContent post={post} />
      </main>
    </>
  )
}

export default BlogPostPageComponent
