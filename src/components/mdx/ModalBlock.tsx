"use client"

import React from 'react'
import styled from 'styled-components'
import Modal from '@/features/modal/Modal'

interface ModalBlockProps {
  readonly title?: string
  readonly buttonText?: string
  readonly children?: React.ReactNode
}

const Trigger = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.accent} 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  border-radius: ${props => props.theme.borderRadius.full};
`

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

