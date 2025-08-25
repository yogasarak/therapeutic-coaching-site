import React from 'react'
import StyledComponentsWrapper from '@/components/StyledComponentsWrapper'
import Navigation from '@/components/SimpleNavigation'
import HeroSection from '@/components/SimpleHero'
import { 
  SkipLinks, 
  StorySection, 
  ServicesSection, 
  TestimonialsSection, 
  BlogSection, 
  ContactSection 
} from '@/components/SimpleComponents'
import { getFeaturedPosts } from '@/server/mdx.server'

const HomePage: React.FC = () => {
  const featuredPosts = getFeaturedPosts()

  return (
    <StyledComponentsWrapper>
      <SkipLinks />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <StorySection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection posts={featuredPosts} />
        <ContactSection />
      </main>
    </StyledComponentsWrapper>
  )
}

export default HomePage