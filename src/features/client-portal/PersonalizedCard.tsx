'use client'

import React from 'react'
import type { SoundCloudTrackKey } from '@/content/media/soundcloudTracks'
import NewContentBadge from '../badge/NewContentBadge'
import {
  Card,
  CardBadge,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardDescription,
  CardFooter,
  CardMeta,
  CardDate,
  CardProgress,
  CardAction,
  CardBadges
} from './PersonalizedCard.styles'

export type PersonalizedCardType = 'personal' | 'exercise' | 'reflection' | 'goal' | 'audio'

export interface PersonalizedCardData {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly description: string
  readonly content: string
  readonly type: PersonalizedCardType
  readonly createdDate: string
  readonly progress?: string
  readonly isCompleted?: boolean
  readonly mediaUrl?: string
  readonly mediaType?: 'audio' | 'video' | 'soundcloud' | 'youtube'
  readonly mediaDuration?: string
  readonly mediaOptions?: {
    readonly soundcloudTrack?: SoundCloudTrackKey
  }
}

interface PersonalizedCardProps {
  readonly card: PersonalizedCardData
  readonly onClick: (card: PersonalizedCardData) => void
}

const getTypeLabel = (type: PersonalizedCardType): string => {
  switch (type) {
    case 'personal': return 'Personal'
    case 'exercise': return 'Exercise'
    case 'reflection': return 'Reflection'
    case 'goal': return 'Goal'
    case 'audio': return 'Audio'
    default: return 'Card'
  }
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  } catch {
    return dateString
  }
}

export const PersonalizedCard: React.FC<PersonalizedCardProps> = ({ card, onClick }) => {
  const handleClick = () => {
    onClick(card)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick(card)
    }
  }

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${card.title}`}
    >
      <CardBadges>
        <CardBadge $type={card.type}>
          {getTypeLabel(card.type)}
        </CardBadge>
        <NewContentBadge 
          createdDate={card.createdDate}
          maxAgeInDays={30}
          size="small"
          variant="default"
        />
      </CardBadges>

      <CardHeader>
        <CardTitle>{card.title}</CardTitle>
        {card.subtitle && (
          <CardSubtitle>{card.subtitle}</CardSubtitle>
        )}
      </CardHeader>

      <CardContent>
        <CardDescription>{card.description}</CardDescription>
      </CardContent>

      <CardFooter>
        <CardMeta>
          <CardDate dateTime={card.createdDate}>
            {formatDate(card.createdDate)}
          </CardDate>
          {card.progress && (
            <CardProgress>{card.progress}</CardProgress>
          )}
        </CardMeta>

        <CardAction>
          Open
        </CardAction>
      </CardFooter>
    </Card>
  )
}

export default PersonalizedCard
