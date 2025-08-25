'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import { formatDate, isReducedMotion } from '@/utils'

interface BlogListPageProps {
  readonly posts: ReadonlyArray<BlogPost>
}

const BlogContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`

const BlogContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  }
`

const BlogHeader = styled.header`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xxl};
`

const BlogTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`

const BlogSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
`

const PostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xxl};
`

const PostCard = styled.article`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.xl};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`

const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.2s ease'
  };

  &:hover {
    transform: ${props => isReducedMotion() ? 'none' : 'translateX(4px)'};
  }
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`

const PostTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  font-size: 1.8rem;
  line-height: 1.3;
  
  ${PostLink}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`

const PostExcerpt = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`

const PostTag = styled.span`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xxl};
  color: ${props => props.theme.colors.textMuted};
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: 500;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.2s ease'
  };

  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: ${props => isReducedMotion() ? 'none' : 'translateX(-2px)'};
  }
`

const BlogListPage: React.FC<BlogListPageProps> = ({ posts }) => {
  return (
    <BlogContainer>
      <BlogContent>
        <BackLink href="/">← Back to Home</BackLink>
        
        <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogSubtitle>
            Insights on personal growth, healing, and the therapeutic journey
          </BlogSubtitle>
        </BlogHeader>

        {posts.length === 0 ? (
          <EmptyState>
            <p>No blog posts yet. Check back soon for insights on personal growth and therapeutic coaching!</p>
          </EmptyState>
        ) : (
          <PostsList>
            {posts.map(post => (
              <PostCard key={post.slug}>
                <PostLink href={`/blog/${post.slug}`}>
                  <PostMeta>
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </PostMeta>
                  
                  <PostTitle>{post.title}</PostTitle>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  
                  {post.tags.length > 0 && (
                    <PostTags>
                      {post.tags.map(tag => (
                        <PostTag key={tag}>{tag}</PostTag>
                      ))}
                    </PostTags>
                  )}
                </PostLink>
              </PostCard>
            ))}
          </PostsList>
        )}
      </BlogContent>
    </BlogContainer>
  )
}

export default BlogListPage