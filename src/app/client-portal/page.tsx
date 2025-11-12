'use client'

import React, { useState } from 'react'
import Navigation from '@/components/Navigation'
import PasswordProtection from '@/features/client-portal/PasswordProtection'
import PersonalizedCard, { PersonalizedCardData } from '@/features/client-portal/PersonalizedCard'
import PersonalizedCardModal from '@/features/client-portal/PersonalizedCardModal'
import HomeworkChecklist from '@/features/client-portal/HomeworkChecklist'
import Footer from '@/features/layout/Footer'
import { samplePersonalizedCards, sampleHomeworkChecklists } from '@/features/client-portal/sampleData'
import { defaultSocialLinks } from '@/content/socialLinks'
import {
  CardsGrid,
  Container,
  HomeworkGrid,
  PortalContainer,
  PortalHeader,
  PortalSubtitle,
  PortalTitle,
  Section,
  SectionDescription,
  SectionTitle,
  WelcomeMessage,
  WelcomeText,
  WelcomeTitle,
} from './page.styles'

export const dynamic = 'force-dynamic'

const ClientPortalPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCard, setSelectedCard] = useState<PersonalizedCardData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
          socialLinks={defaultSocialLinks}
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
