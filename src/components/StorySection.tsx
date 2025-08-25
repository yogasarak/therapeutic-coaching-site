'use client'

import React from 'react'
import styled from 'styled-components'

const StoryContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.surface};
`

const StoryContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const StoryTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
`

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: center;
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`

const StoryText = styled.div`
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.lg};

    &:first-child {
      font-size: 1.3rem;
      color: ${props => props.theme.colors.text};
      font-weight: 500;
    }
  }
`

const StoryImage = styled.div`
  height: 400px;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 300px;
    order: -1;
  }
`

const PlaceholderText = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 1rem;
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`

const Highlight = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`

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