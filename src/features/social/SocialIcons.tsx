"use client"

import React from 'react'
import {
  SocialContainer,
  SocialIcon,
} from './SocialIcons.styles'

export interface SocialLink {
  readonly platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'personal'
  readonly url: string
  readonly label?: string
}

interface SocialIconsProps {
  readonly links: readonly SocialLink[]
  readonly size?: 'small' | 'medium' | 'large'
  readonly spacing?: 'tight' | 'normal' | 'wide'
  readonly color?: 'default' | 'light' | 'dark'
  readonly layout?: 'horizontal' | 'vertical'
  readonly showLabels?: boolean
}

const strokeProps = {
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const shapeProps = {
  strokeWidth: 1.6,
  fill: 'none' as const,
}

const getSocialIcon = (platform: SocialLink['platform']): React.ReactElement => {
  switch (platform) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="5" stroke="currentColor" {...shapeProps} />
          <circle cx="12" cy="12" r="4.3" stroke="var(--icon-accent)" {...shapeProps} />
          <circle cx="17" cy="7" r="1.2" fill="var(--icon-accent)" />
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.7" stroke="currentColor" {...shapeProps} />
          <path d="M12 8v8" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
          <path d="M14.5 8H11" stroke="var(--icon-accent)" strokeWidth={1.7} strokeLinecap="round" />
          <path d="M13.5 12H11.2" stroke="var(--icon-accent)" strokeWidth={1.7} strokeLinecap="round" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.8" y="4.8" width="14.4" height="14.4" rx="2.4" stroke="currentColor" {...shapeProps} />
          <circle cx="8" cy="8.8" r="1.3" fill="var(--icon-accent)" />
          <path d="M8.1 10.8v6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M12.6 10.8v6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M12.6 13.8c0-1.2.9-2.1 2.1-2.1s2.2.9 2.2 2.1v3.1" stroke="var(--icon-accent)" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      )
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="7" width="15" height="10" rx="3" stroke="currentColor" {...shapeProps} />
          <path d="M11 10.5v3l2.8-1.5L11 10.5Z" fill="var(--icon-accent)" />
        </svg>
      )
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20 7.6c-.7.3-1.3.5-2 .6A3.4 3.4 0 0 0 12 9.5v.6c-2.9-.1-5.5-1.6-7.2-3.9-.8 1.6-.4 3.5.9 4.6-.6 0-1.2-.2-1.7-.5.1 1.9 1.4 3.6 3.4 4-.6.2-1.3.2-1.9.1.7 1.5 2.2 2.5 3.9 2.5A6.6 6.6 0 0 0 18 11.1v-.5c.7-.5 1.3-1 1.8-1.7-.6.3-1.3.5-1.9.6.7-.4 1.3-1 1.6-1.7Z"
            stroke="currentColor"
            {...shapeProps}
            {...strokeProps}
          />
          <path d="M14.5 7.5c-.3 1.3-1.2 2.3-2.5 2.9" stroke="var(--icon-accent)" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M14 5.5v8.2a3.1 3.1 0 1 1-2.7-3.1"
            stroke="currentColor"
            {...shapeProps}
            {...strokeProps}
          />
          <path
            d="M14 7c.9 1.3 2.2 2.1 3.8 2.1"
            stroke="var(--icon-accent)"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
      )
    case 'personal':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.7" stroke="currentColor" {...shapeProps} />
          <path d="M3.5 12h17" stroke="var(--icon-accent)" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M12 3.3c2.3 2.4 3.5 5.3 3.5 8.7s-1.2 6.3-3.5 8.7c-2.3-2.4-3.5-5.3-3.5-8.7s1.2-6.3 3.5-8.7Z" stroke="var(--icon-accent)" {...shapeProps} {...strokeProps} />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8.7" stroke="currentColor" {...shapeProps} />
          <path d="M9 12h6" stroke="var(--icon-accent)" strokeWidth={1.6} strokeLinecap="round" />
          <path d="M12 9v6" stroke="var(--icon-accent)" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      )
  }
}

const getPlatformName = (platform: string): string => {
  switch (platform) {
    case 'facebook': return 'Facebook'
    case 'twitter': return 'Twitter'
    case 'instagram': return 'Instagram'
    case 'linkedin': return 'LinkedIn'
    case 'youtube': return 'YouTube'
    case 'tiktok': return 'TikTok'
    case 'personal': return 'Personal Website'
    default: return 'Social Link'
  }
}

export const SocialIcons: React.FC<SocialIconsProps> = ({
  links,
  size = 'medium',
  spacing = 'normal',
  color = 'default',
  layout = 'horizontal',
  showLabels = false
}) => {
  if (!links.length) return null

  return (
    <SocialContainer $spacing={spacing} $layout={layout}>
      {links.map((link, index) => (
        <SocialIcon
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label || getPlatformName(link.platform)}
          $platform={link.platform}
          $size={size}
          $color={color}
          $showLabel={showLabels}
        >
          {getSocialIcon(link.platform)}
          {showLabels && <span className="social-label">{getPlatformName(link.platform)}</span>}
        </SocialIcon>
      ))}
    </SocialContainer>
  )
}

export default SocialIcons
