'use client'

import React from 'react'

interface StyledComponentsRegistryProps {
  readonly children: React.ReactNode
}

const StyledComponentsRegistry: React.FC<StyledComponentsRegistryProps> = ({
  children,
}) => {
  return <>{children}</>
}

export default StyledComponentsRegistry