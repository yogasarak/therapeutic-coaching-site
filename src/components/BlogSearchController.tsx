'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { BlogPost } from '@/types'
import BlogTopBar from './BlogTopBar'
import TagFilter from './TagFilter'
import SearchResults from './SearchResults'
import { SearchControllerContainer } from './BlogSearchController.styles'

interface BlogSearchControllerProps {
  readonly posts: ReadonlyArray<BlogPost>
  readonly onFilteredPostsChange: (posts: ReadonlyArray<BlogPost>) => void
  readonly title?: string
  readonly subtitle?: string
  readonly searchPlaceholder?: string
}

export const BlogSearchController: React.FC<BlogSearchControllerProps> = ({
  posts,
  onFilteredPostsChange,
  title,
  subtitle,
  searchPlaceholder = "Search blog posts by title, content, or tags..."
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

  const hasActiveFilters = Boolean(searchQuery.trim()) || selectedTags.length > 0

  return (
    <SearchControllerContainer>
      <BlogTopBar
        title={title}
        subtitle={subtitle}
        searchValue={searchQuery}
        onSearchChange={handleSearchChange}
        onFilterToggle={handleFilterToggle}
        isFiltersVisible={isFiltersVisible}
        searchPlaceholder={searchPlaceholder}
      />
      
      {isFiltersVisible && (
        <TagFilter
          availableTags={allTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearFilters={handleClearFilters}
          showFiltersInitially={true}
        />
      )}

      <SearchResults
        totalResults={filteredPosts.length}
        totalPosts={posts.length}
        hasActiveFilters={hasActiveFilters}
        activeFilters={{
          searchQuery: searchQuery.trim() || undefined,
          selectedTags: selectedTags.length > 0 ? selectedTags : undefined
        }}
        showEmptyState={false}
      />
    </SearchControllerContainer>
  )
}

export default BlogSearchController
