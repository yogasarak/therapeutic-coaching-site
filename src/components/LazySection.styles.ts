import styled from 'styled-components'

export const SectionSkeleton = styled.div`
  min-height: 400px;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.surface} 0%,
    ${props => props.theme.colors.border} 50%,
    ${props => props.theme.colors.surface} 100%
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: loading 1.5s infinite;
  border-radius: ${props => props.theme.borderRadius.lg};
  margin: ${props => props.theme.spacing.xl} 0;

  @keyframes loading {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`
