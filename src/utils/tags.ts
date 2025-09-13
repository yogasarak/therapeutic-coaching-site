export type TagType = 'personal' | 'exercise' | 'reflection' | 'goal' | 'audio'

import { slugify } from '@/utils'

export const mapTagToType = (rawTag: string): TagType | null => {
  const t = slugify(rawTag)
  if (t.includes('exercise') || t.includes('practice') || t.includes('homework')) return 'exercise'
  if (t.includes('reflection') || t.includes('journal')) return 'reflection'
  if (t.includes('goal')) return 'goal'
  if (t.includes('audio') || t.includes('podcast')) return 'audio'
  if (t.includes('personal')) return 'personal'
  return null
}
