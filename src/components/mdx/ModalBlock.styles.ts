import styled from 'styled-components'

export const Trigger = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.full};
`
