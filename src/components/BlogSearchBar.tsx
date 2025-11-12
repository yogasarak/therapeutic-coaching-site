'use client'

import React from 'react'
import {
  FilterToggleButton,
  SearchBarContainer,
  SearchInput,
} from './BlogSearchBar.styles'

interface BlogSearchBarProps {
  readonly searchValue: string
  readonly onSearchChange: (value: string) => void
  readonly onFilterToggle: () => void
  readonly isFiltersVisible: boolean
  readonly placeholder?: string
  readonly className?: string
}

export const BlogSearchBar: React.FC<BlogSearchBarProps> = ({
  searchValue,
  onSearchChange,
  onFilterToggle,
  isFiltersVisible,
  placeholder = "Search blog posts...",
  className
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value)
  }

  return (
    <SearchBarContainer className={className}>
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleSearchChange}
        aria-label="Search blog posts"
      />
      <FilterToggleButton
        onClick={onFilterToggle}
        type="button"
        aria-expanded={isFiltersVisible}
      >
        {isFiltersVisible ? 'Hide filters' : 'Show filters'}
      </FilterToggleButton>
    </SearchBarContainer>
  )
}

export default BlogSearchBar
