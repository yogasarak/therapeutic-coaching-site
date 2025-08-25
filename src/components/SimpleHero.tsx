'use client'

import React from 'react'
import { scrollToSection } from '@/utils'

const HeroSection: React.FC = () => {
  const handleCTAClick = () => {
    scrollToSection('contact')
  }

  return (
    <section 
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, #2D5A8720 0%, #8FBC8F20 100%)`,
        padding: '4rem 0',
      }}
    >
      <div className="container">
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>
          <div>
            <h1 style={{
              color: 'var(--color-text)',
              marginBottom: 'var(--spacing-md)',
              lineHeight: '1.1',
            }}>
              Transform Your Life Through Therapeutic Coaching
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--spacing-xl)',
              maxWidth: '500px',
            }}>
              Discover your inner strength, overcome life&apos;s challenges, and create 
              lasting positive change with personalized therapeutic coaching designed 
              just for you.
            </p>
            <button 
              onClick={handleCTAClick}
              className="btn-primary"
              aria-label="Get started with therapeutic coaching"
            >
              Start Your Journey
            </button>
          </div>
          
          <div className="hero-image" style={{
            height: '500px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--border-radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <div style={{
              color: 'var(--color-text-muted)',
              fontSize: '1.2rem',
              textAlign: 'center',
              padding: 'var(--spacing-lg)',
            }}>
              Hero Image<br />
              (Add inspiring photo of coach or peaceful setting)
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection