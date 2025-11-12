import styled from 'styled-components'

export const PortalContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacing.lg};
  flex: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 4rem ${props => props.theme.spacing.md};
  }
`

export const PortalHeader = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

export const PortalTitle = styled.h1`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin: 0 0 0.5rem 0;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`

export const PortalSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0 0 1rem 0;
  line-height: 1.5;
`

export const WelcomeMessage = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}08, ${props => props.theme.colors.accent}08);
  border: 1px solid ${props => props.theme.colors.primary}20;
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`

export const WelcomeTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem 0;
`

export const WelcomeText = styled.p`
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.6;
`

export const Section = styled.section`
  margin: 3rem 0;
`

export const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin: 0 0 1.5rem 0;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.75rem;
  }
`

export const SectionDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0 0 2rem 0;
  text-align: center;
  line-height: 1.6;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const HomeworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`
