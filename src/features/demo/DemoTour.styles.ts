import styled, { keyframes } from 'styled-components'

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

export const TourButtonWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  background: linear-gradient(135deg, #FFBF91 0%, #FBCBFF 35%, #FFE3D4 70%, #FFEC8A 100%);
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xl};
    font-size: 0.95rem;
    gap: 0.5rem;
  }
`

const sparkleFloat = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.9;
  }
  50% {
    transform: translateY(-6px) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.85;
  }
`

export const Sparkle = styled.span<{ readonly $delay: number; readonly $duration: number }>`
  position: absolute;
  font-size: 1.2rem;
  pointer-events: none;
  animation: ${sparkleFloat} ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
`

export const TourContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const StepHeader = styled.header`
  display: flex;
  flex-direction: column;
`

export const StepBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.85rem;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary}20;
  margin-bottom: 0.85rem;
`

export const StepTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text};
`

export const StepDescription = styled.p`
  margin: 0;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.55;
  font-size: 0.95rem;
`

export const StepList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`

export const StepListItem = styled.li`
  color: ${props => props.theme.colors.text};
  line-height: 1.45;
  font-size: 0.95rem;
`

export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`

export const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background: linear-gradient(135deg, #FFBF91 0%, #FBCBFF 35%, #FFE3D4 70%, #FFEC8A 100%);
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    color: ${props => props.theme.colors.text};
  }

  &:focus-visible {
    color: ${props => props.theme.colors.text};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.4rem 0.85rem;
    font-size: 0.8rem;
  }
`

export const ModalFooterRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
`

export const FooterControls = styled.div`
  display: flex;
  gap: 0.65rem;
  align-items: center;
`

export const FooterButton = styled.button<{ readonly $variant?: 'ghost' | 'primary' }>`
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.9rem;
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
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
`
