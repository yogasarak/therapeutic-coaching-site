import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import sanitizeHtml from 'sanitize-html'
import { marked } from 'marked'
import type { ReactElement } from 'react'
import type { BlogPost } from '@/types'
import { slugify } from '@/utils'
import { compileBlogMdx } from './mdx'
import { readFrontmatterSnapshot, writeFrontmatterSnapshot } from './cache/frontmatter'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

let cachedPosts: ReadonlyArray<BlogPost> | null = null
let cachedMtime = 0
interface CompiledPostCacheEntry {
  readonly hash: string
  readonly content: ReactElement
}

const compiledPostCache = new Map<string, CompiledPostCacheEntry>()

const hashContent = (value: string): string =>
  crypto.createHash('sha256').update(value).digest('hex')

const getDirectoryMtime = (): number => {
  try {
    const stat = fs.statSync(postsDirectory)
    return stat.mtimeMs
  } catch {
    return 0
  }
}

// MDX options shared by compilers
marked.setOptions({ breaks: true, gfm: true })

export function getAllPosts(): ReadonlyArray<BlogPost> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const mtime = getDirectoryMtime()
    if (cachedPosts && cachedMtime === mtime && process.env.NODE_ENV === 'production') {
      return cachedPosts
    }

    const snapshot = readFrontmatterSnapshot(mtime)
    if (snapshot) {
      cachedPosts = snapshot
      cachedMtime = mtime
      return snapshot
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        const readingTimeResult = readingTime(content)

        return {
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || content.slice(0, 150) + '...',
          date: data.date || new Date().toISOString(),
          readingTime: readingTimeResult.text,
          author: data.author || 'Therapeutic Coach',
          tags: (data.tags || []) as ReadonlyArray<string>,
          contentHtml: undefined,
          contentMdx: undefined,
          featured: data.featured || false,
        } as BlogPost
      })

    const sorted = posts.sort((a, b) => (a.date < b.date ? 1 : -1))
    cachedPosts = sorted
    cachedMtime = mtime
    writeFrontmatterSnapshot(sorted, mtime)
    return sorted
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const contentHash = hashContent(fileContents)
    
    const readingTimeResult = readingTime(content)

    // Render Markdown/MDX as HTML and sanitize. Allow audio/source.
    const rawHtml = marked.parse(content) as string
    const sanitizedHtml = sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['audio', 'source', 'iframe', 'button']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': [
          ...(sanitizeHtml.defaults.allowedAttributes['*'] || []),
          'data-modal',
          'data-modal-title',
          'data-modal-trigger',
          'data-modal-body',
          'aria-label',
          'aria-labelledby',
          'aria-describedby',
          'aria-expanded',
          'aria-controls',
          'role',
          'tabindex'
        ],
        audio: ['controls', 'src'],
        source: ['src', 'type'],
        iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading', 'referrerpolicy', 'title', 'scrolling'],
        button: [
          ...((sanitizeHtml.defaults.allowedAttributes.button as ReadonlyArray<string> | undefined) || []),
          'type',
          'data-modal-trigger',
          'aria-label'
        ],
        div: [
          ...((sanitizeHtml.defaults.allowedAttributes.div as ReadonlyArray<string> | undefined) || []),
          'data-modal',
          'data-modal-title',
          'data-modal-body'
        ],
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
      },
      allowedSchemes: ['http', 'https', 'data', 'mailto'],
      allowedIframeHostnames: [
        'w.soundcloud.com',
        'player.soundcloud.com',
        'soundcloud.com',
        'www.youtube.com',
        'player.vimeo.com'
      ],
      transformTags: {
        a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
      },
    })

    let compiledEntry = compiledPostCache.get(slug)
    if (!compiledEntry || compiledEntry.hash !== contentHash) {
      const { content: mdxContent } = await compileBlogMdx(content)
      compiledEntry = {
        hash: contentHash,
        content: mdxContent,
      }
      compiledPostCache.set(slug, compiledEntry)
    }

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      date: data.date || new Date().toISOString(),
      readingTime: readingTimeResult.text,
      author: data.author || 'Therapeutic Coach',
      tags: (data.tags || []) as ReadonlyArray<string>,
      contentHtml: sanitizedHtml,
      contentMdx: compiledEntry.content,
      featured: data.featured || false,
    }
  } catch (error) {
    console.error(`Error getting post by slug ${slug}:`, error)
    return null
  }
}

export function getFeaturedPosts(): ReadonlyArray<BlogPost> {
  try {
    const allPosts = getAllPosts()
    return allPosts.filter(post => post.featured).slice(0, 3)
  } catch (error) {
    console.error('Error getting featured posts:', error)
    return []
  }
}

export function getPostsByTag(tag: string): ReadonlyArray<BlogPost> {
  try {
    const allPosts = getAllPosts()
    return allPosts.filter(post => 
      post.tags.some(postTag => 
        slugify(postTag) === slugify(tag)
      )
    )
  } catch (error) {
    console.error(`Error getting posts by tag ${tag}:`, error)
    return []
  }
}

export function getAllTags(): ReadonlyArray<string> {
  try {
    const allPosts = getAllPosts()
    const tags = new Set<string>()
    
    allPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    
    return Array.from(tags).sort()
  } catch (error) {
    console.error('Error getting all tags:', error)
    return []
  }
}
