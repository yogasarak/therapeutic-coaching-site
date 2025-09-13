"use client"

import React from 'react'
import {
  SocialContainer,
  SocialIcon,
  PersonalIcon
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

const getSocialIcon = (platform: string): string => {
  switch (platform) {
    case 'facebook': return '📘'
    case 'twitter': return '🐦'
    case 'instagram': return '📷'
    case 'linkedin': return '💼'
    case 'youtube': return '📺'
    case 'tiktok': return '🎵'
    case 'personal': return '🌐'
    default: return '🔗'
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
        link.platform === 'personal' ? (
          <PersonalIcon
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label || getPlatformName(link.platform)}
            $size={size}
            $color={color}
            $showLabel={showLabels}
          >
            {getSocialIcon(link.platform)}
            {showLabels && <span className="social-label">{getPlatformName(link.platform)}</span>}
          </PersonalIcon>
        ) : (
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
        )
      ))}
    </SocialContainer>
  )
}

export default SocialIcons
