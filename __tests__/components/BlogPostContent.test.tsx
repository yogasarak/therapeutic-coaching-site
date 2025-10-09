import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import BlogPostContent from '@/components/BlogPostContent'
import { theme } from '@/utils/theme'
import type { BlogPost } from '@/types'

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe('BlogPostContent', () => {
  const basePost: BlogPost = {
    slug: 'sample-post',
    title: 'Sample Post Title',
    excerpt: 'Short excerpt',
    date: '2024-10-10',
    readingTime: '3 min read',
    author: 'Therapeutic Coach',
    tags: ['Mindfulness', 'Audio'],
    featured: false,
  }

  it('renders compiled MDX content when provided', () => {
    const mdxBody = <div data-testid="mdx-body">MDX body</div>

    renderWithTheme(<BlogPostContent post={{ ...basePost, contentMdx: mdxBody }} />)

    expect(screen.getByRole('heading', { name: basePost.title })).toBeInTheDocument()
    expect(screen.getByText(/Therapeutic Coach$/)).toBeInTheDocument()
    expect(screen.getByTestId('mdx-body')).toBeInTheDocument()
    expect(screen.queryByText('Short excerpt')).not.toBeInTheDocument()
  })

  it('falls back to sanitized HTML when MDX content is not available', () => {
    renderWithTheme(<BlogPostContent post={{ ...basePost, contentHtml: '<p>HTML body</p>' }} />)

    expect(screen.getByText('HTML body')).toBeInTheDocument()
  })
})
