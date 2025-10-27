'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { BlogPost } from '@/types'
import BlogHeader from './BlogHeader'
import BlogSearchInterface from './BlogSearchInterface'
import { ConsumerControllerContainer } from './BlogConsumerController.styles'

interface BlogConsumerControllerProps {
  readonly posts: ReadonlyArray<BlogPost>
  readonly onFilteredPostsChange: (posts: ReadonlyArray<BlogPost>) => void
  readonly title?: string
  readonly subtitle?: string
  readonly onHasActiveFiltersChange?: (hasActive: boolean) => void
  readonly additionalTags?: ReadonlyArray<string>
  readonly onFilterCriteriaChange?: (criteria: {
    readonly searchQuery: string
    readonly selectedTags: ReadonlyArray<string>
  }) => void
}

export const BlogConsumerController: React.FC<BlogConsumerControllerProps> = ({
  posts,
  onFilteredPostsChange,
  title = "Blog",
  subtitle = "Insights on personal growth, healing, and the therapeutic journey",
  onHasActiveFiltersChange,
  additionalTags,
  onFilterCriteriaChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>([])
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const canonicalizeTag = useCallback((value: string): string | null => {
    const normalized = value.trim().toLowerCase()
    if (!normalized) {
      return null
    }

    if (normalized === 'audio session' || normalized === 'soundcloud') {
      return 'audio'
    }

    return normalized
  }, [])

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagMap = new Map<string, string>()
    const addTag = (value: string) => {
      const canonical = canonicalizeTag(value)
      if (!canonical) {
        return
      }
      if (!tagMap.has(canonical)) {
        tagMap.set(canonical, canonical)
      }
    }

    posts.forEach(post => {
      post.tags.forEach(addTag)
    })
    additionalTags?.forEach(addTag)

    return Array.from(tagMap.values()).sort()
  }, [posts, additionalTags, canonicalizeTag])

  const displayTags = useMemo(
    () => allTags.filter(tag => tag !== 'modal'),
    [allTags]
  )

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    let filtered = posts

    // Filter by search query (search in title, excerpt, and tags)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(selectedTag => {
          const normalizedSelected = selectedTag.toLowerCase()
          return post.tags.some(postTag => 
            postTag.toLowerCase() === normalizedSelected
          )
        }
        )
      )
    }

    return filtered
  }, [posts, searchQuery, selectedTags])

  // Update parent component when filtered posts change
  React.useEffect(() => {
    onFilteredPostsChange(filteredPosts)
  }, [filteredPosts, onFilteredPostsChange])

  // Surface current filter criteria to parent consumers
  React.useEffect(() => {
    onFilterCriteriaChange?.({
      searchQuery,
      selectedTags,
    })
  }, [searchQuery, selectedTags, onFilterCriteriaChange])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleTagToggle = useCallback((tag: string) => {
    const normalizedTag = canonicalizeTag(tag)
    if (!normalizedTag) {
      return
    }
    setSelectedTags(prev => {
      const isSelected = prev.includes(normalizedTag)
      if (isSelected) {
        return prev.filter(t => t !== normalizedTag)
      } else {
        return [...prev, normalizedTag]
      }
    })
  }, [canonicalizeTag])

  const handleClearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedTags([])
  }, [])

  const handleFilterToggle = useCallback(() => {
    setIsFiltersVisible(prev => !prev)
  }, [])

  // Let parent know when any filters are active (sync with UI state)
  const hasActiveFilters = Boolean(searchQuery.trim()) || selectedTags.length > 0
  React.useEffect(() => {
    onHasActiveFiltersChange?.(hasActiveFilters)
  }, [hasActiveFilters, onHasActiveFiltersChange])

  return (
    <ConsumerControllerContainer>
      <BlogHeader title={title} subtitle={subtitle} />
      
      <BlogSearchInterface
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        availableTags={displayTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
        isFiltersVisible={isFiltersVisible}
        onFilterToggle={handleFilterToggle}
        totalResults={filteredPosts.length}
        totalPosts={posts.length}
        placeholder="Search articles, topics, and insights..."
      />
    </ConsumerControllerContainer>
  )
}

export default BlogConsumerController
