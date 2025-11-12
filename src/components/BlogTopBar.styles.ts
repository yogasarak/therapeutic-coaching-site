import styled from 'styled-components'

export const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }
`

export const HeaderSection = styled.div`
  flex: 1;
  min-width: 0; /* Allow shrinking */
`

export const SearchSection = styled.div`
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    align-self: stretch;
  }
`
