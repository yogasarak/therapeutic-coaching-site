'use client'

import { HomeButton, Info, Subtitle, Title, Wrapper } from './not-found.styles'

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
