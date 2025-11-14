import styled from 'styled-components'
import AudioPlayerBase from '@/components/AudioPlayer'

export const MediaContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: visible;
  background: ${props => props.theme.colors.surface || props.theme.colors.background};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export const MediaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}08, ${props => props.theme.colors.accent}08);
  border-bottom: 1px solid ${props => props.theme.colors.border};
`

export const MediaIcon = styled.div`
  font-size: 1.25rem;
  line-height: 1;
`

export const MediaInfo = styled.div`
  flex: 1;
`

export const MediaTitle = styled.h4`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`

export const MediaDuration = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textMuted};
`

export const MediaContent = styled.div`
  position: relative;
  width: 100%;
  
  iframe {
    width: 100%;
    border: none;
    border-radius: 0;
  }
`

export const AudioPlayer = styled(AudioPlayerBase)`
  width: 100%;
  height: 54px;
  background: ${props => props.theme.colors.background};
  
  &::-webkit-media-controls-panel {
    background-color: ${props => props.theme.colors.background};
  }
  
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-pause-button {
    background-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
  }
`

export const VideoPlayer = styled.video`
  width: 100%;
  max-height: 400px;
  background: ${props => props.theme.colors.surface || '#000'};
`

export const EmbedFrame = styled.iframe<{ readonly $aspectRatio?: number; readonly $height?: number }>`
  width: 100%;
  height: ${props => {
    if (props.$height) {
      return `${props.$height}px`
    }
    return props.$aspectRatio ? `${100 / props.$aspectRatio}vw` : '166px'
  }};
  min-height: ${props => props.$height ? `${props.$height}px` : '166px'};
  max-height: 400px;
  border: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: ${props => {
      if (props.$height) {
        return `${Math.max(props.$height - 20, 140)}px`
      }
      return props.$aspectRatio ? `${100 / props.$aspectRatio * 0.9}vw` : '200px'
    }};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: ${props => {
      if (props.$height) {
        return `${Math.max(props.$height - 36, 130)}px`
      }
      return props.$aspectRatio ? `${100 / props.$aspectRatio * 0.85}vw` : '180px'
    }};
  }
`

export const ErrorMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${props => props.theme.colors.textMuted};
  background: ${props => props.theme.colors.surface || props.theme.colors.border};
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
`

export const SoundCloudPlaceholder = styled.div<{ readonly $height: number }>`
  width: 100%;
  min-height: ${props => `${props.$height}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.4;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.04);
  color: ${props => props.theme.colors.textMuted};
`
