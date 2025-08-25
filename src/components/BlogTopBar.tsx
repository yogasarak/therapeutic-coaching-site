'use client'

import React from 'react'
import styled from 'styled-components'
import BlogHeader from './BlogHeader'
import BlogSearchBar from './BlogSearchBar'

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
`

const HeaderSection = styled.div`
  flex: 1;
  min-width: 0; /* Allow shrinking */
`

const SearchSection = styled.div`
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    align-self: stretch;
  }
`

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