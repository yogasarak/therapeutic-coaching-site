'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { BlogPost } from '@/types'
import { formatDate } from '@/utils'

const Card = styled.article.withConfig({ componentId: 'BlogCard__Card' })`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.theme.colors.primary}30;
  }
`

const CardLink = styled(Link).withConfig({ componentId: 'BlogCard__CardLink' })`
  text-decoration: none;
  color: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div.withConfig({ componentId: 'BlogCard__CardHeader' })`
  padding: 1.5rem 1.5rem 0;
`

const CardMeta = styled.div.withConfig({ componentId: 'BlogCard__CardMeta' })`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textMuted};
  flex-wrap: wrap;
`

const MetaDot = styled.span.withConfig({ componentId: 'BlogCard__MetaDot' })`
  color: ${props => props.theme.colors.border};
`

const CardTitle = styled.h2.withConfig({ componentId: 'BlogCard__CardTitle' })`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`

const CardContent = styled.div.withConfig({ componentId: 'BlogCard__CardContent' })`
  padding: 0 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const CardExcerpt = styled.p.withConfig({ componentId: 'BlogCard__CardExcerpt' })`
  color: ${props => props.theme.colors.textMuted};
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CardFooter = styled.div.withConfig({ componentId: 'BlogCard__CardFooter' })`
  padding: 0 1.5rem 1.5rem;
  margin-top: auto;
`

const TagsContainer = styled.div.withConfig({ componentId: 'BlogCard__TagsContainer' })`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const Tag = styled.span.withConfig({ componentId: 'BlogCard__Tag' })`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: 0.375rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${Card}:hover & {
    background-color: ${props => props.theme.colors.primary}25;
  }
`

const ReadMoreButton = styled.div.withConfig({ componentId: 'BlogCard__ReadMoreButton' })`
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.md};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;

  &::after {
    content: '→';
    transition: transform 0.2s ease;
  }

  ${Card}:hover & {
    color: ${props => props.theme.colors.accent};
    
    &::after {
      transform: translateX(4px);
    }
  }
`

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
