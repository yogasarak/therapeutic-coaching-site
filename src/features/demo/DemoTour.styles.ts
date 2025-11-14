import styled from 'styled-components'

export const TourContainer = styled.div`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;

  @supports (bottom: calc(env(safe-area-inset-bottom) + 1.5rem)) {
    bottom: calc(env(safe-area-inset-bottom) + 1.5rem);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    right: 1rem;
    bottom: 1rem;
  }
`

export const TourPrompt = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  padding: 1rem 1.25rem;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text};
  max-width: 260px;
  line-height: 1.4;
`

export const TourButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xxl};
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`

export const TourContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const StepHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const StepBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary}20;
`

export const StepTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
`

export const StepDescription = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
`

export const StepList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const StepListItem = styled.li`
  color: ${props => props.theme.colors.text};
  line-height: 1.5;
`

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

export const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`

export const ModalFooterRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

export const FooterControls = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`

export const FooterButton = styled.button<{ readonly $variant?: 'ghost' | 'primary' }>`
  padding: 0.6rem 1.2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 600;
  background: ${props =>
    props.$variant === 'primary'
      ? props.theme.colors.primary
      : props.theme.colors.surface};
  color: ${props =>
    props.$variant === 'primary'
      ? '#fff'
      : props.theme.colors.text};
  border: ${props =>
    props.$variant === 'primary'
      ? 'none'
      : `1px solid ${props.theme.colors.border}`};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.sm};
  }
`

export const StepProgress = styled.span`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textMuted};
`
