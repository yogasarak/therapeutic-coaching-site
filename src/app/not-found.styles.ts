import Link from 'next/link'
import styled from 'styled-components'

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  gap: 1.5rem;
`

export const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0;
  color: ${props => props.theme.colors.primary};
`

export const Subtitle = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
`

export const Info = styled.p`
  font-size: 1.1rem;
  margin: 0;
  color: ${props => props.theme.colors.textMuted};
`

export const HomeButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: #ffffff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  display: inline-block;
`
