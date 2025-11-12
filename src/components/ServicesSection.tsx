'use client'

import React from 'react'
import { ServiceData } from '@/types'
import {
  ServiceCard,
  ServiceDescription,
  ServiceFeature,
  ServiceFeatures,
  ServiceHeader,
  ServicePrice,
  ServiceTitle,
  ServicesContainer,
  ServicesContent,
  ServicesGrid,
  ServicesTitle,
} from './ServicesSection.styles'

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
