import styled from 'styled-components'

export const SearchInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
`

export const FilterToggleButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.md};
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`

export const SearchInputContainer = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.95rem;
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  box-shadow: none;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 0.9rem;
    padding: 0.7rem 1rem;
  }
`

export const FilterChipsContainer = styled.div`
  width: 100%;
  max-width: 640px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FilterChipsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;
  width: 100%;
`

export const FilterLabel = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`

export const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: ${props => props.theme.colors.textMuted};
  }
`

export const ChipsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: flex-start;
  }
`

export const FilterChip = styled.button<{ readonly $isActive: boolean }>`
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
  padding: 0.5rem 1rem;
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

export const ActiveFiltersDisplay = styled.div`
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}08, ${props => props.theme.colors.accent}08);
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  max-width: 480px;
  width: 100%;
`

export const ActiveFiltersText = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`

export const ResultsText = styled.p`
  margin: 1rem 0 0 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
`
