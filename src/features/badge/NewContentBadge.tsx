'use client'

import React from 'react'
import {
  Badge,
  BadgeIcon,
  BadgeText
} from './NewContentBadge.styles'

interface NewContentBadgeProps {
  readonly createdDate: string
  readonly maxAgeInDays?: number
  readonly size?: 'small' | 'medium' | 'large'
  readonly variant?: 'default' | 'pulse' | 'subtle'
  readonly showIcon?: boolean
  readonly customText?: string
  readonly className?: string
}

export const NewContentBadge: React.FC<NewContentBadgeProps> = ({
  createdDate,
  maxAgeInDays = 30,
  size = 'medium',
  variant = 'default',
  showIcon = true,
  customText,
  className
}) => {
  const isNew = () => {
    try {
      const contentDate = new Date(createdDate)
      const now = new Date()
      const daysDifference = Math.floor((now.getTime() - contentDate.getTime()) / (1000 * 60 * 60 * 24))
      return daysDifference <= maxAgeInDays
    } catch {
      return false
    }
  }

  if (!isNew()) {
    return null
  }

  const getBadgeText = (): string => {
    if (customText) return customText
    
    try {
      const contentDate = new Date(createdDate)
      const now = new Date()
      const daysDifference = Math.floor((now.getTime() - contentDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (daysDifference === 0) return 'New Today'
      if (daysDifference === 1) return 'New Yesterday'
      if (daysDifference <= 7) return 'New This Week'
      if (daysDifference <= 14) return 'New'
      return 'Recent'
    } catch {
      return 'New'
    }
  }

  return (
    <Badge
      $size={size}
      $variant={variant}
      className={className}
    >
      {showIcon && <BadgeIcon>✨</BadgeIcon>}
      <BadgeText>{getBadgeText()}</BadgeText>
    </Badge>
  )
}

export default NewContentBadge