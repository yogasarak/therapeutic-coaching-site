'use client'

import React from 'react'
import {
  ActiveFiltersDisplay,
  ActiveFiltersText,
  ChipsGrid,
  ClearButton,
  FilterChip,
  FilterChipsContainer,
  FilterChipsHeader,
  FilterLabel,
  FilterToggleButton,
  ResultsText,
  SearchInput,
  SearchInputContainer,
  SearchInterfaceContainer,
} from './BlogSearchInterface.styles'

interface BlogSearchInterfaceProps {
  readonly searchValue: string
  readonly onSearchChange: (value: string) => void
  readonly availableTags: ReadonlyArray<string>
  readonly selectedTags: ReadonlyArray<string>
  readonly onTagToggle: (tag: string) => void
  readonly onClearFilters: () => void
  readonly isFiltersVisible: boolean
  readonly onFilterToggle: () => void
  readonly totalResults: number
  readonly totalPosts: number
  readonly placeholder?: string
}

export const BlogSearchInterface: React.FC<BlogSearchInterfaceProps> = ({
  searchValue,
  onSearchChange,
  availableTags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  isFiltersVisible,
  onFilterToggle,
  totalResults,
  totalPosts,
  placeholder = "Search articles, topics, and insights..."
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  const hasActiveFilters = Boolean(searchValue.trim()) || selectedTags.length > 0
  const canonicalizeTag = (value: string): string | null => {
    const normalized = value.trim().toLowerCase()
    if (!normalized) {
      return null
    }
    if (normalized === 'audio session' || normalized === 'soundcloud') {
      return 'audio'
    }
    return normalized
  }

  return (
    <SearchInterfaceContainer>
      <FilterToggleButton
        onClick={onFilterToggle}
        type="button"
        aria-expanded={isFiltersVisible}
      >
        {isFiltersVisible ? '✕ Hide topics' : '🏷 Browse by topic'}
      </FilterToggleButton>

      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search blog posts"
        />
      </SearchInputContainer>

      {isFiltersVisible && (
        <FilterChipsContainer>
          <FilterChipsHeader>
            <FilterLabel>Browse by topic</FilterLabel>
            {selectedTags.length > 0 && (
              <ClearButton onClick={onClearFilters} type="button">
                Clear selection
              </ClearButton>
            )}
          </FilterChipsHeader>
          
          <ChipsGrid>
            {availableTags.map(rawTag => {
              const tag = canonicalizeTag(rawTag)
              if (!tag) {
                return null
              }
              const isActive = selectedTags.includes(tag)

              return (
                <FilterChip
                  key={tag}
                  $isActive={isActive}
                  onClick={() => onTagToggle(tag)}
                  type="button"
                  aria-pressed={isActive}
                >
                  {tag}
                </FilterChip>
              )
            })}
          </ChipsGrid>

          {selectedTags.length > 0 && (
            <ActiveFiltersDisplay>
              <ActiveFiltersText>
                Selected: {selectedTags.join(', ')}
              </ActiveFiltersText>
            </ActiveFiltersDisplay>
          )}
        </FilterChipsContainer>
      )}

      {hasActiveFilters && (
        <ResultsText>
          Showing {totalResults} matching {totalResults === 1 ? 'article' : 'articles'}
          {searchValue.trim() && <> for &ldquo;{searchValue.trim()}&rdquo;</>}
        </ResultsText>
      )}
    </SearchInterfaceContainer>
  )
}

export default BlogSearchInterface
