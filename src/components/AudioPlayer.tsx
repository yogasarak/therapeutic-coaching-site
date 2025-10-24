import React from 'react'

export interface AudioPlayerProps extends React.ComponentPropsWithoutRef<'audio'> {
  readonly src: string
  readonly sources?: ReadonlyArray<{ readonly src: string; readonly type?: string }>
}

const AudioPlayer = React.forwardRef<HTMLAudioElement, AudioPlayerProps>(({
  src,
  sources,
  children,
  preload = 'metadata',
  ...rest
}, ref) => {
  const audioSources = sources && sources.length > 0
    ? sources
    : [{ src, type: 'audio/mpeg' }]

  return (
    <audio ref={ref} controls preload={preload} {...rest}>
      {audioSources.map(source => (
        <source key={`${source.src}-${source.type ?? 'audio/mpeg'}`} src={source.src} type={source.type} />
      ))}
      {children ?? 'Your browser does not support the audio element.'}
    </audio>
  )
})

AudioPlayer.displayName = 'AudioPlayer'

export default AudioPlayer
