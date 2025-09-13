'use client'

import React, { useState } from 'react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import PasswordProtection from '@/features/client-portal/PasswordProtection'
import PersonalizedCard, { PersonalizedCardData } from '@/features/client-portal/PersonalizedCard'
import PersonalizedCardModal from '@/features/client-portal/PersonalizedCardModal'
import HomeworkChecklist from '@/features/client-portal/HomeworkChecklist'
import Footer from '@/features/layout/Footer'
import { samplePersonalizedCards, sampleHomeworkChecklists } from '@/features/client-portal/sampleData'
import styled from 'styled-components'

export const dynamic = 'force-dynamic'

const PortalContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacing.lg};
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 4rem ${props => props.theme.spacing.md};
  }
`

const PortalHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

const PortalTitle = styled.h1`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`

const PortalSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`

const WelcomeMessage = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}08, ${props => props.theme.colors.accent}08);
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`

const WelcomeTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem 0;
`

const WelcomeText = styled.p`
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.6;
`

const Section = styled.section`
  margin: 3rem 0;
`

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1.5rem 0;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }
`

const SectionDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0 0 2rem 0;
  text-align: center;
  line-height: 1.6;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const HomeworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ClientPortalPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCard, setSelectedCard] = useState<PersonalizedCardData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const socialLinks = [
    { platform: 'instagram' as const, url: 'https://instagram.com/yourcoachingpractice', label: 'Follow us on Instagram' },
    { platform: 'facebook' as const, url: 'https://facebook.com/yourcoachingpractice', label: 'Like us on Facebook' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/company/yourcoachingpractice', label: 'Connect on LinkedIn' },
    { platform: 'personal' as const, url: 'https://yourcoachingwebsite.com', label: 'Visit our main website' }
  ]

  const handleHomeworkItemToggle = (homeworkId: string, itemId: string) => {
    console.log(`Toggled item ${itemId} in homework ${homeworkId}`)
    // In a real app, this would update the backend
  }

  const handleAuthenticated = () => {
    setIsAuthenticated(true)
  }

  const handleCardClick = (card: PersonalizedCardData) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedCard(null)
  }

  if (!isAuthenticated) {
    return (
      <>
        <Navigation />
        <PasswordProtection onAuthenticated={handleAuthenticated}>
          {/* This children prop is not used in the current implementation */}
        </PasswordProtection>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <PortalContainer>
        <Container>
          <PortalHeader>
            <PortalTitle>Your Personal Journey</PortalTitle>
            <PortalSubtitle>
              Welcome to your private space for growth and reflection
            </PortalSubtitle>
          </PortalHeader>

          <WelcomeMessage>
            <WelcomeTitle>👋 Welcome Back!</WelcomeTitle>
            <WelcomeText>
              Here you&apos;ll find personalized exercises, reflections, and resources 
              tailored specifically for your therapeutic journey. Each card contains 
              content designed to support your growth and well-being.
            </WelcomeText>
          </WelcomeMessage>

          <Section>
            <SectionTitle>📝 Current Homework & Tasks</SectionTitle>
            <SectionDescription>
              Keep track of your progress with these personalized assignments designed to support your goals.
            </SectionDescription>
            <HomeworkGrid>
              {sampleHomeworkChecklists.map(homework => (
                <HomeworkChecklist
                  key={homework.id}
                  homework={homework}
                  onItemToggle={handleHomeworkItemToggle}
                  showProgress={true}
                />
              ))}
            </HomeworkGrid>
          </Section>

          <Section>
            <SectionTitle>🎯 Resources & Content</SectionTitle>
            <SectionDescription>
              Explore personalized content, exercises, and materials created just for you.
            </SectionDescription>
            <CardsGrid>
              {samplePersonalizedCards.map(card => (
                <PersonalizedCard 
                  key={card.id} 
                  card={card} 
                  onClick={handleCardClick}
                />
              ))}
            </CardsGrid>
          </Section>

          <PersonalizedCardModal
            card={selectedCard}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        </Container>
        
        <Footer 
          socialLinks={socialLinks}
          businessName="Your Coaching Practice"
          businessTagline="Empowering personal growth and transformation"
          contactEmail="hello@yourcoachingpractice.com"
          showSocials={true}
        />
      </PortalContainer>
    </>
  )
}

export default ClientPortalPage
