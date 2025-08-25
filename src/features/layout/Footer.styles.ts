import styled from 'styled-components'

export const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}10, ${props => props.theme.colors.accent}05);
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: auto;
  padding: 2rem 0 1rem;
`

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    align-items: flex-start;
    text-align: left;
  }
  
  &:last-child {
    @media (min-width: ${props => props.theme.breakpoints.tablet}) {
      align-items: flex-end;
      text-align: right;
    }
  }
`

export const FooterTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.secondary};
`

export const FooterText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.4;
  max-width: 300px;
`

export const FooterLink = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    text-decoration: underline;
  }
`

export const FooterDivider = styled.div`
  width: 1px;
  height: 40px;
  background: ${props => props.theme.colors.border};
  display: none;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`

export const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`

export const Copyright = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  
  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: left;
  }
`