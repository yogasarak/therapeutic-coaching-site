import styled from 'styled-components'

export const ImageWrapper = styled.div<{ readonly fill?: boolean }>`
  position: ${props => (props.fill ? 'relative' : 'static')};
  width: ${props => (props.fill ? '100%' : 'auto')};
  height: ${props => (props.fill ? '100%' : 'auto')};
  
  img {
    border-radius: inherit;
    object-fit: cover;
  }
`
