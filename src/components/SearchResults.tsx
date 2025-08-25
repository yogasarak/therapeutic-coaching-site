'use client'

import React from 'react'
import styled from 'styled-components'

const ResultsContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`

const ResultsText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textMuted};

  p {
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
  }

  small {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textMuted};
  }
`

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