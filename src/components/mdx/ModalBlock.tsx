"use client"

import React from 'react'
import Modal from '@/features/modal/Modal'
import { Trigger } from './ModalBlock.styles'

interface ModalBlockProps {
  readonly title?: string
  readonly buttonText?: string
  readonly children?: React.ReactNode
}

const ModalBlock: React.FC<ModalBlockProps> = ({ title = 'Details', buttonText = 'Open', children }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Trigger type="button" onClick={() => setOpen(true)}>{buttonText}</Trigger>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title}>
        <div>{children}</div>
      </Modal>
    </>
  )
}

export default ModalBlock
