'use client'

import React from 'react'
import styled from 'styled-components'

const SkipLinksContainer = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  z-index: 9999;
  
  a {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
    
    &:focus {
      position: static;
      width: auto;
      height: auto;
      background: ${props => props.theme.colors.primary};
      color: white;
      padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
      text-decoration: none;
      border-radius: ${props => props.theme.borderRadius.sm};
      font-weight: 600;
      z-index: 10000;
      outline: 3px solid ${props => props.theme.colors.accent};
      outline-offset: 2px;
    }
  }
`

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