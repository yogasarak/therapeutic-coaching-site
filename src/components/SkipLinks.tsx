'use client'

import React from 'react'
import { SkipLinksContainer } from './SkipLinks.styles'

const SkipLinks: React.FC = () => {
  return (
    <SkipLinksContainer>
      <a href="#main-content">Skip to main content</a>
      <a href="#navigation">Skip to navigation</a>
      <a href="#contact">Skip to contact</a>
    </SkipLinksContainer>
  )
}

export default SkipLinks
