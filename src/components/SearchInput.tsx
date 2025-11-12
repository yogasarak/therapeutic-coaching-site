'use client'

import React from 'react'
import { Input, SearchInputContainer } from './SearchInput.styles'

interface SearchInputProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder?: string
  readonly ariaLabel?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  ariaLabel = "Search"
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <SearchInputContainer>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        aria-label={ariaLabel}
      />
    </SearchInputContainer>
  )
}

export default SearchInput
