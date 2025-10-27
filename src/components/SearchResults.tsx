'use client'

import React from 'react'
import { EmptyState, ResultsContainer, ResultsText } from './SearchResults.styles'

interface SearchResultsProps {
  readonly totalResults: number
  readonly totalPosts: number
  readonly hasActiveFilters: boolean
  readonly activeFilters?: {
    readonly searchQuery?: string
    readonly selectedTags?: ReadonlyArray<string>
  }
  readonly showEmptyState?: boolean
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  totalResults,
  totalPosts,
  hasActiveFilters,
  activeFilters,
  showEmptyState = false
}) => {
  if (showEmptyState) {
    return (
      <EmptyState>
        <p>
          {totalPosts === 0 
            ? "No blog posts yet. Check back soon!" 
            : "No posts match your search criteria."
          }
        </p>
        {hasActiveFilters && totalPosts > 0 && (
          <small>Try adjusting your search terms or clearing the filters.</small>
        )}
      </EmptyState>
    )
  }

  if (!hasActiveFilters) {
    return null
  }

  return (
    <ResultsContainer>
      <ResultsText>
        Showing {totalResults} of {totalPosts} posts
        {activeFilters?.searchQuery && (
          <> • Search: &ldquo;{activeFilters.searchQuery}&rdquo;</>
        )}
        {activeFilters?.selectedTags && activeFilters.selectedTags.length > 0 && (
          <> • Tags: {activeFilters.selectedTags.join(', ')}</>
        )}
      </ResultsText>
    </ResultsContainer>
  )
}

export default SearchResults
