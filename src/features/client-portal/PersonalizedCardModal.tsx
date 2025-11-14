'use client'

import React, { useMemo } from 'react'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import type { SanitizeOptions } from 'sanitize-html'

marked.setOptions({ gfm: true, breaks: true })

const extendedAllowedTags = Array.from(new Set([
  ...sanitizeHtml.defaults.allowedTags,
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'iframe',
  'audio',
  'source',
]))

const sanitizeOptions: SanitizeOptions = {
  allowedTags: extendedAllowedTags,
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ['href', 'name', 'target', 'rel'],
    iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'loading', 'referrerpolicy', 'title', 'scrolling'],
    audio: ['src', 'controls', 'preload', 'loop', 'muted', 'autoplay'],
    source: ['src', 'type'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', {
      rel: 'noopener noreferrer',
      target: '_blank',
    }),
  },
}
import Modal from '../modal/Modal'
import MediaEmbed from '../media/MediaEmbed'
import { PersonalizedCardData } from './PersonalizedCard'
import {
  ModalContent,
  CardTypeHeader,
  CardSubtitle,
  CardMainContent,
  CardMetaInfo,
  CardDate,
  CardProgress,
} from './PersonalizedCardModal.styles'

interface PersonalizedCardModalProps {
  readonly card: PersonalizedCardData | null
  readonly isOpen: boolean
  readonly onClose: () => void
}

const getTypeLabel = (type: PersonalizedCardData['type']): string => {
  switch (type) {
    case 'personal': return 'Personal Note'
    case 'exercise': return 'Exercise'
    case 'reflection': return 'Reflection'
    case 'goal': return 'Goal Setting'
    case 'audio': return 'Audio Session'
    default: return 'Card'
  }
}

const getTypeIcon = (type: PersonalizedCardData['type']): string => {
  switch (type) {
    case 'personal': return '📝'
    case 'exercise': return '💪'
    case 'reflection': return '🤔'
    case 'goal': return '🎯'
    case 'audio': return '🎵'
    default: return '📄'
  }
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

export const PersonalizedCardModal: React.FC<PersonalizedCardModalProps> = ({
  card,
  isOpen,
  onClose
}) => {
  const formattedContent = useMemo(() => {
    if (!card) {
      return ''
    }

    const rawHtml = marked.parse(card.content) as string
    const sanitized = sanitizeHtml(rawHtml, sanitizeOptions)

    if (sanitized.trim().length > 0) {
      return sanitized
    }

    const fallback = sanitizeHtml(card.content, { allowedTags: [], allowedAttributes: {} })
    return fallback ? `<p>${fallback}</p>` : ''
  }, [card])

  if (!card) {
    return null
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={card.title}
      closeOnOverlayClick={true}
      closeOnEscape={true}
    >
      <ModalContent>
        <CardTypeHeader $type={card.type}>
          <span>{getTypeIcon(card.type)}</span>
          {getTypeLabel(card.type)}
        </CardTypeHeader>

        {card.subtitle && (
          <CardSubtitle>{card.subtitle}</CardSubtitle>
        )}

        {card.mediaUrl && card.mediaType && (
          <MediaEmbed
            mediaUrl={card.mediaUrl}
            mediaType={card.mediaType}
            title={card.title}
            duration={card.mediaDuration}
            options={card.mediaOptions}
          />
        )}

        <CardMainContent
          dangerouslySetInnerHTML={{
            __html: formattedContent,
          }}
        />

        <CardMetaInfo>
          <CardDate dateTime={card.createdDate}>
            Created: {formatDate(card.createdDate)}
          </CardDate>
          {card.progress && (
            <CardProgress>{card.progress}</CardProgress>
          )}
        </CardMetaInfo>
      </ModalContent>
    </Modal>
  )
}

export default PersonalizedCardModal
