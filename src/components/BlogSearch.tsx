'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { BlogPost } from '@/types'
import SearchInput from './SearchInput'
import TagFilter from './TagFilter'
import SearchResults from './SearchResults'
import { SearchContainer } from './BlogSearch.styles'

interface BlogSearchProps {
  readonly posts: ReadonlyArray<BlogPost>
  readonly onFilteredPostsChange: (posts: ReadonlyArray<BlogPost>) => void
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ posts, onFilteredPostsChange }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>([])

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

  const hasActiveFilters = Boolean(searchQuery.trim()) || selectedTags.length > 0

  return (
    <SearchContainer>
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search blog posts by title, content, or tags..."
        ariaLabel="Search blog posts"
      />
      
      <TagFilter
        availableTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
        showFiltersInitially={false}
      />

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
    </SearchContainer>
  )
}

export default BlogSearch
