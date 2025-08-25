'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { TestimonialData } from '@/types'
import { isReducedMotion } from '@/utils'

const TestimonialsContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary}10 0%,
    ${props => props.theme.colors.secondary}10 100%
  );
`

const TestimonialsContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const TestimonialsTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
`

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  margin: ${props => props.theme.spacing.xl} 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const TestimonialText = styled.blockquote`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.lg};
  border: none;
  padding: 0;
  
  &::before {
    content: '"';
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    line-height: 0;
    margin-right: ${props => props.theme.spacing.xs};
  }
  
  &::after {
    content: '"';
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    line-height: 0;
    margin-left: ${props => props.theme.spacing.xs};
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

const AuthorName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
`

const AuthorRole = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.9rem;
`

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: ${props => props.theme.spacing.sm};
`

const Star = styled.span`
  color: ${props => props.theme.colors.accent};
  font-size: 1.2rem;
`

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`

const NavButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.2s ease'
  };
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.accent};
    transform: ${props => isReducedMotion() ? 'none' : 'scale(1.1)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Indicators = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`

const Indicator = styled.button<{ readonly isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => 
    props.isActive 
      ? props.theme.colors.primary 
      : props.theme.colors.border
  };
  cursor: pointer;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.2s ease'
  };
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`

const testimonials: ReadonlyArray<TestimonialData> = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Marketing Professional',
    content: 'Working with this therapeutic coach has been life-changing. I finally found the tools and support I needed to break through years of self-doubt and anxiety. The personalized approach made all the difference.',
    rating: 5
  },
  {
    id: '2',
    name: 'Michael R.',
    role: 'Small Business Owner',
    content: 'The intensive transformation program gave me clarity I had been searching for years. Not only did I work through personal challenges, but I also gained confidence that transformed my business relationships.',
    rating: 5
  },
  {
    id: '3',
    name: 'Jennifer & David L.',
    role: 'Couple, Married 8 years',
    content: 'Our couples coaching sessions saved our marriage. We learned to communicate in ways we never knew possible and rediscovered the connection that brought us together in the first place.',
    rating: 5
  },
  {
    id: '4',
    name: 'Alex K.',
    role: 'Graduate Student',
    content: 'As someone dealing with career transitions and family expectations, these sessions provided a safe space to explore my authentic self. The insights I gained continue to guide me daily.',
    rating: 5
  }
] as const

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const currentTestimonial = testimonials[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)
  }

  const handleNext = () => {
    setCurrentIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)
  }

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index}>
        {index < rating ? '★' : '☆'}
      </Star>
    ))
  }

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsContent>
        <TestimonialsTitle>What Clients Say</TestimonialsTitle>
        
        <TestimonialCard>
          <StarRating>
            {renderStars(currentTestimonial.rating)}
          </StarRating>
          
          <TestimonialText>
            {currentTestimonial.content}
          </TestimonialText>
          
          <TestimonialAuthor>
            <AuthorName>{currentTestimonial.name}</AuthorName>
            <AuthorRole>{currentTestimonial.role}</AuthorRole>
          </TestimonialAuthor>
        </TestimonialCard>
        
        <Navigation>
          <NavButton 
            onClick={handlePrevious}
            aria-label="Previous testimonial"
            disabled={testimonials.length <= 1}
          >
            ←
          </NavButton>
          
          <Indicators>
            {testimonials.map((_, index) => (
              <Indicator
                key={index}
                isActive={index === currentIndex}
                onClick={() => handleIndicatorClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </Indicators>
          
          <NavButton 
            onClick={handleNext}
            aria-label="Next testimonial"
            disabled={testimonials.length <= 1}
          >
            →
          </NavButton>
        </Navigation>
      </TestimonialsContent>
    </TestimonialsContainer>
  )
}

export default TestimonialsSection