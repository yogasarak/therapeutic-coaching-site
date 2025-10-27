import styled from 'styled-components'

export const FilterContainer = styled.div`
  margin-top: 1.5rem;
`

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export const FilterLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.colors.text};
`

export const ToggleButton = styled.button`
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

export const ClearFilters = styled.button`
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

export const TagsGrid = styled.div<{ readonly $isVisible: boolean }>`
  display: ${props => (props.$isVisible ? 'flex' : 'none')};
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`

export const Tag = styled.button<{ readonly $isActive: boolean }>`
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

export const ActiveFiltersDisplay = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme.colors.primary}10;
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.primary};
`

export const ActiveFiltersText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`
