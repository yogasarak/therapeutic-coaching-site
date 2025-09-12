'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import { formatDate } from '@/utils'
import BlogSearch from './BlogSearch'

const BlogContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 4rem ${props => props.theme.spacing.md};
  }
`

const BlogContainer800 = styled(Container)`
  max-width: 800px;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`

const BlogHeader = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`

const BlogTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.secondary};
`

const BlogSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

const BlogGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`

const BlogArticle = styled.article`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.xl};

  &:last-child {
    border-bottom: none;
  }
`

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`

const BlogPostTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 1.8rem;
  line-height: 1.3;
  font-family: ${props => props.theme.fonts.secondary};
`

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`

const TagsContainerWithTopMargin = styled(TagsContainer)`
  margin-top: 2rem;
`

const Tag = styled.span`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`

const PostContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul, ol {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.lg};
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.lg} 0;
    font-style: italic;
    color: ${props => props.theme.colors.textMuted};
  }

  code {
    background-color: ${props => props.theme.colors.surface};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;

    code {
      background-color: transparent;
      padding: 0;
    }
  }
`

const PostFooter = styled.footer`
  margin-top: 4rem;
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`

const AuthorBox = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    margin: 0;
  }
`

const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`

const CardLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: block;
`

const PrimaryLinkButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${props => props.theme.colors.textMuted};
`

const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
`

const ToggleButton = styled(Link)<{ readonly $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.$isActive 
      ? props.theme.colors.primary 
      : 'transparent'
  };
  color: ${props => 
    props.$isActive 
      ? props.theme.colors.background 
      : props.theme.colors.primary
  };
  border: 1px solid ${props => props.theme.colors.primary};

  &:hover {
    background-color: ${props => 
      props.$isActive 
        ? props.theme.colors.accent 
        : props.theme.colors.primary + '15'
    };
  }
`

interface BlogListPageProps {
  readonly posts: ReadonlyArray<BlogPost>
  readonly showViewToggle?: boolean
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ posts, showViewToggle = false }) => {
  const [filteredPosts, setFilteredPosts] = useState<ReadonlyArray<BlogPost>>(posts)

  // Update filtered posts when posts prop changes
  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  const handleFilteredPostsChange = useCallback((newFilteredPosts: ReadonlyArray<BlogPost>) => {
    setFilteredPosts(newFilteredPosts)
  }, [])

  return (
    <BlogContainer>
      <Container>
        <BackLink href="/">← Back to Home</BackLink>
        
        <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogSubtitle>
            Insights on personal growth, healing, and the therapeutic journey
          </BlogSubtitle>
        </BlogHeader>

        {showViewToggle && (
          <ViewToggle>
            <ToggleButton href="/blog" $isActive={false}>
              Card View
            </ToggleButton>
            <ToggleButton href="/blog/list" $isActive={true}>
              List View
            </ToggleButton>
          </ViewToggle>
        )}

        <BlogSearch 
          posts={posts} 
          onFilteredPostsChange={handleFilteredPostsChange}
        />

        {filteredPosts.length === 0 ? (
          <EmptyState>
            <p>
              {posts.length === 0 
                ? "No blog posts yet. Check back soon!" 
                : "No posts match your search criteria. Try adjusting your filters."
              }
            </p>
          </EmptyState>
        ) : (
          <BlogGrid>
            {filteredPosts.map(post => (
              <BlogArticle key={post.slug}>
                <CardLink href={`/blog/${post.slug}`}>
                  <BlogMeta>
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </BlogMeta>
                  
                  <BlogPostTitle>{post.title}</BlogPostTitle>
                  
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  
                  {post.tags.length > 0 && (
                    <TagsContainer>
                      {post.tags.slice(0, 3).map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagsContainer>
                  )}
                </CardLink>
              </BlogArticle>
            ))}
          </BlogGrid>
        )}
      </Container>
    </BlogContainer>
  )
}

interface BlogPostPageProps {
  readonly post: BlogPost
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
  return (
    <BlogContainer>
      <BlogContainer800>
        <BackLink href="/blog">← Back to Blog</BackLink>
        
        <BlogHeader>
          <BlogTitle>{post.title}</BlogTitle>
          
          <BlogMeta>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </BlogMeta>
          
          {post.tags.length > 0 && (
            <TagsContainerWithTopMargin>
              {post.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagsContainerWithTopMargin>
          )}
        </BlogHeader>

        <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

        <PostFooter>
          <AuthorBox>
            <h3>About the Author</h3>
            <p>
              Professional therapeutic coach dedicated to helping individuals navigate 
              life&apos;s challenges and discover their inner strength.
            </p>
          </AuthorBox>

          <FooterActions>
            <PrimaryLinkButton href="/blog">
              ← All Posts
            </PrimaryLinkButton>
            <PrimaryLinkButton href="/#contact">
              Get In Touch →
            </PrimaryLinkButton>
          </FooterActions>
        </PostFooter>
      </BlogContainer800>
    </BlogContainer>
  )
}
