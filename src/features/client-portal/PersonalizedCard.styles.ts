import styled from 'styled-components'

export const Card = styled.article`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);
    border-color: ${props => props.theme.colors.primary}40;
  }

  &:active {
    transform: translateY(-2px);
  }
`

export const CardBadges = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  z-index: 1;
`

export const CardBadge = styled.div<{ readonly $type: 'personal' | 'exercise' | 'reflection' | 'goal' | 'audio' }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${props => {
    switch (props.$type) {
      case 'personal':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        `
      case 'exercise':
        return `
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
        `
      case 'reflection':
        return `
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        `
      case 'goal':
        return `
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          color: white;
        `
      case 'audio':
        return `
          background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
          color: white;
        `
      default:
        return `
          background: ${props.theme.colors.primary};
          color: ${props.theme.colors.background};
        `
    }
  }}
`

export const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0;
  position: relative;
  /* Add right margin to prevent badge overlap */
  margin-right: 5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-right: 4rem;
  }
`

export const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.colors.text};
  /* Remove line clamping to allow natural wrapping */
  word-wrap: break-word;
  hyphens: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.1rem;
  }
`

export const CardSubtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  font-weight: 500;
`

export const CardContent = styled.div`
  padding: 0 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`

export const CardDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const CardFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const CardDate = styled.time`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
`

export const CardProgress = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`

export const CardAction = styled.div`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &::after {
    content: '→';
    transition: transform 0.2s ease;
  }

  ${Card}:hover & {
    color: ${props => props.theme.colors.accent};
    
    &::after {
      transform: translateX(4px);
    }
  }
`