'use client'

import React, { useState, useEffect } from 'react'
import { ArrowIcon, BackToTopButton } from './BackToTop.styles'

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsVisible(scrollPosition > windowHeight * 0.3)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  const scrollToTop = () => {
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      // Fallback for browsers that don't support smooth scrolling
      window.scrollTo(0, 0)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      scrollToTop()
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <BackToTopButton
      $isVisible={isVisible}
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      aria-label="Scroll to top"
      title="Back to top"
      type="button"
    >
      <ArrowIcon />
    </BackToTopButton>
  )
}

export default BackToTop
