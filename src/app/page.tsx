import React from 'react'
import Navigation from '@/components/Navigation'
import SkipLinks from '@/components/SkipLinks'
import HeroSection from '@/components/HeroSection'
import StorySection from '@/components/StorySection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/features/layout/Footer'
import { getFeaturedPosts } from '@/lib/blog'


const HomePage = () => {
  const featuredPosts = getFeaturedPosts()

  const socialLinks = [
    { platform: 'instagram' as const, url: 'https://instagram.com/yourcoachingpractice', label: 'Follow us on Instagram' },
    { platform: 'facebook' as const, url: 'https://facebook.com/yourcoachingpractice', label: 'Like us on Facebook' },
    { platform: 'linkedin' as const, url: 'https://linkedin.com/company/yourcoachingpractice', label: 'Connect on LinkedIn' },
    { platform: 'personal' as const, url: 'https://yourcoachingwebsite.com', label: 'Visit our main website' }
  ]

  return (
    <>
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
      <Footer 
        socialLinks={socialLinks}
        businessName="Your Coaching Practice"
        businessTagline="Empowering personal growth and transformation"
        contactEmail="hello@yourcoachingpractice.com"
        showSocials={true}
      />
    </>
  )
}

export default HomePage
