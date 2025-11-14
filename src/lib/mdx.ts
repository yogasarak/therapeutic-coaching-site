import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { mdxRscComponents } from '@/components/mdx/rsc-components'
import { audioTracks } from '@/content/media/audioTracks'
import { soundcloudTracks } from '@/content/media/soundcloudTracks'

type CompileMDX = typeof import('next-mdx-remote/rsc').compileMDX

let cachedCompile: CompileMDX | null = null

async function getCompile(): Promise<CompileMDX> {
  if (cachedCompile) return cachedCompile
  const mod = await import('next-mdx-remote/rsc')
  cachedCompile = mod.compileMDX
  return cachedCompile
}

export async function compileBlogMdx(source: string) {
  const compileMDX = await getCompile()

  return compileMDX<{ }>(
    {
      source,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypeSlug],
            [rehypeAutolinkHeadings, { properties: { className: ['heading-anchor'] } }],
          ],
        },
        scope: {
          audioTracks,
          soundcloudTracks,
        },
      },
      components: mdxRscComponents,
    }
  )
}
