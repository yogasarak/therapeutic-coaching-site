'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { BlogPost } from '@/types'
import { formatDate, slugify } from '@/utils'
import BlogConsumerController from './BlogConsumerController'
import {
  AuthorBox,
  BackLink,
  BlogArticle,
  BlogContainer,
  BlogContainer800,
  BlogExcerpt,
  BlogGrid,
  BlogHeader,
  BlogMeta,
  BlogPostTitle,
  BlogSubtitle,
  BlogTitle,
  BlogTypeBadge,
  CardLink,
  Container,
  EmptyState,
  FooterActions,
  PostContent,
  PostFooter,
  PrimaryLinkButton,
  Tag,
  TagsContainer,
  TagsContainerWithTopMargin,
  ToggleButton,
  ViewToggle,
} from './BlogComponents.styles'

const mapTagToType = (tag: string): 'personal' | 'exercise' | 'reflection' | 'goal' | 'audio' | null => {
  const t = slugify(tag)
  if (t.includes('exercise') || t.includes('practice') || t.includes('homework')) return 'exercise'
  if (t.includes('reflection') || t.includes('journal')) return 'reflection'
  if (t.includes('goal')) return 'goal'
  if (t.includes('audio') || t.includes('podcast')) return 'audio'
  if (t.includes('personal')) return 'personal'
  return null
}


interface BlogListPageProps {
  readonly posts: ReadonlyArray<BlogPost>
  readonly showViewToggle?: boolean
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ posts, showViewToggle = false }) => {
  const [filteredPosts, setFilteredPosts] = useState<ReadonlyArray<BlogPost>>(posts)

  // Update filtered posts when posts prop changes
  useEffect(() => {
    setFilteredPosts(posts)
  }, [posts])

  const handleFilteredPostsChange = useCallback((newFilteredPosts: ReadonlyArray<BlogPost>) => {
    setFilteredPosts(newFilteredPosts)
  }, [])

  return (
    <BlogContainer>
      <Container>
        <BackLink href="/">← Back to Home</BackLink>

        <BlogHeader>
          <BlogTitle>Blog</BlogTitle>
          <BlogSubtitle>
            Insights on personal growth, healing, and the therapeutic journey
          </BlogSubtitle>
        </BlogHeader>

        {showViewToggle && (
          <ViewToggle>
            <ToggleButton href="/blog" $isActive={false}>
              Card View
            </ToggleButton>
            <ToggleButton href="/blog/list" $isActive={true}>
              List View
            </ToggleButton>
          </ViewToggle>
        )}

        <BlogConsumerController
          posts={posts}
          onFilteredPostsChange={handleFilteredPostsChange}
          title="Blog"
          subtitle="Insights on personal growth, healing, and the therapeutic journey"
        />

        {filteredPosts.length === 0 ? (
          <EmptyState>
            <p>
              {posts.length === 0
                ? "No blog posts yet. Check back soon!"
                : "No posts match your search criteria. Try adjusting your filters."
              }
            </p>
          </EmptyState>
        ) : (
          <BlogGrid>
            {filteredPosts.map(post => (
              <BlogArticle key={post.slug}>
                <CardLink href={`/blog/${post.slug}`}>
                  <BlogMeta>
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </BlogMeta>

                  <BlogPostTitle>{post.title}</BlogPostTitle>

                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>

                  {post.tags.length > 0 && (
                    <TagsContainer>
                      {post.tags.slice(0, 3).map(tag => {
                        const type = mapTagToType(tag)
                        return type ? (
                          <BlogTypeBadge key={tag} $type={type}>{tag}</BlogTypeBadge>
                        ) : (
                          <Tag key={tag}>{tag}</Tag>
                        )
                      })}
                    </TagsContainer>
                  )}
                </CardLink>
              </BlogArticle>
            ))}
          </BlogGrid>
        )}
      </Container>
    </BlogContainer>
  )
}

interface BlogPostPageProps {
  readonly post: BlogPost
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post }) => {
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
        {/* <PostContent dangerouslySetInnerHTML={{ __html: trustHTML(post.content) }} /> */}

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
