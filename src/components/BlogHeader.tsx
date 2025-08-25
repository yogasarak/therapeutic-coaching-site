'use client'

import React from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  margin: 0;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`

const Subtitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.5;
  font-weight: 400;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.95rem;
  }
`

interface BlogHeaderProps {
  readonly title?: string
  readonly subtitle?: string
  readonly className?: string
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  title = "Blog",
  subtitle = "Insights on personal growth, healing, and the therapeutic journey",
  className
}) => {
  return (
    <HeaderContainer className={className}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderContainer>
  )
}

export default BlogHeader