'use client'

import React, { useState } from 'react'
import { ContactFormData } from '@/types'
import {
  ContactContainer,
  ContactContent,
  ContactDetails,
  ContactForm,
  ContactGrid,
  ContactIcon,
  ContactInfo,
  ContactSubtitle,
  ContactText,
  ContactTitle,
  FormField,
  InfoSection,
  Input,
  Label,
  StatusMessage,
  SubmitButton,
  TextArea,
  ContactItem,
} from './ContactSection.styles'

const EnvelopeIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

const PhoneIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6.5 3h3l1.5 5-2 1a11 11 0 005 5l1-2 5 1.5v3a2 2 0 01-2 2A16 16 0 013 8a2 2 0 012-2.5z" />
  </svg>
)

const ClockIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

const SparkIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2l1.6 4.5L18 8l-4 3 1.5 4.5L12 13l-3.5 2.5L10 11 6 8l4.4-1.5L12 2z" />
  </svg>
)

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage(null)

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatusMessage({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
      })
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch {
      setStatusMessage({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContactContainer id="contact">
      <ContactContent>
        <ContactTitle>Get In Touch</ContactTitle>
        <ContactSubtitle>
          Ready to begin your transformation journey? I&apos;d love to hear from you 
          and discuss how we can work together.
        </ContactSubtitle>
        
        <ContactGrid>
          <div>
            <ContactForm onSubmit={handleSubmit}>
              {statusMessage && (
                <StatusMessage type={statusMessage.type}>
                  {statusMessage.message}
                </StatusMessage>
              )}
              
              <FormField>
                <Label htmlFor="name">Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  disabled={isSubmitting}
                />
              </FormField>
              
              <FormField>
                <Label htmlFor="email">Email *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                  disabled={isSubmitting}
                />
              </FormField>
              
              <FormField>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What would you like to discuss?"
                  required
                  disabled={isSubmitting}
                />
              </FormField>
              
              <FormField>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me a bit about what you're looking for and how I can help..."
                  required
                  disabled={isSubmitting}
                />
              </FormField>
              
              <SubmitButton 
                type="submit" 
                $isSubmitting={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </ContactForm>
          </div>
          
          <ContactInfo>
            <InfoSection>
              <h3>Let&apos;s Connect</h3>
              <p>
                I believe that the right therapeutic relationship is foundational 
                to meaningful change. I offer a free 15-minute consultation call 
                to see if we&apos;re a good fit to work together.
              </p>
            </InfoSection>
            
            <ContactDetails>
              <ContactItem>
                <ContactIcon>
                  <EnvelopeIcon />
                </ContactIcon>
                <ContactText>
                  <h4>Email</h4>
                  <p>hello@therapeuticcoaching.com</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <PhoneIcon />
                </ContactIcon>
                <ContactText>
                  <h4>Phone</h4>
                  <p>(555) 123-4567</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <ClockIcon />
                </ContactIcon>
                <ContactText>
                  <h4>Response Time</h4>
                  <p>Within 24 hours</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>
                  <SparkIcon />
                </ContactIcon>
                <ContactText>
                  <h4>Free Consultation</h4>
                  <p>15-minute discovery call</p>
                </ContactText>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>
        </ContactGrid>
      </ContactContent>
    </ContactContainer>
  )
}

export default ContactSection
