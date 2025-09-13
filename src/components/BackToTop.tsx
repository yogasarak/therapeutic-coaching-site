'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isReducedMotion } from '@/utils'

const BackToTopButton = styled.button<{ readonly $isVisible: boolean }>`
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
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(10px)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  @media (prefers-reduced-motion: reduce) { transition: none; }
  z-index: 999;

  &:hover {
    transform: ${props => props.$isVisible ? 'translateY(-2px)' : 'translateY(10px)'};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(10px)'};
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

const ArrowIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 8px solid currentColor;
  margin-bottom: 2px;
`

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
