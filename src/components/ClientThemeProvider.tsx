'use client'

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/utils/theme'
import GlobalStyles from '@/components/GlobalStyles'

interface ClientThemeProviderProps {
  readonly children: React.ReactNode
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}