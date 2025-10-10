import type { PersonalizedCardData } from '@/features/client-portal/PersonalizedCard'
import { samplePersonalizedCards } from '@/features/client-portal/sampleData'

const spotlightIds = new Set(['1', '2', '3'])

export const spotlightPractices: ReadonlyArray<PersonalizedCardData> = samplePersonalizedCards
  .filter(card => spotlightIds.has(card.id))
