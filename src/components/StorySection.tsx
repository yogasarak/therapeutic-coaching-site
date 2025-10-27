'use client'

import React from 'react'
import {
  Highlight,
  PlaceholderText,
  StoryContainer,
  StoryContent,
  StoryGrid,
  StoryImage,
  StoryText,
  StoryTitle,
} from './StorySection.styles'

const StorySection: React.FC = () => {
  return (
    <StoryContainer id="story">
      <StoryContent>
        <StoryTitle>My Story & Approach</StoryTitle>
        
        <StoryGrid>
          <StoryText>
            <p>
              Every journey begins with a single step, and mine started with the 
              profound realization that <Highlight>healing happens in relationship</Highlight>.
            </p>
            
            <p>
              With over a decade of experience in therapeutic coaching, I&apos;ve had the 
              privilege of walking alongside hundreds of individuals as they&apos;ve discovered 
              their inner resilience, processed life&apos;s challenges, and created meaningful 
              change in their lives.
            </p>
            
            <p>
              My approach combines evidence-based therapeutic techniques with compassionate, 
              personalized coaching. I believe that you are the expert of your own life, 
              and my role is to provide the tools, support, and safe space you need to 
              unlock your potential.
            </p>
            
            <p>
              Whether you&apos;re navigating life transitions, processing difficult emotions, 
              or simply seeking deeper self-understanding, I&apos;m here to support you with 
              <Highlight>warmth, authenticity, and unwavering belief</Highlight> in your 
              capacity for growth.
            </p>
          </StoryText>
          
          <StoryImage>
            <PlaceholderText>
              Professional Photo<br />
              (Warm, approachable portrait of the coach)
            </PlaceholderText>
          </StoryImage>
        </StoryGrid>
      </StoryContent>
    </StoryContainer>
  )
}

export default StorySection
