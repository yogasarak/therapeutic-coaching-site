'use client'

import React from 'react'
import {
  ActiveFiltersDisplay,
  ActiveFiltersText,
  ClearFilters,
  FilterContainer,
  FilterHeader,
  FilterLabel,
  Tag,
  TagsGrid,
  ToggleButton,
} from './TagFilter.styles'

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
