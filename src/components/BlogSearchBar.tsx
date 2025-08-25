'use client'

import React from 'react'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const SearchInput = styled.input`
  width: 350px;
  padding: 0.875rem 1.25rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 280px;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    min-width: 200px;
  }
`

const FilterToggleButton = styled.button`
  background: none;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.875rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary}15;
    border-color: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.accent};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}30;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 0.875rem;
    font-size: 0.8rem;
  }
`

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