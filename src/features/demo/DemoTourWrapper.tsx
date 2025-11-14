'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const DemoTour = dynamic(() => import('./DemoTour'), {
  ssr: false,
  loading: () => null,
})

const DemoTourWrapper: React.FC = () => {
  return <DemoTour />
}

export default DemoTourWrapper
