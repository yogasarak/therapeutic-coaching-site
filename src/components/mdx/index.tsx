"use client"

import dynamic from 'next/dynamic'

// Dynamically import client-only MDX components to avoid server import issues
export const mdxComponents = {
  ModalBlock: dynamic(() => import('./ModalBlock'), { ssr: false }),
}
