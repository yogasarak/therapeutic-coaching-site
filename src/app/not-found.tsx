"use client"

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0 0 1rem 0;
  color: ${props => props.theme.colors.primary};
`

const Subtitle = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin: 0 0 1rem 0;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`

const Info = styled.p`
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  color: ${props => props.theme.colors.textMuted};
`

const HomeButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-block;
`

export default function NotFound() {
  return (
    <Wrapper>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Info>The page you are looking for does not exist.</Info>
      <HomeButton href="/">Return Home</HomeButton>
    </Wrapper>
  )
}
