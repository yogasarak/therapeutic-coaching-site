'use client'

import React from 'react'
import Link from 'next/link'
import { BlogPost } from '@/types'
import { formatDate } from '@/utils'

interface BlogListPageProps {
  readonly posts: ReadonlyArray<BlogPost>
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ posts }) => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container" style={{ padding: '4rem var(--spacing-lg)' }}>
        <Link 
          href="/" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-primary)',
            marginBottom: 'var(--spacing-xl)',
            fontWeight: '500',
          }}
        >
          ← Back to Home
        </Link>
        
        <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ marginBottom: 'var(--spacing-md)' }}>Blog</h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--color-text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Insights on personal growth, healing, and the therapeutic journey
          </p>
        </header>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
            <p>No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {posts.map(post => (
              <article 
                key={post.slug}
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: 'var(--spacing-xl)',
                }}
              >
                <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', display: 'block' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text-muted)',
                  }}>
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  
                  <h2 style={{
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '1.8rem',
                    lineHeight: '1.3',
                  }}>
                    {post.title}
                  </h2>
                  
                  <p style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: '1.7',
                    fontSize: '1.1rem',
                    marginBottom: 'var(--spacing-lg)',
                  }}>
                    {post.excerpt}
                  </p>
                  
                  {post.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          style={{
                            backgroundColor: '#2D5A8715',
                            color: 'var(--color-primary)',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--border-radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: '500',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface BlogPostPageProps {
  readonly post: BlogPost
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  return (
    <article style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container" style={{ maxWidth: '800px', padding: '4rem var(--spacing-lg)' }}>
        <Link 
          href="/blog" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-primary)',
            marginBottom: 'var(--spacing-xl)',
            fontWeight: '500',
          }}
        >
          ← Back to Blog
        </Link>
        
        <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: 'var(--spacing-md)', lineHeight: '1.2' }}>
            {post.title}
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '0.95rem',
            color: 'var(--color-text-muted)',
            flexWrap: 'wrap',
          }}>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          
          {post.tags.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: 'var(--spacing-xl)',
            }}>
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  style={{
                    backgroundColor: '#2D5A8715',
                    color: 'var(--color-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--border-radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: '500',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div style={{
          lineHeight: '1.8',
          color: 'var(--color-text)',
        }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <footer style={{
          marginTop: '4rem',
          paddingTop: 'var(--spacing-xl)',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--border-radius-lg)',
            padding: 'var(--spacing-xl)',
            marginBottom: 'var(--spacing-xl)',
          }}>
            <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }}>
              About the Author
            </h3>
            <p style={{ margin: 0 }}>
              Professional therapeutic coach dedicated to helping individuals navigate 
              life&apos;s challenges and discover their inner strength.
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 'var(--spacing-lg)',
            flexWrap: 'wrap',
          }}>
            <Link href="/blog" className="btn-primary">
              ← All Posts
            </Link>
            <Link href="/#contact" className="btn-primary">
              Get In Touch →
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}