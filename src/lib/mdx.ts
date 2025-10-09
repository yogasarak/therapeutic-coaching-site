import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize, { defaultSchema, type Options as RehypeSanitizeOptions } from 'rehype-sanitize'
import { mdxRscComponents } from '@/components/mdx/rsc-components'

type CompileMDX = typeof import('next-mdx-remote/rsc').compileMDX

let cachedCompile: CompileMDX | null = null

async function getCompile(): Promise<CompileMDX> {
  if (cachedCompile) return cachedCompile
  const mod = await import('next-mdx-remote/rsc')
  cachedCompile = mod.compileMDX
  return cachedCompile
}

const sanitizeSchema: RehypeSanitizeOptions = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'audio', 'source', 'iframe', 'button'],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    '*': [
      ...((defaultSchema.attributes?.['*'] as ReadonlyArray<string> | undefined) ?? []),
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
      'tabindex',
    ],
    audio: ['controls', 'src'],
    source: ['src', 'type'],
    iframe: [
      'src',
      'width',
      'height',
      'allow',
      'allowfullscreen',
      'frameborder',
      'loading',
      'referrerpolicy',
      'title',
    ],
    button: [
      ...((defaultSchema.attributes?.button as ReadonlyArray<string> | undefined) ?? []),
      'type',
      'data-modal-trigger',
      'aria-label',
    ],
    div: [
      ...((defaultSchema.attributes?.div as ReadonlyArray<string> | undefined) ?? []),
      'data-modal',
      'data-modal-title',
      'data-modal-body',
    ],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height'],
  },
  clobberPrefix: '',
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
            [rehypeSanitize, sanitizeSchema],
          ],
        },
      },
      components: mdxRscComponents,
    }
  )
}
