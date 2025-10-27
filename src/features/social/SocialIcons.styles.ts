import styled from 'styled-components'

type SocialVariant = 'default' | 'light' | 'dark'
type SocialSize = 'small' | 'medium' | 'large'

const getLayoutSpacing = (spacing: 'tight' | 'normal' | 'wide') => {
  switch (spacing) {
    case 'tight':
      return '0.5rem'
    case 'wide':
      return '1.5rem'
    default:
      return '1rem'
  }
}

const getSizeMetrics = (size: SocialSize) => {
  switch (size) {
    case 'small':
      return { dimension: 36, icon: 18 }
    case 'large':
      return { dimension: 56, icon: 26 }
    default:
      return { dimension: 44, icon: 22 }
  }
}

const getPalette = (variant: SocialVariant, theme: any) => {
  const brandBlue = theme.colors.primary

  switch (variant) {
    case 'light':
      return {
        background: 'rgba(255, 255, 255, 0.85)',
        border: 'rgba(255, 255, 255, 0.35)',
        color: brandBlue,
        accent: brandBlue,
        hoverBackground: 'rgba(255, 255, 255, 0.95)',
        hoverColor: brandBlue,
        hoverAccent: brandBlue,
        hoverBorder: 'rgba(255, 255, 255, 0.55)',
      }
    case 'dark':
      return {
        background: 'rgba(0, 0, 0, 0.65)',
        border: 'rgba(255, 255, 255, 0.15)',
        color: brandBlue,
        accent: brandBlue,
        hoverBackground: 'rgba(0, 0, 0, 0.78)',
        hoverColor: brandBlue,
        hoverAccent: brandBlue,
        hoverBorder: 'rgba(255, 255, 255, 0.35)',
      }
    default:
      return {
        background: theme.colors.surface,
        border: theme.colors.border,
        color: brandBlue,
        accent: brandBlue,
        hoverBackground: theme.colors.primary + '12',
        hoverColor: brandBlue,
        hoverAccent: brandBlue,
        hoverBorder: theme.colors.primary + '40',
      }
  }
}

export const SocialContainer = styled.div<{
  readonly $spacing: 'tight' | 'normal' | 'wide'
  readonly $layout: 'horizontal' | 'vertical'
}>`
  display: flex;
  flex-direction: ${props => (props.$layout === 'vertical' ? 'column' : 'row')};
  align-items: ${props => (props.$layout === 'vertical' ? 'flex-start' : 'center')};
  gap: ${props => getLayoutSpacing(props.$spacing)};
`

export const SocialIcon = styled.a<{
  readonly $platform: string
  readonly $size: SocialSize
  readonly $color: SocialVariant
  readonly $showLabel?: boolean
}>`
  ${props => {
    const palette = getPalette(props.$color, props.theme)
    const { dimension, icon } = getSizeMetrics(props.$size)

    return `
      --icon-accent: ${palette.accent};
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${dimension}px;
      height: ${dimension}px;
      border-radius: ${props.$showLabel ? props.theme.borderRadius.md : '999px'};
      border: 1px solid ${palette.border};
      background-color: ${palette.background};
      color: ${palette.color};
      text-decoration: none;
      transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

      svg {
        width: ${icon}px;
        height: ${icon}px;
        display: block;
      }

      &:hover {
        transform: translateY(-2px);
        background-color: ${palette.hoverBackground};
        color: ${palette.hoverColor};
        border-color: ${palette.hoverBorder};
        --icon-accent: ${palette.hoverAccent};
      }

      &:focus-visible {
        outline: 2px solid ${palette.hoverAccent};
        outline-offset: 3px;
      }
    `
  }}

  ${props =>
    props.$showLabel
      ? `
      flex-direction: column;
      gap: 0.35rem;
      padding: 0.6rem 0.8rem;
      width: auto;
      height: auto;

      svg {
        width: ${getSizeMetrics(props.$size).icon}px;
        height: ${getSizeMetrics(props.$size).icon}px;
      }

      .social-label {
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1.2;
        text-align: center;
        color: inherit;
        opacity: 0.85;
      }
    `
      : ''}
`
