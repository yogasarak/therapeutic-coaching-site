'use client'

import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  text-align: center;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.border};
  border-top-color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

const LoadingMessage = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
`
const Loading = () => {
  return (
    <LoadingContainer role="status" aria-live="polite">
      <Spinner aria-hidden="true" />
      <LoadingMessage>Loading...</LoadingMessage>
    </LoadingContainer>
  )
}

export default Loading
