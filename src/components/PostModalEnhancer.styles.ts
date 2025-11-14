import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  background-color: rgba(30, 41, 59, 0.75);
  backdrop-filter: blur(6px);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }
`

export const ModalContainer = styled.div`
  position: relative;
  width: min(900px, 100%);
  max-height: 85vh;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.lg};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
  }
`

export const ModalCloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.sm};
  right: ${props => props.theme.spacing.sm};
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.75rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }
`

export const ModalTitle = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.sm} 0;
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.text};
`

export const ModalBody = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;

  h3, h4 {
    color: ${props => props.theme.colors.primary};
    margin-top: ${props => props.theme.spacing.md};
  }

  p {
    margin: 0 0 ${props => props.theme.spacing.sm} 0;
  }

  ul, ol {
    margin: 0 0 ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  }
`
