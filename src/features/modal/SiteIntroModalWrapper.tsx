'use client'

import dynamic from 'next/dynamic'

const SiteIntroModal = dynamic(() => import('./SiteIntroModal'), {
  ssr: false,
  loading: () => null,
})

const SiteIntroModalWrapper: React.FC = () => {
  return <SiteIntroModal />
}

export default SiteIntroModalWrapper
