"use client"

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import type { BlogPost } from '@/types'
import { formatDate } from '@/utils'
import { CardBadge as TypeBadge } from '@/features/client-portal/PersonalizedCard.styles'
import { mapTagToType } from '@/utils/tags'

const BlogContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 4rem ${props => props.theme.spacing.md};
  }
`

const BlogContainer800 = styled(Container)`
  max-width: 800px;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover { color: ${props => props.theme.colors.accent}; }
`

const BlogHeader = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`

const BlogTitle = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.secondary};
`

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  flex-wrap: wrap;
  justify-content: center;
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`

const Tag = styled.span`
  background-color: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.8rem;
  font-weight: 500;
`

const BlogTypeBadge = styled(TypeBadge)`
  margin-right: 0.25rem;
`

const TagsContainerWithTopMargin = styled(TagsContainer)`
  margin-top: 2rem;
`

const PostContent = styled.div`
  line-height: 1.8;
  color: ${props => props.theme.colors.text};

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.secondary};
    margin-top: ${props => props.theme.spacing.xl};
    margin-bottom: ${props => props.theme.spacing.md};
  }

  p { margin-bottom: ${props => props.theme.spacing.md}; }
  ul, ol { margin-bottom: ${props => props.theme.spacing.md}; padding-left: ${props => props.theme.spacing.lg}; }
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.lg} 0;
    font-style: italic;
    color: ${props => props.theme.colors.textMuted};
  }
  code { background-color: ${props => props.theme.colors.surface}; padding: 0.2em 0.4em; border-radius: ${props => props.theme.borderRadius.sm}; font-size: 0.9em; }
  pre { background-color: ${props => props.theme.colors.surface}; padding: ${props => props.theme.spacing.md}; border-radius: ${props => props.theme.borderRadius.md}; overflow-x: auto; margin: ${props => props.theme.spacing.md} 0; }
  pre code { background-color: transparent; padding: 0; }
`

const PostFooter = styled.footer`
  margin-top: 4rem;
  padding-top: ${props => props.theme.spacing.xl};
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`

const AuthorBox = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};

  h3 { color: ${props => props.theme.colors.primary}; margin-bottom: ${props => props.theme.spacing.sm}; }
  p { margin: 0; }
`

const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`

const PrimaryLinkButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 9999px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
  &:active { transform: translateY(0); }
`

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
