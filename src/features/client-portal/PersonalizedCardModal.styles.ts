import styled from 'styled-components'

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
`

export const CardTypeHeader = styled.div<{ readonly $type: 'personal' | 'exercise' | 'reflection' | 'goal' | 'audio' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  align-self: flex-start;
  
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

export const CardSubtitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  font-weight: 500;
  line-height: 1.5;
`

export const CardMainContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.text};
  }

  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  h4 { font-size: 1.125rem; }

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: 1rem;
    margin: 1.5rem 0;
    font-style: italic;
    color: ${props => props.theme.colors.textMuted};
    background-color: ${props => props.theme.colors.surface || props.theme.colors.primary + '10'};
    padding: 1rem 1rem 1rem 2rem;
    border-radius: 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0;
  }

  strong {
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  em {
    font-style: italic;
  }

  code {
    background-color: ${props => props.theme.colors.surface || props.theme.colors.border};
    padding: 0.2em 0.4em;
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: 0.9em;
    font-family: 'Monaco', 'Consolas', monospace;
  }
`

export const CardMetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin-top: 2rem;
`

export const CardDate = styled.time`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`

export const CardProgress = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`
