'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import BlogSearchController from './BlogSearchController'
import BlogCard from './BlogCard'

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: ${props => props.theme.colors.textMuted};

  p {
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
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

interface BlogGridPageProps {
  readonly posts: ReadonlyArray<BlogPost>
}

const BlogGridPage: React.FC<BlogGridPageProps> = ({ posts }) => {
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
        
        {/* <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogSubtitle>
            Insights on personal growth, healing, and the therapeutic journey
          </BlogSubtitle>
        </BlogHeader> */}

        {/* <ViewToggle>
          <ToggleButton href="/blog" $isActive={true}>
            Card View
          </ToggleButton>
          <ToggleButton href="/blog/list" $isActive={false}>
            List View
          </ToggleButton>
        </ViewToggle> */}

        <BlogSearchController 
          posts={posts} 
          onFilteredPostsChange={handleFilteredPostsChange}
          title="Blog"
          subtitle="Insights on personal growth, healing, and the therapeutic journey"
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
              <BlogCard key={post.slug} post={post} />
            ))}
          </BlogGrid>
        )}
      </Container>
    </BlogContainer>
  )
}

export default BlogGridPage