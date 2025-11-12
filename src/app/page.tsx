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
import { defaultSocialLinks } from '@/content/socialLinks'


const HomePage = () => {
  const featuredPosts = getFeaturedPosts()

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
        socialLinks={defaultSocialLinks}
        businessName="Your Coaching Practice"
        businessTagline="Empowering personal growth and transformation"
        contactEmail="hello@yourcoachingpractice.com"
        showSocials={true}
      />
    </>
  )
}

export default HomePage
