'use client'

import React from 'react'
import { getSoundCloudTrack, type SoundCloudTrackKey } from '@/content/media/soundcloudTracks'
import {
  Attribution,
  PlayerFrame,
  PlayerWrapper,
} from './SoundCloudEmbed.styles'

interface SoundCloudEmbedProps {
  readonly trackKey: SoundCloudTrackKey
  readonly height?: number
  readonly title?: string
  readonly showAttribution?: boolean
  readonly className?: string
}

const SoundCloudEmbed: React.FC<SoundCloudEmbedProps> = ({
  trackKey,
  height,
  title = 'SoundCloud player',
  showAttribution = true,
  className,
}) => {
  const track = getSoundCloudTrack(trackKey)
  const frameHeight = height ?? track.suggestedHeight

  return (
    <PlayerWrapper className={className}>
      <PlayerFrame
        src={track.embedUrl}
        title={title}
        height={frameHeight}
        scrolling="no"
        allow="autoplay"
        loading="lazy"
        referrerPolicy="no-referrer"
        frameBorder="0"
        $height={frameHeight}
      />
      {showAttribution && (
        <Attribution>
          <a href={track.artistUrl} target="_blank" rel="noopener noreferrer">
            {track.artistName}
          </a>
          <span>·</span>
          <a href={track.trackUrl} target="_blank" rel="noopener noreferrer">
            {track.trackTitle}
          </a>
        </Attribution>
      )}
    </PlayerWrapper>
  )
}

export default SoundCloudEmbed
