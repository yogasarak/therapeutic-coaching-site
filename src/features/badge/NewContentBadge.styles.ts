import styled, { keyframes } from 'styled-components'

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 193, 7, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
  }
`

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return `
        padding: 0.25rem 0.5rem;
        font-size: 0.7rem;
        border-radius: 12px;
      `
    case 'large':
      return `
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        border-radius: 20px;
      `
    default:
      return `
        padding: 0.35rem 0.75rem;
        font-size: 0.75rem;
        border-radius: 16px;
      `
  }
}

const getVariantStyles = (variant: 'default' | 'pulse' | 'subtle') => {
  switch (variant) {
    case 'pulse':
      return `
        background: linear-gradient(135deg, #FFC107, #FF9800);
        color: white;
        animation: ${pulseAnimation} 2s infinite;
        box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
      `
    case 'subtle':
      return `
        background: rgba(255, 193, 7, 0.1);
        color: #F57F17;
        border: 1px solid rgba(255, 193, 7, 0.2);
      `
    default:
      return `
        background: linear-gradient(135deg, #FFC107, #FFD54F);
        color: white;
        box-shadow: 0 2px 6px rgba(255, 193, 7, 0.3);
      `
  }
}

export const Badge = styled.div<{
  readonly $size: 'small' | 'medium' | 'large'
  readonly $variant: 'default' | 'pulse' | 'subtle'
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: all 0.2s ease;
  
  ${props => getSizeStyles(props.$size)}
  ${props => getVariantStyles(props.$variant)}
  
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }
`

export const BadgeIcon = styled.span`
  font-size: 0.9em;
  line-height: 1;
  display: flex;
  align-items: center;
`

export const BadgeText = styled.span`
  line-height: 1;
  font-weight: inherit;
`