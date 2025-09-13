'use client'

import React from 'react'
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
  CardProgress
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
  if (!card) {
    return null
  }

  // Convert markdown-like content to HTML (simple implementation)
  const formatContent = (content: string): string => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
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
          />
        )}

        <CardMainContent
          dangerouslySetInnerHTML={{
            __html: `<p>${formatContent(card.content)}</p>`
            // __html: DOMPurify.sanitize(`<p>${formatContent(card.content)}</p>`)
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
