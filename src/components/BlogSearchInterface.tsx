'use client'

import React from 'react'
import styled from 'styled-components'

const SearchInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`

const FilterToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}10;
  }

  &:focus {
    outline: none;
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.primary}15;
  }
`

const SearchInputContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1.1rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 0 0 3px ${props => props.theme.colors.primary}20;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
    padding: 0.875rem 1.25rem;
  }
`

const FilterChipsContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin-top: 1rem;
`

const FilterChipsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const FilterLabel = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.accent};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`

const FilterChip = styled.button<{ readonly $isActive: boolean }>`
  background-color: ${props => 
    props.$isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.surface || props.theme.colors.background
  };
  color: ${props => 
    props.$isActive 
      ? props.theme.colors.background
      : props.theme.colors.text
  };
  border: 2px solid ${props => 
    props.$isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.border
  };
  padding: 0.6rem 1.2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: ${props => 
      props.$isActive 
        ? props.theme.colors.accent
        : props.theme.colors.primary + '15'
    };
    border-color: ${props => 
      props.$isActive 
        ? props.theme.colors.accent 
        : props.theme.colors.primary
    };
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}30;
  }
`

const ActiveFiltersDisplay = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}08, ${props => props.theme.colors.accent}08);
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
`

const ActiveFiltersText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`

const ResultsText = styled.p`
  margin: 1rem 0 0 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
`

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
            {availableTags.map(tag => (
              <FilterChip
                key={tag}
                $isActive={selectedTags.includes(tag)}
                onClick={() => onTagToggle(tag)}
                type="button"
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </FilterChip>
            ))}
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
          {totalResults} of {totalPosts} articles
          {searchValue.trim() && <> matching &ldquo;{searchValue.trim()}&rdquo;</>}
        </ResultsText>
      )}
    </SearchInterfaceContainer>
  )
}

export default BlogSearchInterface