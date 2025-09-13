 

import React from 'react'
import type { BlogPost } from '@/types'

interface MDXClientBodyProps {
  readonly post: BlogPost
}

const MDXClientBody: React.FC<MDXClientBodyProps> = ({ post }) => {
  if (post.contentMdx) {
    return <>{post.contentMdx}</>
  }
  return <div dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
}

export default MDXClientBody
