import styled from 'styled-components'

export const SocialContainer = styled.div<{ 
  readonly $spacing: 'tight' | 'normal' | 'wide'
  readonly $layout: 'horizontal' | 'vertical'
}>`
  display: flex;
  align-items: ${props => props.$layout === 'vertical' ? 'flex-start' : 'center'};
  flex-direction: ${props => props.$layout === 'vertical' ? 'column' : 'row'};
  gap: ${props => {
    switch (props.$spacing) {
      case 'tight': return '0.5rem'
      case 'wide': return '1.5rem'
      default: return '1rem'
    }
  }};
`

const baseSocialStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 1.2rem;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return `
        width: 32px;
        height: 32px;
        font-size: 0.9rem;
      `
    case 'large':
      return `
        width: 48px;
        height: 48px;
        font-size: 1.4rem;
      `
    default:
      return `
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
      `
  }
}

const getPlatformColors = (platform: string, color: 'default' | 'light' | 'dark') => {
  if (color === 'light') {
    return `
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      border: 1px solid rgba(255, 255, 255, 0.3);
      
      &:hover {
        background: white;
        color: #000;
      }
    `
  }
  
  if (color === 'dark') {
    return `
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
      
      &:hover {
        background: rgba(0, 0, 0, 0.9);
        border-color: rgba(255, 255, 255, 0.2);
      }
    `
  }
  
  switch (platform) {
    case 'facebook':
      return `
        background: linear-gradient(135deg, #1877F2, #42A5F5);
        color: white;
        &:hover { background: linear-gradient(135deg, #166FE5, #1976D2); }
      `
    case 'twitter':
      return `
        background: linear-gradient(135deg, #1DA1F2, #42A5F5);
        color: white;
        &:hover { background: linear-gradient(135deg, #1A91DA, #1976D2); }
      `
    case 'instagram':
      return `
        background: linear-gradient(135deg, #E4405F, #F77737, #FCAF45);
        color: white;
        &:hover { background: linear-gradient(135deg, #D63384, #E85D33, #F39C12); }
      `
    case 'linkedin':
      return `
        background: linear-gradient(135deg, #0A66C2, #42A5F5);
        color: white;
        &:hover { background: linear-gradient(135deg, #0950A3, #1976D2); }
      `
    case 'youtube':
      return `
        background: linear-gradient(135deg, #FF0000, #FF4444);
        color: white;
        &:hover { background: linear-gradient(135deg, #E60000, #FF3333); }
      `
    case 'tiktok':
      return `
        background: linear-gradient(135deg, #000000, #333333);
        color: white;
        &:hover { background: linear-gradient(135deg, #111111, #444444); }
      `
    default:
      return `
        background: #667eea;
        color: white;
        &:hover { background: #764ba2; }
      `
  }
}

export const SocialIcon = styled.a<{
  readonly $platform: string
  readonly $size: 'small' | 'medium' | 'large'
  readonly $color: 'default' | 'light' | 'dark'
  readonly $showLabel?: boolean
}>`
  ${baseSocialStyles}
  ${props => getSizeStyles(props.$size)}
  ${props => getPlatformColors(props.$platform, props.$color)}
  ${props => props.$showLabel && `
    flex-direction: column;
    gap: 0.25rem;
    width: auto;
    height: auto;
    padding: 0.5rem;
    border-radius: 8px;
    
    .social-label {
      font-size: 0.7rem;
      font-weight: 500;
      text-align: center;
      opacity: 0.9;
    }
  `}
`

export const PersonalIcon = styled.a<{
  readonly $size: 'small' | 'medium' | 'large'
  readonly $color: 'default' | 'light' | 'dark'
  readonly $showLabel?: boolean
}>`
  ${baseSocialStyles}
  ${props => getSizeStyles(props.$size)}
  ${props => {
    if (props.$color === 'light') {
      return `
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        border: 1px solid rgba(255, 255, 255, 0.3);
        
        &:hover {
          background: white;
          color: #000;
        }
      `
    }
    
    if (props.$color === 'dark') {
      return `
        background: rgba(0, 0, 0, 0.8);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        
        &:hover {
          background: rgba(0, 0, 0, 0.9);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `
    }
    
    return `
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      &:hover { 
        background: linear-gradient(135deg, #5a6fd8, #6a4190);
      }
    `
  }}
  
  ${props => props.$showLabel && `
    flex-direction: column;
    gap: 0.25rem;
    width: auto;
    height: auto;
    padding: 0.5rem;
    border-radius: 8px;
    
    .social-label {
      font-size: 0.7rem;
      font-weight: 500;
      text-align: center;
      opacity: 0.9;
    }
  `}
`