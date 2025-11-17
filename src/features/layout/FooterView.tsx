"use client"

import React from 'react'
import { COPYRIGHT_NOTICE } from '@/constants/site'
import SocialIcons, { type SocialLink } from '../social/SocialIcons'
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
  readonly copyrightNotice?: string
}

const FooterView: React.FC<FooterProps> = ({
  socialLinks = [],
  businessName = 'Your Coaching Practice',
  businessTagline = 'Empowering personal growth and transformation',
  contactEmail,
  showSocials = true,
  className,
  copyrightNotice = COPYRIGHT_NOTICE,
}) => {
  const copyrightText = businessName
    ? `${copyrightNotice} · ${businessName}. All rights reserved.`
    : `${copyrightNotice}. All rights reserved.`

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
          {copyrightText}
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  )
}

export default FooterView
