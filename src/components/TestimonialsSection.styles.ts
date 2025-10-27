import styled from 'styled-components'

export const TestimonialsContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary}10 0%,
    ${props => props.theme.colors.secondary}10 100%
  );
`

export const TestimonialsContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const TestimonialsTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
`

export const TestimonialCard = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  margin: ${props => props.theme.spacing.xl} 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

export const TestimonialText = styled.blockquote`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  font-style: italic;
  margin-bottom: ${props => props.theme.spacing.lg};
  border: none;
  padding: 0;
  
  &::before {
    content: '"';
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    line-height: 0;
    margin-right: ${props => props.theme.spacing.xs};
  }
  
  &::after {
    content: '"';
    font-size: 3rem;
    color: ${props => props.theme.colors.primary};
    line-height: 0;
    margin-left: ${props => props.theme.spacing.xs};
  }
`

export const TestimonialAuthor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`

export const AuthorName = styled.div`
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
`

export const AuthorRole = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 0.9rem;
`

export const StarRating = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-bottom: ${props => props.theme.spacing.sm};
`

export const Star = styled.span`
  color: ${props => props.theme.colors.accent};
  font-size: 1.2rem;
`

export const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
`

export const NavButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.accent};
    transform: scale(1.1);
    @media (prefers-reduced-motion: reduce) { transform: none; }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Indicators = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`

export const Indicator = styled.button<{ readonly $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props =>
    props.$isActive
      ? props.theme.colors.primary
      : props.theme.colors.border
  };
  cursor: pointer;
  transition: all 0.2s ease;
  @media (prefers-reduced-motion: reduce) { transition: none; }
  
  &:hover {
    background: ${props => props.theme.colors.primary};
  }
`
