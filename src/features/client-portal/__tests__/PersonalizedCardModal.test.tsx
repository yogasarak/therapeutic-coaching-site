import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import PersonalizedCardModal from '../PersonalizedCardModal'
import { theme } from '@/utils/theme'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('PersonalizedCardModal', () => {
  it('renders HTML audio player when mediaType is audio', () => {
    renderWithTheme(
      <PersonalizedCardModal
        isOpen
        onClose={() => undefined}
        card={{
          id: 'test',
          title: 'Audio Card',
          description: 'desc',
          content: 'Body',
          type: 'audio',
          createdDate: '2024-01-01',
          mediaUrl: '/audio/transition-meditation.mp3',
          mediaType: 'audio',
        }}
      />
    )

    expect(document.querySelector('audio')).not.toBeNull()
  })

  it('renders SoundCloud iframe when mediaType is soundcloud', () => {
    renderWithTheme(
      <PersonalizedCardModal
        isOpen
        onClose={() => undefined}
        card={{
          id: 'test-soundcloud',
          title: 'SoundCloud Card',
          description: 'desc',
          content: 'Body',
          type: 'audio',
          createdDate: '2024-01-01',
          mediaUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A339253174&color=%23b4bcac&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
          mediaType: 'soundcloud',
          mediaOptions: {
            soundcloudTrack: 'sweetSweetSteep',
          },
        }}
      />
    )

    expect(document.querySelector('iframe[src*="w.soundcloud.com/player"]')).not.toBeNull()
  })
})
