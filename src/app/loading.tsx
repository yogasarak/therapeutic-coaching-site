'use client'

import { LoadingContainer, LoadingMessage, Spinner } from './loading.styles'

const Loading = () => {
  return (
    <LoadingContainer role="status" aria-live="polite">
      <Spinner aria-hidden="true" />
      <LoadingMessage>Loading...</LoadingMessage>
    </LoadingContainer>
  )
}

export default Loading
