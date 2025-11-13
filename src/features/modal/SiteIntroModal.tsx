'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Modal from '@/features/modal/Modal'

const STORAGE_KEY = 'site-intro-modal-dismissed'
const OPEN_DELAY_MS = 1800

const descriptionParagraphs = [
  'Next.js App Router build that pairs pre-rendered marketing pages with a dynamic, cookie-backed client portal (/api/auth) and ships hardened metadata, sitemap/robots, and CSP/HSTS headers via next.config.',
  'An MDX pipeline (next-mdx-remote + remark/rehype sanitize) caches frontmatter, powers audio-enhanced posts, and feeds client-side modal treatments sourced from MDX data attributes, while React controllers lean on derived state hooks to drive search and canonicalized topic badges.',
  'A styled-components SSR registry, content validation + clean rebuild scripts, and Jest safety tests keep the UI modular, themeable, and production-ready.',
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
        {descriptionParagraphs.map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
    </Modal>
  )
}

export default SiteIntroModal
