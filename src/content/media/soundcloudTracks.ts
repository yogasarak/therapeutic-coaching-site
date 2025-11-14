export const soundcloudTracks = {
  sweetSweetSteep: {
    key: 'sweetSweetSteep',
    embedUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A339253174&color=%23b4bcac&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    apiUrl: 'https://api.soundcloud.com/tracks/339253174',
    artistName: 'Meghan Currie',
    artistUrl: 'https://soundcloud.com/meghancurrie',
    trackTitle: 'Meditation- Sweet Sweet Steep',
    trackUrl: 'https://soundcloud.com/meghancurrie/meditation-sweet-sweet-steep',
    suggestedHeight: 300,
  },
} as const

export type SoundCloudTrackKey = keyof typeof soundcloudTracks

export interface SoundCloudTrackDescriptor {
  readonly key: SoundCloudTrackKey
  readonly embedUrl: string
  readonly apiUrl: string
  readonly artistName: string
  readonly artistUrl: string
  readonly trackTitle: string
  readonly trackUrl: string
  readonly suggestedHeight: number
}

export const getSoundCloudTrack = (key: SoundCloudTrackKey): SoundCloudTrackDescriptor => {
  const track = soundcloudTracks[key]
  if (!track) {
    throw new Error(`Unknown SoundCloud track key: ${key as string}`)
  }
  return track
}

export const findSoundCloudTrackByEmbedUrl = (embedUrl: string): SoundCloudTrackDescriptor | null => {
  const entry = Object.values(soundcloudTracks).find(track => track.embedUrl === embedUrl)
  return entry ?? null
}
