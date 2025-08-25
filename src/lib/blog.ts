import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { marked } from 'marked'
import { BlogPost } from '@/types'
import { slugify } from '@/utils'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

// Configure marked for better parsing
marked.setOptions({
  breaks: true,
  gfm: true,
})

export function getAllPosts(): ReadonlyArray<BlogPost> {
  try {
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
          tags: (data.tags || []) as ReadonlyArray<string>,
          content: marked.parse(content) as string,
          featured: data.featured || false,
        } as BlogPost
      })

    return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error getting all posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

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
      content: marked.parse(content) as string,
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