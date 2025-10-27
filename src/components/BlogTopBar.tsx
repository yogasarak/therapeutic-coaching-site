'use client'

import React from 'react'
import BlogHeader from './BlogHeader'
import BlogSearchBar from './BlogSearchBar'
import {
  HeaderSection,
  SearchSection,
  TopBarContainer,
} from './BlogTopBar.styles'

interface BlogTopBarProps {
  readonly title?: string
  readonly subtitle?: string
  readonly searchValue: string
  readonly onSearchChange: (value: string) => void
  readonly onFilterToggle: () => void
  readonly isFiltersVisible: boolean
  readonly searchPlaceholder?: string
  readonly className?: string
}

export const BlogTopBar: React.FC<BlogTopBarProps> = ({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  onFilterToggle,
  isFiltersVisible,
  searchPlaceholder,
  className
}) => {
  return (
    <TopBarContainer className={className}>
      <HeaderSection>
        <BlogHeader title={title} subtitle={subtitle} />
      </HeaderSection>
      <SearchSection>
        <BlogSearchBar
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onFilterToggle={onFilterToggle}
          isFiltersVisible={isFiltersVisible}
          placeholder={searchPlaceholder}
        />
      </SearchSection>
    </TopBarContainer>
  )
}

export default BlogTopBar
