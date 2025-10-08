'use client'

import React, { useEffect, useCallback, useRef } from 'react'
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
  const lastFocusedRef = useRef<Element | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

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
      // save last focused element
      lastFocusedRef.current = document.activeElement

      const originalStyle = window.getComputedStyle(document.body).overflow
      document.body.style.overflow = 'hidden'

      let rafId = 0
      // focus first focusable element inside modal on next paint
      rafId = window.requestAnimationFrame(() => {
        if (!containerRef.current) return
        const focusables = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length > 0) {
          focusables[0].focus()
        }
      })

      return () => {
        window.cancelAnimationFrame(rafId)
        document.body.style.overflow = originalStyle
        // restore focus
        if (lastFocusedRef.current instanceof HTMLElement) {
          lastFocusedRef.current.focus()
        }
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

  // Trap focus within the modal
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) return
      const focusables = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (e.shiftKey) {
        if (active === first || !containerRef.current.contains(active)) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (active === last || !containerRef.current.contains(active)) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <ModalContainer ref={containerRef} onClick={handleContainerClick}>
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
