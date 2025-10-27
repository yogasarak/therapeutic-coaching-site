import styled from 'styled-components'

export const BackToTopButton = styled.button<{ readonly $isVisible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #2D5A87 0%, #F4A460 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  opacity: ${props => (props.$isVisible ? 1 : 0)};
  visibility: ${props => (props.$isVisible ? 'visible' : 'hidden')};
  transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(10px)')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (prefers-reduced-motion: reduce) { transition: none; }
  z-index: 999;

  &:hover {
    transform: ${props => (props.$isVisible ? 'translateY(-2px)' : 'translateY(10px)')};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: ${props => (props.$isVisible ? 'translateY(0)' : 'translateY(10px)')};
  }

  &:focus-visible {
    outline: 2px solid #2D5A87;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
`

export const ArrowIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid currentColor;
  margin-bottom: 2px;
`
