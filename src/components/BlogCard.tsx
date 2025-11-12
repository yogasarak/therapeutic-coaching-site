'use client'

import React from 'react'
import { BlogPost } from '@/types'
import { formatDate } from '@/utils'
import {
  Card,
  CardContent,
  CardExcerpt,
  CardFooter,
  CardHeader,
  CardLink,
  CardMeta,
  CardTitle,
  MetaDot,
  ReadMoreButton,
  Tag,
  TagsContainer,
} from './BlogCard.styles'

interface BlogCardProps {
  readonly post: BlogPost
  readonly showFullTags?: boolean
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, showFullTags = false }) => {
  const tagsToShow = showFullTags ? post.tags : post.tags.slice(0, 3)
  const hasMoreTags = !showFullTags && post.tags.length > 3

  return (
    <Card>
      <CardLink href={`/blog/${post.slug}`}>
        <CardHeader>
          <CardMeta>
            <time dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <MetaDot>•</MetaDot>
            <span>{post.readingTime}</span>
            <MetaDot>•</MetaDot>
            <span>{post.author}</span>
          </CardMeta>
          
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <CardExcerpt>{post.excerpt}</CardExcerpt>
        </CardContent>

        <CardFooter>
          {post.tags.length > 0 && (
            <TagsContainer>
              {tagsToShow.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {hasMoreTags && (
                <Tag>+{post.tags.length - 3} more</Tag>
              )}
            </TagsContainer>
          )}
          
          <ReadMoreButton>
            Read full article
          </ReadMoreButton>
        </CardFooter>
      </CardLink>
    </Card>
  )
}

export default BlogCard
