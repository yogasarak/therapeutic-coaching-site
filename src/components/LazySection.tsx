'use client'

import React, { ReactNode, Suspense } from 'react'
import { SectionSkeleton } from './LazySection.styles'

interface LazySectionProps {
  readonly children: ReactNode
  readonly fallback?: ReactNode
}

const LazySection: React.FC<LazySectionProps> = ({ 
  children, 
  fallback = <SectionSkeleton /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export default LazySection
