import styled from 'styled-components'

export const StoryContainer = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.surface};
`

export const StoryContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`

export const StoryTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
`

export const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing.xxl};
  align-items: center;
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.xl};
  }
`

export const StoryText = styled.div`
  text-align: left;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${props => props.theme.colors.textMuted};
    margin-bottom: ${props => props.theme.spacing.lg};

    &:first-child {
      font-size: 1.3rem;
      color: ${props => props.theme.colors.text};
      font-weight: 500;
    }
  }
`

export const StoryImage = styled.div`
  height: 400px;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.md};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 300px;
    order: -1;
  }
`

export const PlaceholderText = styled.div`
  color: ${props => props.theme.colors.textMuted};
  font-size: 1rem;
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`

export const Highlight = styled.span`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`
