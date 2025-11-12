"use client"

import React, { useEffect, useState, useCallback } from 'react'
import {
  ModalOverlay,
  ModalContainer,
  ModalCloseButton,
  ModalTitle,
  ModalBody,
} from './PostModalEnhancer.styles'

const PostModalEnhancer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [contentHtml, setContentHtml] = useState<string>('')

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    const placeholders = document.querySelectorAll<HTMLElement>('[data-modal="true"]')
    const handlers: Array<() => void> = []
    placeholders.forEach(ph => {
      const btn = ph.querySelector('[data-modal-trigger]') as HTMLButtonElement | null
      const body = ph.querySelector('[data-modal-body]') as HTMLElement | null
      if (!btn || !body) return
      const click = () => {
        setTitle(ph.getAttribute('data-modal-title') || 'Details')
        setContentHtml(body.innerHTML)
        setOpen(true)
      }
      btn.addEventListener('click', click)
      handlers.push(() => btn.removeEventListener('click', click))
    })
    return () => { handlers.forEach(off => off()) }
  }, [])

  const handleOverlayClick = useCallback(() => {
    handleClose()
  }, [handleClose])

  const handleContainerClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }, [])

  if (!open) return null

  return (
    <ModalOverlay onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <ModalContainer onClick={handleContainerClick}>
        <ModalCloseButton type="button" aria-label="Close modal" onClick={handleClose}>
          ×
        </ModalCloseButton>
        {title && <ModalTitle>{title}</ModalTitle>}
        <ModalBody dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </ModalContainer>
    </ModalOverlay>
  )
}

export default PostModalEnhancer
