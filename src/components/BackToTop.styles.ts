import styled from 'styled-components'

export const BackToTopButton = styled.button<{ readonly $isVisible: boolean }>`
  position: fixed;
  bottom: 1.75rem;
  left: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFBF91 0%, #FBCBFF 35%, #FFE3D4 70%, #FFEC8A 100%);
  color: ${props => props.theme.colors.primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(10px)')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (prefers-reduced-motion: reduce) { transition: none; }
  z-index: 999;

  &:hover {
    transform: ${props => (props.$isVisible ? 'translateY(-2px)' : 'translateY(10px)')};
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
  }

  &:active {
    transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(10px)')};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 1.25rem;
    width: 2.6rem;
    height: 2.6rem;
  }
`

export const ArrowIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 12px solid currentColor;
  margin-bottom: 1px;
`
