import type { SocialLink } from '@/features/social/SocialIcons'

export const defaultSocialLinks: ReadonlyArray<SocialLink> = [
  { platform: 'instagram', url: 'https://instagram.com/yourcoachingpractice', label: 'Follow us on Instagram' },
  { platform: 'facebook', url: 'https://facebook.com/yourcoachingpractice', label: 'Like us on Facebook' },
  { platform: 'linkedin', url: 'https://linkedin.com/company/yourcoachingpractice', label: 'Connect on LinkedIn' },
  { platform: 'personal', url: 'https://yourcoachingwebsite.com', label: 'Visit our main website' },
] as const
