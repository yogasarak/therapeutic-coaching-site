"use client"

import React from 'react'
import type { BlogPost } from '@/types'
import { formatDate } from '@/utils'
import { mapTagToType } from '@/utils/tags'
import {
  AuthorBox,
  BackLink,
  BlogContainer,
  BlogContainer800,
  BlogHeader,
  BlogMeta,
  BlogTitle,
  BlogTypeBadge,
  FooterActions,
  PostContent,
  PostFooter,
  PrimaryLinkButton,
  Tag,
  TagsContainer,
  TagsContainerWithTopMargin,
} from './BlogPostContent.styles'

interface BlogPostContentProps { readonly post: BlogPost }

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  return (
    <BlogContainer>
      <BlogContainer800>
        <BackLink href="/blog">← Back to Blog</BackLink>

        <BlogHeader>
          <BlogTitle>{post.title}</BlogTitle>

          <BlogMeta>
            <span>By {post.author}</span>
            <span>•</span>
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </BlogMeta>

          {post.tags.length > 0 && (
            <TagsContainerWithTopMargin>
              {post.tags.map(tag => {
                const type = mapTagToType(tag)
                return type ? (
                  <BlogTypeBadge key={tag} $type={type}>{tag}</BlogTypeBadge>
                ) : (
                  <Tag key={tag}>{tag}</Tag>
                )
              })}
            </TagsContainerWithTopMargin>
          )}
        </BlogHeader>

        {post.contentMdx ? (
          <PostContent>{post.contentMdx}</PostContent>
        ) : (
          <PostContent dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} />
        )}

        <PostFooter>
          <AuthorBox>
            <h3>About the Author</h3>
            <p>
              Professional therapeutic coach dedicated to helping individuals navigate
              life&apos;s challenges and discover their inner strength.
            </p>
          </AuthorBox>

          <FooterActions>
            <PrimaryLinkButton href="/blog">← All Posts</PrimaryLinkButton>
            <PrimaryLinkButton href="/#contact">Get In Touch →</PrimaryLinkButton>
          </FooterActions>
        </PostFooter>
      </BlogContainer800>
    </BlogContainer>
  )
}

export default BlogPostContent
