"use client"

import React from 'react'
import SocialIcons, { type SocialLink } from '../social/SocialIcons'
import styled from 'styled-components'
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterText,
  FooterLink,
  FooterDivider,
  FooterBottom,
  Copyright
} from './Footer.styles'

export interface FooterProps {
  readonly socialLinks?: readonly SocialLink[]
  readonly businessName?: string
  readonly businessTagline?: string
  readonly contactEmail?: string
  readonly showSocials?: boolean
  readonly className?: string
}

const FooterView: React.FC<FooterProps> = ({
  socialLinks = [],
  businessName = 'Your Coaching Practice',
  businessTagline = 'Empowering personal growth and transformation',
  contactEmail,
  showSocials = true,
  className,
}) => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer className={className}>
      <FooterContent>
        <FooterSection>
          <FooterTitle>{businessName}</FooterTitle>
          <FooterText>{businessTagline}</FooterText>
          {contactEmail && (
            <FooterLink href={`mailto:${contactEmail}`}>
              {contactEmail}
            </FooterLink>
          )}
        </FooterSection>

        {showSocials && socialLinks.length > 0 && (
          <>
            <FooterDivider />
            <FooterSection>
              <SocialIcons 
                links={socialLinks}
                size="medium"
                spacing="normal"
                color="light"
              />
            </FooterSection>
          </>
        )}
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          © {currentYear} {businessName}. All rights reserved.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  )
}

export default FooterView
