'use client'

import React from 'react'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import ClientThemeProvider from '@/components/ClientThemeProvider'

interface StyledComponentsWrapperProps {
  readonly children: React.ReactNode
}

export default function StyledComponentsWrapper({ children }: StyledComponentsWrapperProps) {
  return (
    <StyledComponentsRegistry>
      <ClientThemeProvider>
        {children}
      </ClientThemeProvider>
    </StyledComponentsRegistry>
  )
}