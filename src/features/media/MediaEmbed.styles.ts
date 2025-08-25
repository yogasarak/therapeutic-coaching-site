import styled from 'styled-components'

export const MediaContainer = styled.div`
  width: 100%;
  margin: 1.5rem 0;
  border-radius: ${props => props.theme.borderRadius.lg};
  overflow: hidden;
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

export const AudioPlayer = styled.audio`
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

export const EmbedFrame = styled.iframe<{ readonly $aspectRatio?: number }>`
  width: 100%;
  height: ${props => props.$aspectRatio ? `${100 / props.$aspectRatio}vw` : '166px'};
  min-height: 166px;
  max-height: 400px;
  border: none;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: ${props => props.$aspectRatio ? `${100 / props.$aspectRatio * 0.9}vw` : '200px'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: ${props => props.$aspectRatio ? `${100 / props.$aspectRatio * 0.85}vw` : '180px'};
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

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textMuted};
  
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.theme.colors.border};
    border-top-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`