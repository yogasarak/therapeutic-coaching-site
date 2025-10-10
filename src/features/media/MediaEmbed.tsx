'use client'

import React from 'react'
import SoundCloudEmbed from '@/components/embeds/SoundCloudEmbed'
import { findSoundCloudTrackByEmbedUrl, type SoundCloudTrackKey } from '@/content/media/soundcloudTracks'
import {
  MediaContainer,
  MediaHeader,
  MediaIcon,
  MediaInfo,
  MediaTitle,
  MediaDuration,
  MediaContent,
  AudioPlayer,
  VideoPlayer,
  EmbedFrame,
  ErrorMessage,
  SoundCloudPlaceholder,
} from './MediaEmbed.styles'

interface MediaEmbedProps {
  readonly mediaUrl: string
  readonly mediaType: 'audio' | 'video' | 'soundcloud' | 'youtube'
  readonly title?: string
  readonly duration?: string
  readonly options?: {
    readonly soundcloudTrack?: SoundCloudTrackKey
  }
}

const getMediaIcon = (type: string): string => {
  switch (type) {
    case 'audio': return '🎵'
    case 'video': return '🎥'
    case 'soundcloud': return '☁️'
    case 'youtube': return '▶️'
    default: return '📄'
  }
}

const getMediaTitle = (type: string): string => {
  switch (type) {
    case 'audio': return 'Audio Recording'
    case 'video': return 'Video Content'
    case 'soundcloud': return 'SoundCloud Audio'
    case 'youtube': return 'YouTube Video'
    default: return 'Media Content'
  }
}

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  return null
}

const resolveSoundCloudTrack = (embedUrl: string, explicitKey?: SoundCloudTrackKey) => {
  if (explicitKey) {
    return explicitKey
  }
  const match = findSoundCloudTrackByEmbedUrl(embedUrl)
  return match?.key ?? null
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({
  mediaUrl,
  mediaType,
  title,
  duration,
  options,
}) => {
  const renderMedia = () => {
    switch (mediaType) {
      case 'audio':
        if (mediaUrl.includes('soundcloud.com')) {
          return (
            <ErrorMessage>
              <p>
                SoundCloud URLs should use mediaType <code>soundcloud</code> with a registered track key.
              </p>
            </ErrorMessage>
          )
        }
        return (
          <AudioPlayer
            src={mediaUrl}
            preload="metadata"
          />
        )

      case 'soundcloud': {
        const trackKey = resolveSoundCloudTrack(mediaUrl, options?.soundcloudTrack)
        if (!trackKey) {
          return (
            <SoundCloudPlaceholder $height={166}>
              SoundCloud embed unavailable. Please ensure this track is registered in `soundcloudTracks`.
            </SoundCloudPlaceholder>
          )
        }

        return <SoundCloudEmbed trackKey={trackKey} title={title || getMediaTitle(mediaType)} />
      }

      case 'video':
        return (
          <VideoPlayer controls preload="metadata">
            <source src={mediaUrl} type="video/mp4" />
            <source src={mediaUrl} type="video/webm" />
            <source src={mediaUrl} type="video/ogg" />
            Your browser does not support the video element.
          </VideoPlayer>
        )

      case 'youtube':
        const youtubeId = extractYouTubeId(mediaUrl)
        const youtubeEmbed = youtubeId
          ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
          : mediaUrl

        return (
          <EmbedFrame
            src={youtubeEmbed}
            $aspectRatio={16 / 9}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )

      default:
        return (
          <ErrorMessage>
            <p>Unsupported media type: {mediaType}</p>
          </ErrorMessage>
        )
    }
  }

  const mediaContent = renderMedia()

  return (
    <MediaContainer>
      <MediaHeader>
        <MediaIcon>{getMediaIcon(mediaType)}</MediaIcon>
        <MediaInfo>
          <MediaTitle>{title || getMediaTitle(mediaType)}</MediaTitle>
          {duration && <MediaDuration>{duration}</MediaDuration>}
        </MediaInfo>
      </MediaHeader>
      <MediaContent>
        {mediaContent}
      </MediaContent>
    </MediaContainer>
  )
}

export default MediaEmbed
