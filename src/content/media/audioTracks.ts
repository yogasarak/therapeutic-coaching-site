export const audioTracks = {
  transitionMeditation: {
    key: 'transitionMeditation',
    src: '/audio/transition-meditation.mp3',
    title: 'Meditation With Tias | Finding Strength In The Midst Of Uncertainty',
    artist: 'Prajna Yoga',
    duration: '10:32',
  },
  confidenceSmallWins: {
    key: 'confidenceSmallWins',
    src: '/audio/confidence-small-wins.mp3',
    title: 'Building Confidence Through Small Wins',
    artist: 'Therapeutic Coach',
    duration: '7:45',
  },
  weeklyReflection: {
    key: 'weeklyReflection',
    src: '/audio/weekly-reflection.mp3',
    title: 'Weekly Reflection Exercise',
    artist: 'Therapeutic Coach',
    duration: '8:05',
  },
} as const

export type AudioTrackKey = keyof typeof audioTracks

export interface AudioTrackDescriptor {
  readonly key: AudioTrackKey
  readonly src: string
  readonly title: string
  readonly artist: string
  readonly duration?: string
}

export const getAudioTrack = (key: AudioTrackKey): AudioTrackDescriptor => {
  const track = audioTracks[key]
  if (!track) {
    throw new Error(`Unknown audio track key: ${key as string}`)
  }
  return track
}
