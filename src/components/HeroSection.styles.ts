import styled from 'styled-components'
import { isReducedMotion } from '@/utils'

export const HeroContainer = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary}20 0%,
    ${props => props.theme.colors.secondary}20 100%
  );
  position: relative;
  padding: ${props => props.theme.spacing.xxl} 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23000" opacity="0.05"/><circle cx="75" cy="75" r="1" fill="%23000" opacity="0.05"/><circle cx="50" cy="10" r="1" fill="%23000" opacity="0.05"/><circle cx="10" cy="60" r="1" fill="%23000" opacity="0.05"/><circle cx="90" cy="40" r="1" fill="%23000" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`

export const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
    text-align: center;
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const HeroText = styled.div`
  h1 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.md};
    line-height: 1.1;
  }

  p {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.xl};
    max-width: 500px;
  }
`

export const CTAButton = styled.button`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  transition: ${props =>
    isReducedMotion()
      ? 'none'
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  box-shadow: ${props => props.theme.shadows.md};
  
  &:hover {
    transform: ${props => (isReducedMotion() ? 'none' : 'translateY(-2px)')};
    box-shadow: ${props => props.theme.shadows.lg};
  }
  
  &:active {
    transform: ${props => (isReducedMotion() ? 'none' : 'translateY(0)')};
  }
`

export const HeroImage = styled.div`
  position: relative;
  height: 500px;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 300px;
    margin: 0 auto;
    max-width: 400px;
  }
`

export const PlaceholderText = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 1.2rem;
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`
