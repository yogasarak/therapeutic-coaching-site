'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { NavigationSection } from '@/types'
import { scrollToSection, throttle } from '@/utils'
import {
  DesktopNav,
  Logo,
  MobileMenuButtonActive,
  MobileNav,
  MobileNavList,
  NavContainer,
  NavLink,
  NavWrapper,
} from './Navigation.styles'

const navigationSections: ReadonlyArray<NavigationSection> = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'story', label: 'Story', href: '/#story' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'testimonials', label: 'Testimonials', href: '/#testimonials' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
] as const

const Navigation: React.FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<string>(() => {
    if (pathname && pathname.startsWith('/blog')) return 'blog'
    if (pathname === '/') return 'home'
    return 'home'
  })
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // Determine if we're on the home page
  const isHomePage = pathname === '/'

  // Update active section on hash changes for home page only
  useEffect(() => {
    if (!isHomePage) return
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash) setActiveSection(hash)
  }, [isHomePage])

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      // Only do section detection on home page
      if (isHomePage) {
        // Cache section elements to avoid repeated DOM queries
        const sectionElements = new Map<string, HTMLElement>()
        const sectionIds = ['home', 'story', 'services', 'testimonials', 'blog', 'contact']
        
        sectionIds.forEach(id => {
          const element = document.getElementById(id)
          if (element) {
            sectionElements.set(id, element)
          }
        })

        // Find active section more efficiently
        let newActiveSection = 'home'
        const threshold = 100

        // Check sections in reverse order so we get the topmost visible section
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i]
          const element = sectionElements.get(id)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= threshold) {
              newActiveSection = id
              break
            }
          }
        }

        setActiveSection(newActiveSection)
      }
    }, 50)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const handleNavClick = (section: NavigationSection) => {
    setIsMobileMenuOpen(false)
    
    if (section.href.startsWith('/#')) {
      // Handle home page section links
      if (isHomePage) {
        // Already on home page, scroll to section
        const targetId = section.href.replace('/#', '')
        scrollToSection(targetId)
        setActiveSection(targetId)
        
        // Update URL hash without triggering navigation
        window.history.replaceState(null, '', section.href)
      } else {
        // Navigate to home page with hash using Next.js router
        router.push(section.href)
      }
    } else if (section.href === '/') {
      // Navigate to home page
      router.push('/')
    } else {
      // Handle other page navigation (like /blog)
      router.push(section.href)
    }
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleKeyDown = (event: React.KeyboardEvent, section: NavigationSection) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavClick(section)
    }
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && event.target instanceof Element) {
        const nav = document.getElementById('navigation')
        if (nav && !nav.contains(event.target)) {
          setIsMobileMenuOpen(false)
        }
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <NavContainer id="navigation" $isScrolled={isScrolled} role="navigation" aria-label="Main navigation">
        <NavWrapper>
          <Logo href="/">Therapeutic Coaching</Logo>
          
          <DesktopNav>
            {navigationSections.map(section => (
              <li key={section.id}>
                <NavLink
                  $isActive={activeSection === section.id}
                  onClick={() => handleNavClick(section)}
                  onKeyDown={(e) => handleKeyDown(e, section)}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  type="button"
                >
                  {section.label}
                </NavLink>
              </li>
            ))}
          </DesktopNav>

          <MobileMenuButtonActive
            $isOpen={isMobileMenuOpen}
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuButtonActive>
        </NavWrapper>
      </NavContainer>

      <MobileNav id="mobile-nav" $isOpen={isMobileMenuOpen}>
        <MobileNavList>
          {navigationSections.map(section => (
            <li key={section.id}>
              <NavLink
                $isActive={activeSection === section.id}
                onClick={() => handleNavClick(section)}
                onKeyDown={(e) => handleKeyDown(e, section)}
                aria-current={activeSection === section.id ? 'page' : undefined}
                type="button"
              >
                {section.label}
              </NavLink>
            </li>
          ))}
        </MobileNavList>
      </MobileNav>
    </>
  )
}

export default Navigation
