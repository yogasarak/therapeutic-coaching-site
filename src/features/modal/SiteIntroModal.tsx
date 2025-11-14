'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@/features/modal/Modal'

const STORAGE_KEY = 'site-intro-modal-dismissed'
const OPEN_DELAY_MS = 1800

const descriptionParagraphs: ReadonlyArray<React.ReactNode> = [
  'A production-ready showcase pairing a password-gated client workspace with synchronized text/audio MDX posts, modal storytelling, search, and canonicalized topic badges.',
  'Built as an advanced Next App Router demo—server actions, hardened CSP/HSTS headers, cached MDX pipelines, styled-components SSR registry, Jest coverage, and automated content validation plus clean rebuilds—delivering turnkey UI/UX for practitioners and clear architecture for engineers.',
  <>
    Visit therapeutic-coaching-site.vercel.app and launch the <strong>Guided Tour</strong> button in the corner for a walkthrough of the portal, blog filters, and engineering highlights.
  </>,
]

const SiteIntroModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    setHasMounted(true)

    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') {
        return
      }
    } catch {
      // Ignore storage access errors (private mode, etc.)
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true)
    }, OPEN_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setIsOpen(false)

    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, 'true')
      }
    } catch {
      // Ignore storage write errors
    }
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleDismiss}
      title="Technical Overview"
      closeOnOverlayClick={true}
      closeOnEscape={true}
    >
      <div>
        {descriptionParagraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </Modal>
  )
}

export default SiteIntroModal
