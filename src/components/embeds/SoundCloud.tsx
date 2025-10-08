'use client'

import React from 'react'
import styled from 'styled-components'

interface SoundCloudProps {
  readonly trackUrl?: string
  readonly playerSrc?: string
  readonly height?: number
  readonly title?: string
  readonly className?: string
}

const Frame = styled.iframe`
  width: 100%;
  border: 0;
  display: block;
`

const SoundCloud: React.FC<SoundCloudProps> = ({
  trackUrl,
  playerSrc,
  height = 166,
  title = 'SoundCloud Player',
  className,
}) => {
  const src = React.useMemo(() => {
    if (playerSrc) return playerSrc
    if (!trackUrl) return ''
    const encoded = encodeURIComponent(trackUrl)
    return `https://w.soundcloud.com/player/?url=${encoded}`
  }, [playerSrc, trackUrl])

  if (!src) return null

  return (
    <Frame
      className={className}
      src={src}
      height={height}
      scrolling="no"
      allow="autoplay"
      loading="lazy"
      referrerPolicy="no-referrer"
      title={title}
      allowFullScreen
    />
  )
}

export default SoundCloud
