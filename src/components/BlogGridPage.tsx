'use client'

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { BlogPost } from '@/types'
import BlogConsumerController from './BlogConsumerController'
import BlogCard from './BlogCard'
import PersonalizedCardModal from '@/features/client-portal/PersonalizedCardModal'
import type { PersonalizedCardData } from '@/features/client-portal/PersonalizedCard'
import { spotlightPractices } from '@/content/spotlights'
import { formatDate } from '@/utils'
import {
  BlogContainer,
  Container,
  BlogGrid,
  EmptyState,
  PracticeSection,
  PracticeHeader,
  PracticeGrid,
  PracticeCard,
  PracticeContent,
  PracticeBadgeRow,
  PracticeBadge,
  PracticeTitle,
  PracticeSubtitle,
  PracticeDescription,
  PracticeFooter,
  PracticeCTA,
} from './BlogGridPage.styles'

interface BlogGridPageProps {
  readonly posts: ReadonlyArray<BlogPost>
}

const practiceTypeLabels: Record<PersonalizedCardData['type'], string> = {
  personal: 'Personal Reflection',
  exercise: 'Guided Exercise',
  reflection: 'Deep Reflection',
  goal: 'Goal Focus',
  audio: 'Audio Session',
}

const PRACTICE_BASE_TAG = 'Practice Spotlight'
const PRACTICE_MODAL_TAG = 'Modal'

const canonicalizeTag = (value: string | undefined): string | null => {
  if (!value) {
    return null
  }

  const normalized = value.trim().toLowerCase()
  if (!normalized) {
    return null
  }

  if (normalized === 'audio session' || normalized === 'soundcloud') {
    return 'audio'
  }

  return normalized
}

const getPracticeTags = (card: PersonalizedCardData): ReadonlyArray<string> => {
  const tags = new Set<string>()
  const addTag = (value: string | undefined) => {
    const canonical = canonicalizeTag(value)
    if (canonical) {
      tags.add(canonical)
    }
  }

  addTag(PRACTICE_BASE_TAG)
  addTag(PRACTICE_MODAL_TAG)

  if (card.type === 'audio') {
    addTag('audio')
  } else {
    addTag(card.type)
    addTag(practiceTypeLabels[card.type])
  }

  if (card.mediaType === 'audio' || card.mediaType === 'soundcloud') {
    addTag('audio')
  } else {
    addTag(card.mediaType)
  }

  return Array.from(tags)
}

const BlogGridPage: React.FC<BlogGridPageProps> = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState<ReadonlyArray<BlogPost>>(posts)
  const [, setHasActiveFilters] = useState(false)
  const [selectedPractice, setSelectedPractice] = useState<PersonalizedCardData | null>(null)
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false)
  const sortedPractices = useMemo(
    () =>
      [...spotlightPractices].sort((a, b) => {
        const timeA = new Date(a.createdDate).getTime()
        const timeB = new Date(b.createdDate).getTime()
        return timeB - timeA
      }),
    []
  )
  const [filteredPractices, setFilteredPractices] = useState<ReadonlyArray<PersonalizedCardData>>(sortedPractices)

  const practiceTags = useMemo(() => {
    const tagSet = new Set<string>()
    sortedPractices.forEach(card => {
      getPracticeTags(card).forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [sortedPractices])

  // Update filtered posts when posts prop changes
  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])
  useEffect(() => {
    setFilteredPractices(sortedPractices)
  }, [sortedPractices])

  const handleFilteredPostsChange = useCallback((newFilteredPosts: ReadonlyArray<BlogPost>) => {
    setFilteredPosts(newFilteredPosts)
  }, [])

  const handlePracticeClick = useCallback((card: PersonalizedCardData) => {
    setSelectedPractice(card)
    setIsPracticeModalOpen(true)
  }, [])

  const handlePracticeClose = useCallback(() => {
    setSelectedPractice(null)
    setIsPracticeModalOpen(false)
  }, [])

  const handleFilterCriteriaChange = useCallback(
    ({ searchQuery, selectedTags }: { readonly searchQuery: string; readonly selectedTags: ReadonlyArray<string> }) => {
      const normalizedQuery = searchQuery.trim().toLowerCase()
      const normalizedTags = selectedTags.map(tag => tag.toLowerCase())

      const nextPractices = sortedPractices.filter(card => {
        const tags = getPracticeTags(card).map(tag => tag.toLowerCase())
        const matchesTags =
          normalizedTags.length === 0 || normalizedTags.some(tag => tags.includes(tag))

        if (!matchesTags) {
          return false
        }

        if (!normalizedQuery) {
          return true
        }

        const searchableFields = [
          card.title,
          card.subtitle,
          card.description,
          card.content,
          practiceTypeLabels[card.type],
        ].filter(Boolean) as ReadonlyArray<string>

        return searchableFields.some(field => field.toLowerCase().includes(normalizedQuery))
      })

      setFilteredPractices(nextPractices)
    },
    [sortedPractices]
  )

  // Removed demo modal behavior for production clarity

  return (
    <BlogContainer>
      {/* Floating social footer reserved for future use.
          To restore, re-enable the SocialSection block below with updated socials.
      */}
      {/*
      <SocialSection>
        <SocialLabel>Follow</SocialLabel>
        <SocialIcons 
          links={defaultSocialLinks}
          size="small"
          spacing="tight"
          color="default"
          layout="vertical"
        />
      </SocialSection>
      */}

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
          onHasActiveFiltersChange={setHasActiveFilters}
          additionalTags={practiceTags}
          onFilterCriteriaChange={handleFilterCriteriaChange}
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
            {/* Demo cards removed to avoid confusing blog filtering */}

            <BlogGrid>
              {filteredPosts.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </BlogGrid>
          </>
        )}

        {/* No demo modal */}
      </Container>

      <PracticeSection>
        <PracticeHeader>
          <h2>Therapeutic Practice Spotlights</h2>
          <p>
            A rotating selection of guided exercises and reflections I often share with clients. 
            Open any spotlight to experience the full practice.
          </p>
        </PracticeHeader>

        <PracticeGrid>
          {filteredPractices.map(card => (
            <PracticeCard key={card.id}>
              <PracticeContent type="button" onClick={() => handlePracticeClick(card)}>
                <PracticeBadgeRow>
                  <PracticeBadge $type={card.type}>{practiceTypeLabels[card.type]}</PracticeBadge>
                  {card.progress && <span>{card.progress}</span>}
                </PracticeBadgeRow>
                <PracticeTitle>{card.title}</PracticeTitle>
                {card.subtitle && <PracticeSubtitle>{card.subtitle}</PracticeSubtitle>}
                {card.description && <PracticeDescription>{card.description}</PracticeDescription>}
                <PracticeFooter>
                  <span>{formatDate(card.createdDate)}</span>
                  <PracticeCTA>View practice</PracticeCTA>
                </PracticeFooter>
              </PracticeContent>
            </PracticeCard>
          ))}
        </PracticeGrid>

        {filteredPractices.length === 0 && (
          <EmptyState>
            <p>No practice spotlights match your current filters.</p>
          </EmptyState>
        )}
      </PracticeSection>

      <PersonalizedCardModal
        card={selectedPractice}
        isOpen={isPracticeModalOpen}
        onClose={handlePracticeClose}
      />
    </BlogContainer>
  )
}

export default BlogGridPage
