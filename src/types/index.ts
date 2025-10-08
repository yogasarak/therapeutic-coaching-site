export interface NavigationSection {
  readonly id: string
  readonly label: string
  readonly href: string
}

export interface TestimonialData {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly content: string
  readonly rating: number
}

export interface ServiceData {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly features: ReadonlyArray<string>
  readonly price?: string
}

export interface BlogPost {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly date: string
  readonly readingTime: string
  readonly author: string
  readonly tags: ReadonlyArray<string>
  readonly contentHtml?: string
  readonly contentMdx?: React.ReactElement
  readonly featured?: boolean
}

export interface ContactFormData {
  readonly name: string
  readonly email: string
  readonly subject: string
  readonly message: string
}

export type Theme = {
  readonly colors: {
    readonly primary: string
    readonly secondary: string
    readonly accent: string
    readonly background: string
    readonly surface: string
    readonly text: string
    readonly textMuted: string
    readonly border: string
    readonly success: string
    readonly warning: string
    readonly error: string
  }
  readonly fonts: {
    readonly primary: string
    readonly secondary: string
  }
  readonly spacing: {
    readonly xs: string
    readonly sm: string
    readonly md: string
    readonly lg: string
    readonly xl: string
    readonly xxl: string
  }
  readonly breakpoints: {
    readonly mobile: string
    readonly tablet: string
    readonly desktop: string
    readonly wide: string
  }
  readonly shadows: {
    readonly sm: string
    readonly md: string
    readonly lg: string
  }
  readonly borderRadius: {
    readonly sm: string
    readonly md: string
    readonly lg: string
    readonly full: string
  }
}
import type React from 'react'
