'use client'

import React, { useState } from 'react'
import {
  ChecklistContainer,
  ChecklistHeader,
  ChecklistTitle,
  ChecklistSubtitle,
  ChecklistContent,
  ChecklistItem,
  CheckboxWrapper,
  Checkbox,
  CheckboxIcon,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ProgressBar,
  ProgressFill,
  ProgressText,
  CompletedBadge
} from './HomeworkChecklist.styles'

export interface HomeworkItem {
  readonly id: string
  readonly title: string
  readonly description?: string
  readonly completed: boolean
}

export interface HomeworkChecklistData {
  readonly id: string
  readonly title: string
  readonly subtitle?: string
  readonly description?: string
  readonly items: readonly HomeworkItem[]
  readonly dueDate?: string
  readonly createdDate: string
}

interface HomeworkChecklistProps {
  readonly homework: HomeworkChecklistData
  readonly onItemToggle?: (homeworkId: string, itemId: string) => void
  readonly showProgress?: boolean
}

export const HomeworkChecklist: React.FC<HomeworkChecklistProps> = ({
  homework,
  onItemToggle,
  showProgress = true
}) => {
  const [localItems, setLocalItems] = useState<readonly HomeworkItem[]>(homework.items)

  const handleItemToggle = (itemId: string) => {
    const updatedItems = localItems.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    setLocalItems(updatedItems)
    
    if (onItemToggle) {
      onItemToggle(homework.id, itemId)
    }
  }

  const completedCount = localItems.filter(item => item.completed).length
  const totalCount = localItems.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const isFullyCompleted = completedCount === totalCount && totalCount > 0

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <ChecklistContainer $isCompleted={isFullyCompleted}>
      <ChecklistHeader>
        <ChecklistTitle>{homework.title}</ChecklistTitle>
        {homework.subtitle && (
          <ChecklistSubtitle>{homework.subtitle}</ChecklistSubtitle>
        )}
        {homework.dueDate && (
          <ChecklistSubtitle>Due: {formatDate(homework.dueDate)}</ChecklistSubtitle>
        )}
        {isFullyCompleted && <CompletedBadge>✨ Completed!</CompletedBadge>}
      </ChecklistHeader>

      {homework.description && (
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {homework.description}
        </p>
      )}

      <ChecklistContent>
        {localItems.map((item) => (
          <ChecklistItem key={item.id} $completed={item.completed}>
            <CheckboxWrapper onClick={() => handleItemToggle(item.id)}>
              <Checkbox $checked={item.completed}>
                <CheckboxIcon $checked={item.completed}>
                  {item.completed ? '✓' : ''}
                </CheckboxIcon>
              </Checkbox>
            </CheckboxWrapper>
            
            <ItemContent>
              <ItemTitle $completed={item.completed}>{item.title}</ItemTitle>
              {item.description && (
                <ItemDescription>{item.description}</ItemDescription>
              )}
            </ItemContent>
          </ChecklistItem>
        ))}
      </ChecklistContent>

      {showProgress && totalCount > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <ProgressBar>
            <ProgressFill $percentage={progressPercentage} />
          </ProgressBar>
          <ProgressText>
            {completedCount} of {totalCount} tasks completed ({Math.round(progressPercentage)}%)
          </ProgressText>
        </div>
      )}
    </ChecklistContainer>
  )
}

export default HomeworkChecklist