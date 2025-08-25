'use client'

import React from 'react'
import styled from 'styled-components'

const FilterContainer = styled.div`
  margin-top: 1.5rem;
`

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const FilterLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.colors.text};
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.accent};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    color: ${props => props.theme.colors.primary};
  }
`

const ClearFilters = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.accent};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &:focus {
    outline: none;
    color: ${props => props.theme.colors.primary};
  }
`

const TagsGrid = styled.div<{ readonly $isVisible: boolean }>`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`

const Tag = styled.button<{ readonly $isActive: boolean }>`
  background-color: ${props => 
    props.$isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.primary + '15'
  };
  color: ${props => 
    props.$isActive 
      ? props.theme.colors.background
      : props.theme.colors.primary
  };
  border: 2px solid ${props => 
    props.$isActive 
      ? props.theme.colors.primary 
      : 'transparent'
  };
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => 
      props.$isActive 
        ? props.theme.colors.accent
        : props.theme.colors.primary + '25'
    };
    border-color: ${props => 
      props.$isActive 
        ? props.theme.colors.accent 
        : props.theme.colors.primary + '50'
    };
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}30;
  }
`

const ActiveFiltersDisplay = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme.colors.primary}10;
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.primary};
`

const ActiveFiltersText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`

interface TagFilterProps {
  readonly availableTags: ReadonlyArray<string>
  readonly selectedTags: ReadonlyArray<string>
  readonly onTagToggle: (tag: string) => void
  readonly onClearFilters: () => void
  readonly showFiltersInitially?: boolean
}

export const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  showFiltersInitially = false
}) => {
  const [isFiltersVisible, setIsFiltersVisible] = React.useState(showFiltersInitially)
  const hasActiveFilters = selectedTags.length > 0

  const handleToggleFilters = () => {
    setIsFiltersVisible(prev => !prev)
  }

  return (
    <FilterContainer>
      <FilterHeader>
        <FilterLabel>
          Filter by topics
        </FilterLabel>
        <div>
          <ToggleButton
            onClick={handleToggleFilters}
            type="button"
            aria-expanded={isFiltersVisible}
          >
            {isFiltersVisible ? 'Hide filters' : 'Show filters'}
          </ToggleButton>
          {hasActiveFilters && (
            <>
              {' • '}
              <ClearFilters
                onClick={onClearFilters}
                type="button"
              >
                Clear all filters
              </ClearFilters>
            </>
          )}
        </div>
      </FilterHeader>

      {hasActiveFilters && (
        <ActiveFiltersDisplay>
          <ActiveFiltersText>
            Active filters: {selectedTags.join(', ')}
          </ActiveFiltersText>
        </ActiveFiltersDisplay>
      )}

      <TagsGrid $isVisible={isFiltersVisible}>
        {availableTags.map(tag => (
          <Tag
            key={tag}
            $isActive={selectedTags.includes(tag)}
            onClick={() => onTagToggle(tag)}
            type="button"
            aria-pressed={selectedTags.includes(tag)}
          >
            {tag}
          </Tag>
        ))}
      </TagsGrid>
    </FilterContainer>
  )
}

export default TagFilter