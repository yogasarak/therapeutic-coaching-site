'use client'

import React from 'react'
import styled from 'styled-components'
import { getSoundCloudTrack, type SoundCloudTrackKey } from '@/content/media/soundcloudTracks'

const PlayerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  background: ${props => props.theme.colors.surface || props.theme.colors.background};
`

const PlayerFrame = styled.iframe<{ readonly $height: number }>`
  width: 100%;
  border: 0;
  height: ${props => `${props.$height}px`};
  min-height: ${props => `${props.$height}px`};
`

const Attribution = styled.div`
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
