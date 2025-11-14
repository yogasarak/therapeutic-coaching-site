import styled from 'styled-components'

export const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: visible;
  background: transparent;
`

export const PlayerFrame = styled.iframe<{ readonly $height: number }>`
  width: 100%;
  display: block;
  border: 0;
  height: ${props => `${props.$height}px`};
  min-height: ${props => `${props.$height}px`};
  max-height: none;
`

export const Attribution = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.4;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.03);
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`
