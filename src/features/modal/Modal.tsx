'use client'

import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ModalFooter
} from './Modal.styles'

interface ModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly title?: string
  readonly children: React.ReactNode
  readonly footer?: React.ReactNode
  readonly closeOnOverlayClick?: boolean
  readonly closeOnEscape?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true
}) => {
  // Handle escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [isOpen])

  const handleOverlayClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }, [onClose, closeOnOverlayClick])

  const handleContainerClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation()
  }, [])

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <ModalContainer onClick={handleContainerClick}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              ×
            </CloseButton>
          </ModalHeader>
        )}
        
        <ModalContent>
          {children}
        </ModalContent>
        
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>
  )

  // Use portal to render modal at the root level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body)
  }

  return null
}

export default Modal