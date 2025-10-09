import fs from 'fs'
import path from 'path'
import React from 'react'

jest.mock('marked', () => ({
  marked: {
    parse: (md: string) => md,
    setOptions: jest.fn(),
  },
}))

import { getPostBySlug } from '@/lib/blog'
import { compileBlogMdx } from '@/lib/mdx'

jest.mock('@/lib/mdx', () => ({
  compileBlogMdx: jest.fn(async () => ({ content: <div data-testid="compiled-mdx" /> })),
}))

const mockedCompile = compileBlogMdx as jest.MockedFunction<typeof compileBlogMdx>

const postsDirectory = path.join(process.cwd(), 'src/content/blog')
const testSlug = '__test-mdx-post'
const testFilePath = path.join(postsDirectory, `${testSlug}.mdx`)

beforeAll(() => {
  const fileContents = `---\ntitle: Test Post\ndate: 2024-10-10\nauthor: Tester\n---\n\n<button data-modal="true" data-modal-title="Modal Title">Open</button>\n<script>alert('xss')</script>`
  fs.writeFileSync(testFilePath, fileContents)
})

afterAll(() => {
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath)
  }
})

describe('getPostBySlug', () => {
  it('returns sanitized HTML and compiled MDX, caching the compiled result', async () => {
    mockedCompile.mockClear()

    const firstCall = await getPostBySlug(testSlug)
    expect(firstCall).not.toBeNull()
    expect(mockedCompile).toHaveBeenCalledTimes(1)
    expect(firstCall?.contentHtml).toContain('data-modal="true"')
    expect(firstCall?.contentHtml).not.toContain('<script')
    expect(firstCall?.contentMdx?.props['data-testid']).toBe('compiled-mdx')

    const secondCall = await getPostBySlug(testSlug)
    expect(secondCall).not.toBeNull()
    expect(mockedCompile).toHaveBeenCalledTimes(1)
  })
})
