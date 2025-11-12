import Link from 'next/link'
import styled from 'styled-components'
import { CardBadge as TypeBadge } from '@/features/client-portal/PersonalizedCard.styles'

export const BlogContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 4rem ${props => props.theme.spacing.md};
  }
`

export const BlogContainer800 = styled(Container)`
  max-width: 800px;
`

export const BackLink = styled(Link)`
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

export const BlogHeader = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`

export const BlogTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.secondary};
`

export const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  flex-wrap: wrap;
  justify-content: center;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`

export const Tag = styled.span`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`

export const BlogTypeBadge = styled(TypeBadge)`
  margin-right: 0.25rem;
`

export const TagsContainerWithTopMargin = styled(TagsContainer)`
  margin-top: 2rem;
`

export const PostContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul, ol {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.lg};
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.lg} 0;
    font-style: italic;
    color: ${props => props.theme.colors.textMuted};
  }

  code {
    background-color: ${props => props.theme.colors.surface};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }
`

export const PostFooter = styled.footer`
  margin-top: 4rem;
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`

export const AuthorBox = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    margin: 0;
  }
`

export const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`

export const PrimaryLinkButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`
