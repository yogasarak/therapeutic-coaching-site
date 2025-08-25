'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import { formatDate, isReducedMotion } from '@/utils'

interface BlogPostPageProps {
  readonly post: BlogPost
}

const PostContainer = styled.article`
  min-height: 100vh;
  padding-top: 80px;
`

const PostContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.md};
  }
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

const PostHeader = styled.header`
  margin-bottom: ${props => props.theme.spacing.xxl};
  text-align: center;
`

const PostTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  line-height: 1.2;
`

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: 0.95rem;
  color: ${props => props.theme.colors.textMuted};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.xs};
  }
`

const PostTags = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.xl};
`

const PostTag = styled.span`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`

const PostBody = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};

  h2 {
    margin-top: ${props => props.theme.spacing.xxl};
    margin-bottom: ${props => props.theme.spacing.lg};
    color: ${props => props.theme.colors.primary};
  }

  h3 {
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.lg};
    font-size: 1.1rem;
  }

  img {
    border-radius: ${props => props.theme.borderRadius.lg};
    box-shadow: ${props => props.theme.shadows.md};
    margin: ${props => props.theme.spacing.xl} 0;
  }

  audio {
    width: 100%;
    margin: ${props => props.theme.spacing.xl} 0;
    border-radius: ${props => props.theme.borderRadius.md};
  }

  blockquote {
    font-size: 1.2rem;
    font-style: italic;
    margin: ${props => props.theme.spacing.xl} 0;
    padding-left: ${props => props.theme.spacing.lg};
    border-left: 4px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textMuted};
  }

  ul, ol {
    margin-bottom: ${props => props.theme.spacing.lg};
    padding-left: ${props => props.theme.spacing.lg};
    
    li {
      margin-bottom: ${props => props.theme.spacing.sm};
      font-size: 1.1rem;
    }
  }

  code {
    background-color: ${props => props.theme.colors.surface};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9em;
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  }

  pre {
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.lg} 0;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
`

const PostFooter = styled.footer`
  margin-top: ${props => props.theme.spacing.xxl};
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`

const AuthorInfo = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.textMuted};
    margin: 0;
  }
`

const NavLinks = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`

const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.2s ease'
  };

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: ${props => isReducedMotion() ? 'none' : 'translateY(-2px)'};
  }
`


const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  return (
    <PostContainer>
      <PostContent>
        <BackLink href="/blog">← Back to Blog</BackLink>
        
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          
          <PostMeta>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </PostMeta>
          
          {post.tags.length > 0 && (
            <PostTags>
              {post.tags.map(tag => (
                <PostTag key={tag}>{tag}</PostTag>
              ))}
            </PostTags>
          )}
        </PostHeader>

        <PostBody>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </PostBody>

        <PostFooter>
          <AuthorInfo>
            <h3>About the Author</h3>
            <p>
              Professional therapeutic coach dedicated to helping individuals navigate 
              life&apos;s challenges and discover their inner strength through personalized, 
              evidence-based coaching approaches.
            </p>
          </AuthorInfo>

          <NavLinks>
            <NavLink href="/blog">← All Posts</NavLink>
            <NavLink href="/#contact">Get In Touch →</NavLink>
          </NavLinks>
        </PostFooter>
      </PostContent>
    </PostContainer>
  )
}

export default BlogPostPage