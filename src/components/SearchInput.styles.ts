import styled from 'styled-components'

export const SearchInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`

export const Input = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 1rem 1.5rem;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1.1rem;
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
    font-size: 1rem;
    padding: 0.875rem 1.25rem;
    max-width: 400px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`
