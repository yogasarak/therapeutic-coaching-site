import styled from 'styled-components'

export const ResultsContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`

export const ResultsText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.textMuted};

  p {
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
  }

  small {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textMuted};
  }
`
