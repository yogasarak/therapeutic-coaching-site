import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

export const ModalContainer = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15);
  max-width: 90vw;
  max-height: 90vh;
  width: 100%;
  height: auto;
  overflow: hidden;
  animation: ${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    max-width: 900px;
    max-height: 80vh;
  }

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 85vh;
  }
`

export const ModalHeader = styled.div`
  padding: 1.5rem 2rem 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem 0.75rem;
  }
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.colors.textMuted};
  font-size: 2rem;
  line-height: 1;

  transition: transform 0.2s ease, color 0.2s ease;
  outline: none;

  &:hover {
    color: ${props => props.theme.colors.text};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`

export const ModalContent = styled.div`
  padding: 1.25rem 2rem 2rem;
  overflow-y: auto;
  flex: 1;
  min-height: 0;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem 1.5rem;
  }
`

export const ModalFooter = styled.div`
  padding: 1rem 2rem 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem 1.5rem;
    flex-direction: column-reverse;
  }
`
