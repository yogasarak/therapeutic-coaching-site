'use client'

import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import BlogHeader from './BlogHeader'
import BlogSearchInterface from './BlogSearchInterface'

const ConsumerControllerContainer = styled.div`
  padding-top: 2rem;
  margin-bottom: 3rem;
`

interface BlogConsumerControllerProps {
  readonly posts: ReadonlyArray<BlogPost>
  readonly onFilteredPostsChange: (posts: ReadonlyArray<BlogPost>) => void
  readonly title?: string
  readonly subtitle?: string
  readonly onHasActiveFiltersChange?: (hasActive: boolean) => void
}

export const BlogConsumerController: React.FC<BlogConsumerControllerProps> = ({
  posts,
  onFilteredPostsChange,
  title = "Blog",
  subtitle = "Insights on personal growth, healing, and the therapeutic journey",
  onHasActiveFiltersChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>([])
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

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
        selectedTags.some(selectedTag =>
          post.tags.some(postTag => 
            postTag.toLowerCase() === selectedTag.toLowerCase()
          )
        )
      )
    }

    return filtered
  }, [posts, searchQuery, selectedTags])

  // Update parent component when filtered posts change
  React.useEffect(() => {
    onFilteredPostsChange(filteredPosts)
  }, [filteredPosts, onFilteredPostsChange])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev => {
      const isSelected = prev.includes(tag)
      if (isSelected) {
        return prev.filter(t => t !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }, [])

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
        availableTags={allTags}
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
