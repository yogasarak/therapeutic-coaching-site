'use client'

import React from 'react'
import styled from 'styled-components'
import { ServiceData } from '@/types'
import { isReducedMotion } from '@/utils'

const ServicesContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.background};
`

const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const ServicesTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: ${props => isReducedMotion() ? 'none' : 'translateY(-4px)'};
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

const ServiceHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`

const ServiceTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1.5rem;
`

const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
`

const ServiceFeature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.secondary};
    font-weight: bold;
    margin-right: ${props => props.theme.spacing.sm};
    margin-top: 2px;
    flex-shrink: 0;
  }
`

const ServicePrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`

const services: ReadonlyArray<ServiceData> = [
  {
    id: 'individual-coaching',
    title: 'Individual Coaching Sessions',
    description: 'One-on-one therapeutic coaching sessions tailored to your unique needs and goals.',
    features: [
      '60-minute personalized sessions',
      'Flexible scheduling options',
      'Goal-setting and progress tracking',
      'Evidence-based therapeutic techniques',
      'Safe, confidential environment',
      'Between-session email support'
    ],
    price: 'Starting at $150/session'
  },
  {
    id: 'intensive-program',
    title: 'Intensive Transformation Program',
    description: '12-week comprehensive program for deep personal work and lasting change.',
    features: [
      '12 weekly coaching sessions',
      'Custom workbook and resources',
      'Goal-setting workshop',
      'Progress assessments',
      'Unlimited email support',
      '30-day follow-up session'
    ],
    price: '$1,800 (12 sessions)'
  },
  {
    id: 'couples-coaching',
    title: 'Couples Coaching',
    description: 'Relationship coaching to strengthen communication, resolve conflicts, and deepen connection.',
    features: [
      '90-minute joint sessions',
      'Communication skill building',
      'Conflict resolution strategies',
      'Individual check-ins available',
      'Take-home exercises',
      'Relationship assessment tools'
    ],
    price: 'Starting at $200/session'
  }
] as const

const ServicesSection: React.FC = () => {
  return (
    <ServicesContainer id="services">
      <ServicesContent>
        <ServicesTitle>Services & Programs</ServicesTitle>
        
        <ServicesGrid>
          {services.map(service => (
            <ServiceCard key={service.id}>
              <ServiceHeader>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceHeader>
              
              <ServiceFeatures>
                {service.features.map((feature, index) => (
                  <ServiceFeature key={index}>
                    {feature}
                  </ServiceFeature>
                ))}
              </ServiceFeatures>
              
              {service.price && (
                <ServicePrice>{service.price}</ServicePrice>
              )}
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContent>
    </ServicesContainer>
  )
}

export default ServicesSection