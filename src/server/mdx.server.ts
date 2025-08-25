import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { marked } from 'marked'
import { BlogPost } from '@/types'
import { slugify } from '@/utils'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export const getAllPosts = (): ReadonlyArray<BlogPost> => {
  if (!fs.existsSync(postsDirectory)) {
    return []
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
        tags: data.tags || [],
        content: String(marked.parse(content)),
        featured: data.featured || false,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return posts
}

export const getPostBySlug = (slug: string): BlogPost | null => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
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
      tags: data.tags || [],
      content: String(marked.parse(content)),
      featured: data.featured || false,
    }
  } catch {
    return null
  }
}

export const getFeaturedPosts = (): ReadonlyArray<BlogPost> => {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured).slice(0, 3)
}

export const getPostsByTag = (tag: string): ReadonlyArray<BlogPost> => {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      slugify(postTag) === slugify(tag)
    )
  )
}

export const getAllTags = (): ReadonlyArray<string> => {
  const allPosts = getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}