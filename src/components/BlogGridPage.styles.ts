import Link from 'next/link'
import styled from 'styled-components'
import type { PersonalizedCardData } from '@/features/client-portal/PersonalizedCard'

export const BlogContainer = styled.div.withConfig({ componentId: 'BlogGridPage__BlogContainer' })`
  min-height: 100vh;
  padding: 80px 0 120px;
`

export const Container = styled.div.withConfig({ componentId: 'BlogGridPage__Container' })`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 4rem ${props => props.theme.spacing.md};
  }
`

export const BackLink = styled(Link).withConfig({ componentId: 'BlogGridPage__BackLink' })`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`

export const BlogHeader = styled.header.withConfig({ componentId: 'BlogGridPage__BlogHeader' })`
  text-align: center;
  margin-bottom: 4rem;
`

export const BlogTitle = styled.h1.withConfig({ componentId: 'BlogGridPage__BlogTitle' })`
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.secondary};
`

export const BlogSubtitle = styled.p.withConfig({ componentId: 'BlogGridPage__BlogSubtitle' })`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

export const BlogGrid = styled.div.withConfig({ componentId: 'BlogGridPage__BlogGrid' })`
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

export const EmptyState = styled.div.withConfig({ componentId: 'BlogGridPage__EmptyState' })`
  text-align: center;
  padding: 4rem 0;
  color: ${props => props.theme.colors.textMuted};

  p {
    font-size: 1.1rem;
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`

export const ViewToggle = styled.div.withConfig({ componentId: 'BlogGridPage__ViewToggle' })`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
`

export const ToggleButton = styled(Link).withConfig({ componentId: 'BlogGridPage__ToggleButton' })<{ readonly $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: ${props =>
    props.$isActive
      ? props.theme.colors.primary
      : 'transparent'
  };
  color: ${props =>
    props.$isActive
      ? props.theme.colors.background
      : props.theme.colors.primary
  };
  border: 1px solid ${props => props.theme.colors.primary};

  &:hover {
    background-color: ${props =>
      props.$isActive
        ? props.theme.colors.accent
        : props.theme.colors.primary + '15'
    };
  }
`

export const SocialSection = styled.aside.withConfig({ componentId: 'BlogGridPage__SocialSection' })`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 10;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    right: 1rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: static;
    transform: none;
    margin: 2rem auto;
    width: fit-content;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 1rem 0;
  }
`

export const SocialLabel = styled.p.withConfig({ componentId: 'BlogGridPage__SocialLabel' })`
  margin: 0 0 0.75rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 1rem;
  }
`

export const PracticeSection = styled.section.withConfig({ componentId: 'BlogGridPage__PracticeSection' })`
  margin: 5rem auto 0;
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const PracticeHeader = styled.header.withConfig({ componentId: 'BlogGridPage__PracticeHeader' })`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: clamp(1.75rem, 4vw, 2.4rem);
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.textMuted};
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6;
  }
`

export const PracticeGrid = styled.div.withConfig({ componentId: 'BlogGridPage__PracticeGrid' })`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const PracticeCard = styled.article.withConfig({ componentId: 'BlogGridPage__PracticeCard' })`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.14);
  }
`

export const PracticeContent = styled.button.withConfig({ componentId: 'BlogGridPage__PracticeContent' })`
  border: none;
  background: none;
  padding: 1.75rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid ${props => props.theme.colors.accent};
    outline-offset: 3px;
  }
`

export const PracticeBadgeRow = styled.div.withConfig({ componentId: 'BlogGridPage__PracticeBadgeRow' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`

export const PracticeBadge = styled.span.withConfig({ componentId: 'BlogGridPage__PracticeBadge' })<{ readonly $type: PersonalizedCardData['type'] }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.8rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.75);
  background: ${props => {
    const palette = props.theme.colors
    switch (props.$type) {
      case 'exercise':
        return `${palette.accent}20`
      case 'reflection':
        return `${palette.primary}1A`
      case 'goal':
        return `${palette.secondary}20`
      case 'audio':
        return `${palette.primary}15`
      default:
        return `${palette.border}`
    }
  }};
`

export const PracticeTitle = styled.h3.withConfig({ componentId: 'BlogGridPage__PracticeTitle' })`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  margin: 0;
  color: ${props => props.theme.colors.text};
`

export const PracticeSubtitle = styled.p.withConfig({ componentId: 'BlogGridPage__PracticeSubtitle' })`
  margin: 0;
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`

export const PracticeDescription = styled.p.withConfig({ componentId: 'BlogGridPage__PracticeDescription' })`
  margin: 0;
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.6;
`

export const PracticeFooter = styled.div.withConfig({ componentId: 'BlogGridPage__PracticeFooter' })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.85rem;
`

export const PracticeCTA = styled.span.withConfig({ componentId: 'BlogGridPage__PracticeCTA' })`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};

  &::after {
    content: ' →';
    transition: transform 0.2s ease;
  }

  ${PracticeContent}:hover &::after {
    transform: translateX(4px);
  }
`
