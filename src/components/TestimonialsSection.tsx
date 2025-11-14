'use client'

import React, { useState } from 'react'
import { TestimonialData } from '@/types'
import {
  AuthorName,
  AuthorRole,
  Indicator,
  Indicators,
  NavButton,
  Navigation as TestimonialsNavigation,
  Star,
  StarRating,
  TestimonialAuthor,
  TestimonialCard,
  TestimonialText,
  TestimonialsContainer,
  TestimonialsContent,
  TestimonialsTitle,
} from './TestimonialsSection.styles'

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
            {/* {renderStars(currentTestimonial.rating)} */}
          </StarRating>
          
          <TestimonialText>
            {currentTestimonial.content}
          </TestimonialText>
          
          <TestimonialAuthor>
            <AuthorName>{currentTestimonial.name}</AuthorName>
            <AuthorRole>{currentTestimonial.role}</AuthorRole>
          </TestimonialAuthor>
        </TestimonialCard>
        
        <TestimonialsNavigation>
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
                $isActive={index === currentIndex}
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
        </TestimonialsNavigation>
      </TestimonialsContent>
    </TestimonialsContainer>
  )
}

export default TestimonialsSection
