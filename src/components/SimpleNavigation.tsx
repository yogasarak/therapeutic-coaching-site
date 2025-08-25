'use client'

import React, { useState, useEffect } from 'react'
import { NavigationSection } from '@/types'
import { scrollToSection, debounce } from '@/utils'

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

  return (
    <>
      <nav 
        id="navigation"
        role="navigation" 
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '1rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--color-primary)'
          }}>
            Therapeutic Coaching
          </div>
          
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: 'var(--spacing-lg)',
          }}>
            {navigationSections.map(section => (
              <li key={section.id} className="nav-desktop-only">
                <button
                  onClick={() => handleNavClick(section.id)}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1rem',
                    fontWeight: activeSection === section.id ? '600' : '400',
                    color: activeSection === section.id ? 'var(--color-primary)' : 'var(--color-text)',
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="nav-mobile-only"
            style={{
              display: 'none',
              flexDirection: 'column',
              width: '24px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={{
              display: 'block',
              height: '2px',
              width: '100%',
              backgroundColor: 'var(--color-text)',
              marginBottom: '5px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block',
              height: '2px',
              width: '100%',
              backgroundColor: 'var(--color-text)',
              marginBottom: '5px',
              opacity: isMobileMenuOpen ? '0' : '1',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
            <span style={{
              display: 'block',
              height: '2px',
              width: '100%',
              backgroundColor: 'var(--color-text)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-border)',
          zIndex: 999,
          padding: 'var(--spacing-lg)',
        }}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-md)',
          }}>
            {navigationSections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1rem',
                    fontWeight: activeSection === section.id ? '600' : '400',
                    color: activeSection === section.id ? 'var(--color-primary)' : 'var(--color-text)',
                    cursor: 'pointer',
                    padding: '0.5rem 0',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Navigation