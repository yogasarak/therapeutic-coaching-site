"use client"

import React, { useEffect, useState } from 'react'

const overlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 9999,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
}
const modalStyle: React.CSSProperties = {
  background: '#fff', borderRadius: 12, maxWidth: 900, width: '100%', maxHeight: '85vh', overflowY: 'auto',
  boxShadow: '0 25px 50px rgba(0,0,0,0.25)', position: 'relative', padding: '1.5rem'
}
const closeStyle: React.CSSProperties = {
  position: 'absolute', top: 12, right: 12, fontSize: 24, lineHeight: 1, background: 'transparent', border: 0, cursor: 'pointer'
}

const PostModalEnhancer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [contentHtml, setContentHtml] = useState<string>('')

  useEffect(() => {
    const placeholders = document.querySelectorAll<HTMLElement>('[data-modal="true"]')
    const handlers: Array<() => void> = []
    placeholders.forEach(ph => {
      const btn = ph.querySelector('[data-modal-trigger]') as HTMLButtonElement | null
      const body = ph.querySelector('[data-modal-body]') as HTMLElement | null
      if (!btn || !body) return
      const click = () => {
        setTitle(ph.getAttribute('data-modal-title') || 'Details')
        setContentHtml(body.innerHTML)
        setOpen(true)
      }
      btn.addEventListener('click', click)
      handlers.push(() => btn.removeEventListener('click', click))
    })
    return () => { handlers.forEach(off => off()) }
  }, [])

  if (!open) return null

  return (
    <div style={overlayStyle} onClick={() => setOpen(false)} role="dialog" aria-modal="true">
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <button style={closeStyle} aria-label="Close" onClick={() => setOpen(false)}>×</button>
        {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </div>
  )
}

export default PostModalEnhancer

