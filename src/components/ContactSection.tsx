'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { ContactFormData } from '@/types'
import { isReducedMotion } from '@/utils'

const ContactContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.surface};
`

const ContactContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

const ContactTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
`

const ContactSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'border-color 0.2s ease'
  };
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'border-color 0.2s ease'
  };
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`

const SubmitButton = styled.button<{ readonly isSubmitting: boolean }>`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: ${props => props.isSubmitting ? 'not-allowed' : 'pointer'};
  transition: ${props => 
    isReducedMotion() 
      ? 'none' 
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  box-shadow: ${props => props.theme.shadows.sm};
  opacity: ${props => props.isSubmitting ? '0.7' : '1'};
  
  &:hover:not(:disabled) {
    transform: ${props => isReducedMotion() ? 'none' : 'translateY(-1px)'};
    box-shadow: ${props => props.theme.shadows.md};
  }
  
  &:active:not(:disabled) {
    transform: ${props => isReducedMotion() ? 'none' : 'translateY(0)'};
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`

const InfoSection = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: 1.3rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    line-height: 1.6;
  }
`

const ContactDetails = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  &:last-child {
    margin-bottom: 0;
  }
`

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
`

const ContactText = styled.div`
  h4 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 2px;
    font-size: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textMuted};
    margin: 0;
    font-size: 0.9rem;
  }
`

const StatusMessage = styled.div<{ readonly type: 'success' | 'error' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => 
    props.type === 'success' 
      ? props.theme.colors.success + '20' 
      : props.theme.colors.error + '20'
  };
  color: ${props => 
    props.type === 'success' 
      ? props.theme.colors.success 
      : props.theme.colors.error
  };
  border: 1px solid ${props => 
    props.type === 'success' 
      ? props.theme.colors.success 
      : props.theme.colors.error
  };
  margin-bottom: ${props => props.theme.spacing.lg};
`

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
                isSubmitting={isSubmitting}
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
                <ContactIcon>📧</ContactIcon>
                <ContactText>
                  <h4>Email</h4>
                  <p>hello@therapeuticcoaching.com</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>📞</ContactIcon>
                <ContactText>
                  <h4>Phone</h4>
                  <p>(555) 123-4567</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>🕒</ContactIcon>
                <ContactText>
                  <h4>Response Time</h4>
                  <p>Within 24 hours</p>
                </ContactText>
              </ContactItem>
              
              <ContactItem>
                <ContactIcon>🌟</ContactIcon>
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