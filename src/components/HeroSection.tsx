'use client'

import React from 'react'
import { scrollToSection } from '@/utils'
import {
  CTAButton,
  HeroContainer,
  HeroContent,
  HeroImage,
  HeroText,
  PlaceholderText,
} from './HeroSection.styles'

const HeroSection: React.FC = () => {
  const handleCTAClick = () => {
    scrollToSection('contact')
  }

  return (
    <HeroContainer id="home">
      <HeroContent>
        <HeroText>
          <h1>
            <span className="hero-title-full">Transform Your Life Through Therapeutic Coaching</span>
            <span className="hero-title-mobile">Therapeutic Coaching</span>
          </h1>
          <p>
            Discover your inner strength, overcome life&apos;s challenges, and create 
            lasting positive change with personalized therapeutic coaching designed 
            just for you.
          </p>
          <CTAButton 
            onClick={handleCTAClick}
            aria-label="Get started with therapeutic coaching"
          >
            Start Your Journey
          </CTAButton>
        </HeroText>
        
        <HeroImage>
          <PlaceholderText>
            Hero Image<br />
            (Add inspiring photo of coach or peaceful setting)
          </PlaceholderText>
        </HeroImage>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
