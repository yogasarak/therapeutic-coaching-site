'use client'

import React, { useState } from 'react'
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
  LoadingSpinner
} from './MediaEmbed.styles'

interface MediaEmbedProps {
  readonly mediaUrl: string
  readonly mediaType: 'audio' | 'video' | 'soundcloud' | 'youtube'
  readonly title?: string
  readonly duration?: string
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

// Extract SoundCloud track ID from URL
const extractSoundCloudId = (url: string): string | null => {
  // Handle both soundcloud.com and direct embed URLs
  const trackMatch = url.match(/soundcloud\.com\/[^/]+\/([^?&]+)/)
  if (trackMatch) {
    return url // Return full URL for embed API
  }
  
  // Handle direct embed URLs
  const embedMatch = url.match(/w\.soundcloud\.com\/player\/\?url=([^&]+)/)
  if (embedMatch) {
    return decodeURIComponent(embedMatch[1])
  }
  
  return url // Return as-is if no pattern matches
}

// Extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  return null
}

export const MediaEmbed: React.FC<MediaEmbedProps> = ({
  mediaUrl,
  mediaType,
  title,
  duration
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const renderMedia = () => {
    if (hasError) {
      return (
        <ErrorMessage>
          <p>Unable to load media content. Please check the URL.</p>
        </ErrorMessage>
      )
    }

    switch (mediaType) {
      case 'audio':
        return (
          <MediaContent>
            <AudioPlayer
              controls
              preload="metadata"
              onLoadedData={handleLoad}
              onError={handleError}
            >
              <source src={mediaUrl} type="audio/mpeg" />
              <source src={mediaUrl} type="audio/ogg" />
              <source src={mediaUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </AudioPlayer>
          </MediaContent>
        )

      case 'video':
        return (
          <MediaContent>
            <VideoPlayer
              controls
              preload="metadata"
              onLoadedData={handleLoad}
              onError={handleError}
            >
              <source src={mediaUrl} type="video/mp4" />
              <source src={mediaUrl} type="video/webm" />
              <source src={mediaUrl} type="video/ogg" />
              Your browser does not support the video element.
            </VideoPlayer>
          </MediaContent>
        )

      case 'soundcloud':
        const soundcloudUrl = extractSoundCloudId(mediaUrl)
        const soundcloudEmbed = soundcloudUrl?.includes('soundcloud.com') 
          ? `https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`
          : mediaUrl

        return (
          <MediaContent>
            {isLoading && <LoadingSpinner />}
            <EmbedFrame
              src={soundcloudEmbed}
              $aspectRatio={16/9}
              allow="autoplay"
              onLoad={handleLoad}
              onError={handleError}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </MediaContent>
        )

      case 'youtube':
        const youtubeId = extractYouTubeId(mediaUrl)
        const youtubeEmbed = youtubeId 
          ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`
          : mediaUrl

        return (
          <MediaContent>
            {isLoading && <LoadingSpinner />}
            <EmbedFrame
              src={youtubeEmbed}
              $aspectRatio={16/9}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onLoad={handleLoad}
              onError={handleError}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          </MediaContent>
        )

      default:
        return (
          <ErrorMessage>
            <p>Unsupported media type: {mediaType}</p>
          </ErrorMessage>
        )
    }
  }

  return (
    <MediaContainer>
      <MediaHeader>
        <MediaIcon>{getMediaIcon(mediaType)}</MediaIcon>
        <MediaInfo>
          <MediaTitle>{title || getMediaTitle(mediaType)}</MediaTitle>
          {duration && <MediaDuration>{duration}</MediaDuration>}
        </MediaInfo>
      </MediaHeader>
      {renderMedia()}
    </MediaContainer>
  )
}

export default MediaEmbed