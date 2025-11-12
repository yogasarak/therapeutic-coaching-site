'use client'

import React from 'react'
import { HeaderContainer, Subtitle, Title } from './BlogHeader.styles'

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
