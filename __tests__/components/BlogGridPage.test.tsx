import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import BlogGridPage from '@/components/BlogGridPage'
import { theme } from '@/utils/theme'
import type { BlogPost } from '@/types'

jest.mock('@/content/spotlights', () => ({
  spotlightPractices: [
    {
      id: 'practice-1',
      title: 'Weekly Reflection Exercise',
      subtitle: 'Mindfulness and self-discovery',
      description: 'Guided reflection exercise',
      content: 'Practice content',
      type: 'reflection',
      createdDate: '2024-10-01',
      progress: 'Week 2 of 4',
      mediaUrl: '/audio/weekly-reflection.mp3',
      mediaType: 'audio',
    },
  ],
}))

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('BlogGridPage', () => {
  const posts: ReadonlyArray<BlogPost> = [
    {
      slug: 'mdx-post',
      title: 'MDX Post',
      excerpt: 'An MDX powered article',
      date: '2024-09-14',
      readingTime: '4 min read',
      author: 'Therapeutic Coach',
      tags: ['growth'],
      featured: false,
    },
  ]

  it('opens and closes the practice spotlight modal', async () => {
    renderWithTheme(<BlogGridPage posts={posts} />)

    expect(screen.getByRole('heading', { name: 'MDX Post' })).toBeInTheDocument()

    const viewButton = screen.getByRole('button', { name: /view practice/i })
    await userEvent.click(viewButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeInTheDocument()
    const headings = within(dialog).getAllByRole('heading', { name: 'Weekly Reflection Exercise' })
    expect(headings.length).toBeGreaterThan(0)

    await userEvent.click(screen.getByRole('button', { name: /close modal/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('filters practice spotlights using the shared search controls', async () => {
    renderWithTheme(<BlogGridPage posts={posts} />)

    expect(screen.getByRole('button', { name: /view practice/i })).toBeInTheDocument()

    const searchInput = screen.getByLabelText('Search blog posts')
    await userEvent.type(searchInput, 'nonexistent topic')

    await waitFor(() => {
      expect(screen.getByText(/no practice spotlights match/i)).toBeInTheDocument()
    })
  })
})
