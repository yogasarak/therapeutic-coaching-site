'use client'

import React, { useState, useCallback, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import BlogConsumerController from './BlogConsumerController'
import BlogCard from './BlogCard'
import PersonalizedCard, { PersonalizedCardData } from '../features/client-portal/PersonalizedCard'
import PersonalizedCardModal from '../features/client-portal/PersonalizedCardModal'
import SocialIcons from '../features/social/SocialIcons'
import { samplePersonalizedCards } from '../features/client-portal/sampleData'

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

const SocialSection = styled.aside`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 10;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    right: 1rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    transform: none;
    margin: 2rem auto;
    width: fit-content;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 1rem 0;
  }
`

const SocialLabel = styled.p`
  margin: 0 0 0.75rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 1rem;
  }
`

interface BlogGridPageProps {
  readonly posts: ReadonlyArray<BlogPost>
}

const BlogGridPage: React.FC<BlogGridPageProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<ReadonlyArray<BlogPost>>(posts)
  const [selectedCard, setSelectedCard] = useState<PersonalizedCardData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const socialLinks = [
    { platform: 'instagram' as const, url: 'https://instagram.com/yourcoachingpractice', label: 'Follow on Instagram' },
    { platform: 'facebook' as const, url: 'https://facebook.com/yourcoachingpractice', label: 'Like on Facebook' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/company/yourcoachingpractice', label: 'Connect on LinkedIn' },
    { platform: 'personal' as const, url: 'https://yourcoachingwebsite.com', label: 'Visit Website' }
  ]

  // Update filtered posts when posts prop changes
  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  const handleFilteredPostsChange = useCallback((newFilteredPosts: ReadonlyArray<BlogPost>) => {
    setFilteredPosts(newFilteredPosts)
  }, [])

  const handleCardClick = useCallback((card: PersonalizedCardData) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false)
    setSelectedCard(null)
  }, [])

  return (
    <BlogContainer>
      <SocialSection>
        <SocialLabel>Follow</SocialLabel>
        <SocialIcons 
          links={socialLinks}
          size="small"
          spacing="tight"
          color="default"
          layout="vertical"
        />
      </SocialSection>
      
      <Container>
        {/* Back to Home Link - Commented out for better consumer app UX
            Future use: Can be re-enabled by uncommenting the BackLink below
            Provides navigation back to homepage from blog pages
            <BackLink href="/">← Back to Home</BackLink>
        */}
        
        {/* <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogSubtitle>
            Insights on personal growth, healing, and the therapeutic journey
          </BlogSubtitle>
        </BlogHeader> */}

        {/* View Toggle Buttons - Commented out for simplified consumer UX
            Future use: Toggle between card and list view layouts
            <ViewToggle>
              <ToggleButton href="/blog" $isActive={true}>
                Card View
              </ToggleButton>
              <ToggleButton href="/blog/list" $isActive={false}>
                List View
              </ToggleButton>
            </ViewToggle>
        */}

        <BlogConsumerController 
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
          <>
            {/* Demo: Personalized Cards for Client Portal */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ 
                textAlign: 'center', 
                marginBottom: '2rem', 
                color: '#666',
                fontSize: '1.1rem',
                fontWeight: '500'
              }}>
                Demo: Personalized Client Cards (Click to open modal)
              </h3>
              <BlogGrid>
                {samplePersonalizedCards.map(card => (
                  <PersonalizedCard 
                    key={card.id} 
                    card={card} 
                    onClick={handleCardClick}
                  />
                ))}
              </BlogGrid>
            </div>

            <BlogGrid>
              {filteredPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </BlogGrid>
          </>
        )}

        <PersonalizedCardModal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </Container>
    </BlogContainer>
  )
}

export default BlogGridPage