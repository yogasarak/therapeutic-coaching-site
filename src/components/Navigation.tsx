'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styled from 'styled-components'
import { NavigationSection } from '@/types'
import { scrollToSection, throttle, isReducedMotion } from '@/utils'

const NavContainer = styled.nav<{ readonly isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => 
    props.isScrolled 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(255, 255, 255, 0.1)'
  };
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => 
    props.isScrolled 
      ? `1px solid ${props.theme.colors.border}` 
      : 'none'
  };
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  padding: ${props => props.theme.spacing.sm} 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.xs} 0;
  }
`

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'color 0.2s ease'
  };

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`

const DesktopNav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: flex;
  }

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: ${props => props.theme.colors.text};
    transition: ${props => 
      isReducedMotion() 
        ? 'none' 
        : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };
    transform-origin: center;

    &:nth-child(1) {
      margin-bottom: 5px;
    }

    &:nth-child(2) {
      margin-bottom: 5px;
    }
  }
`

const MobileMenuButtonActive = styled(MobileMenuButton)<{ readonly isOpen: boolean }>`
  span {
    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'};
    }
  }
`

const MobileNav = styled.div<{ readonly isOpen: boolean }>`
  position: fixed;
  top: 100%;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  z-index: 999;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${props => props.theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`

const NavLink = styled.button<{ readonly isActive: boolean }>`
  background: none;
  border: none;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  color: ${props => 
    props.isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.text
  };
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs} 0;
  position: relative;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'color 0.2s ease'
  };

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: ${props => 
      isReducedMotion() 
        ? 'none' 
        : 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }

  &:hover::after {
    width: 100%;
  }
`

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
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // Determine if we're on the home page
  const isHomePage = pathname === '/'

  // Initialize active section based on current path and hash
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      
      if (isHomePage && hash) {
        // On home page with hash, set active to hash section
        setActiveSection(hash)
      } else if (pathname.startsWith('/blog/')) {
        setActiveSection('blog')
      } else if (pathname === '/blog') {
        setActiveSection('blog')
      } else if (isHomePage) {
        setActiveSection('home')
      } else {
        setActiveSection('home')
      }
    }
  }, [pathname, isHomePage])

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
      <NavContainer id="navigation" isScrolled={isScrolled} role="navigation" aria-label="Main navigation">
        <NavWrapper>
          <Logo href="/">Therapeutic Coaching</Logo>
          
          <DesktopNav>
            {navigationSections.map(section => (
              <li key={section.id}>
                <NavLink
                  isActive={activeSection === section.id}
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
            isOpen={isMobileMenuOpen}
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

      <MobileNav id="mobile-nav" isOpen={isMobileMenuOpen}>
        <MobileNavList>
          {navigationSections.map(section => (
            <li key={section.id}>
              <NavLink
                isActive={activeSection === section.id}
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