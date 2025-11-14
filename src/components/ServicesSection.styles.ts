import styled from 'styled-components'
import { isReducedMotion } from '@/utils'

export const ServicesContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.background};
`

export const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const ServicesTitle = styled.h2`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
`

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`

export const ServiceCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: ${props =>
    isReducedMotion()
      ? 'none'
      : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: ${props => (isReducedMotion() ? 'none' : 'translateY(-4px)')};
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

export const ServiceHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`

export const ServiceTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 1.5rem;
`

export const ServiceDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`

export const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
`

export const ServiceFeature = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.text};

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.textMuted};
    font-weight: bold;
    margin-right: ${props => props.theme.spacing.sm};
    margin-top: 2px;
    flex-shrink: 0;
  }
`

export const ServicePrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`
