'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import { formatDate, isReducedMotion } from '@/utils'

interface BlogSectionProps {
  readonly posts: ReadonlyArray<BlogPost>
}

const BlogContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.background};
`

const BlogContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`

const BlogTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`

const BlogSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const BlogCard = styled.article`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: ${props => isReducedMotion() ? 'none' : 'translateY(-4px)'};
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const BlogCardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

const BlogCardContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
`

const BlogCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`

const BlogCardTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  line-height: 1.3;
`

const BlogCardExcerpt = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const BlogCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`

const BlogTag = styled.span`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`

const ViewAllLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  color: white;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 600;
  margin-top: ${props => props.theme.spacing.xl};
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:hover {
    transform: ${props => isReducedMotion() ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.theme.shadows.md};
    color: white;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textMuted};
`

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
                          {post.tags.slice(0, 3).map(tag => (
                            <BlogTag key={tag}>{tag}</BlogTag>
                          ))}
                        </BlogCardTags>
                      )}
                    </BlogCardContent>
                  </BlogCardLink>
                </BlogCard>
              ))}
            </BlogGrid>

            <Centered>
              <ViewAllLink href="/blog">
                View All Posts →
              </ViewAllLink>
            </Centered>
          </>
        )}
      </BlogContent>
    </BlogContainer>
  )
}

export default BlogSection

const Centered = styled.div`
  text-align: center;
`
