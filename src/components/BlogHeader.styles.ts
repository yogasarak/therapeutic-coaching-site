import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
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

export const Subtitle = styled.p`
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
