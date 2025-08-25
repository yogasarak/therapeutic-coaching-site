'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { NavigationSection } from '@/types'
import { scrollToSection, debounce, isReducedMotion } from '@/utils'

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

const Logo = styled.div`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
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
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'story', label: 'Story', href: '#story' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'testimonials', label: 'Testimonials', href: '#testimonials' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
] as const

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      const sections = navigationSections.map(nav => ({
        id: nav.id,
        element: document.getElementById(nav.id),
      }))

      const currentSection = sections.find(section => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }, 10)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavClick(sectionId)
    }
  }

  return (
    <>
      <NavContainer id="navigation" isScrolled={isScrolled} role="navigation" aria-label="Main navigation">
        <NavWrapper>
          <Logo>Therapeutic Coaching</Logo>
          
          <DesktopNav>
            {navigationSections.map(section => (
              <li key={section.id}>
                <NavLink
                  isActive={activeSection === section.id}
                  onClick={() => handleNavClick(section.id)}
                  onKeyDown={(e) => handleKeyDown(e, section.id)}
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
                onClick={() => handleNavClick(section.id)}
                onKeyDown={(e) => handleKeyDown(e, section.id)}
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