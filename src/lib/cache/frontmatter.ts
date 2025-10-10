import fs from 'fs'
import path from 'path'
import type { BlogPost } from '@/types'

const cacheDir = path.join(process.cwd(), '.cache')
const cacheFile = path.join(cacheDir, 'frontmatter.json')

type FrontmatterSnapshot = {
  mtime: number
  posts: Array<Omit<BlogPost, 'contentHtml' | 'contentMdx'> & {
    contentHtml?: undefined
    contentMdx?: undefined
  }>
}

const ensureCacheDir = () => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
}

export function readFrontmatterSnapshot(mtime: number): ReadonlyArray<BlogPost> | null {
  try {
    if (!fs.existsSync(cacheFile)) {
      return null
    }

    const snapshot: FrontmatterSnapshot = JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
    if (snapshot.mtime !== mtime) {
      return null
    }

    return snapshot.posts
  } catch (error) {
    console.warn('Failed to read frontmatter snapshot, rebuilding.', error)
    return null
  }
}

export function writeFrontmatterSnapshot(posts: ReadonlyArray<BlogPost>, mtime: number) {
  try {
    ensureCacheDir()
    const payload: FrontmatterSnapshot = {
      mtime,
      posts: posts.map(post => ({
        ...post,
        contentHtml: undefined,
        contentMdx: undefined,
      })),
    }

    fs.writeFileSync(cacheFile, JSON.stringify(payload, null, 2))
  } catch (error) {
    console.warn('Failed to write frontmatter snapshot.', error)
  }
}
