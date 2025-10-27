'use client'

import React from 'react'
import { BlogPost } from '@/types'
import { formatDate, slugify } from '@/utils'
import { mapTagToType } from '@/utils/tags'
import {
  BlogCard,
  BlogCardContent,
  BlogCardExcerpt,
  BlogCardLink,
  BlogCardMeta,
  BlogCardTags,
  BlogCardTitle,
  BlogContainer,
  BlogContent,
  BlogHeader,
  BlogSubtitle,
  BlogTag,
  BlogTitle,
  BlogTypeBadge,
  BlogGrid,
  EmptyState,
  ViewAllLink,
} from './BlogSection.styles'

interface BlogSectionProps {
  readonly posts: ReadonlyArray<BlogPost>
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const displayPosts = posts.slice(0, 3)

  return (
    <BlogContainer id="blog">
      <BlogContent>
        <BlogHeader>
          <BlogTitle>Latest Insights</BlogTitle>
          <BlogSubtitle>
            Thoughts on personal growth, healing, and the therapeutic journey
          </BlogSubtitle>
        </BlogHeader>

        {displayPosts.length === 0 ? (
          <EmptyState>
            <p>Blog posts coming soon! Check back for insights on personal growth and therapeutic coaching.</p>
          </EmptyState>
        ) : (
          <>
            <BlogGrid>
              {displayPosts.map(post => (
                <BlogCard key={post.slug}>
                  <BlogCardLink href={`/blog/${post.slug}`}>
                    <BlogCardContent>
                      <BlogCardMeta>
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </BlogCardMeta>
                      
                      <BlogCardTitle>{post.title}</BlogCardTitle>
                      <BlogCardExcerpt>{post.excerpt}</BlogCardExcerpt>
                      
                      {post.tags.length > 0 && (
                        <BlogCardTags>
                          {post.tags.slice(0, 3).map(tag => {
                            const type = mapTagToType(tag)
                            return type ? (
                              <BlogTypeBadge key={tag} $type={type}>{tag}</BlogTypeBadge>
                            ) : (
                              <BlogTag key={tag}>{tag}</BlogTag>
                            )
                          })}
                        </BlogCardTags>
                      )}
                    </BlogCardContent>
                  </BlogCardLink>
                </BlogCard>
              ))}
            </BlogGrid>

            <div style={{ textAlign: 'center' }}>
              <ViewAllLink href="/blog">
                View All Posts →
              </ViewAllLink>
            </div>
          </>
        )}
      </BlogContent>
    </BlogContainer>
  )
}

export default BlogSection
