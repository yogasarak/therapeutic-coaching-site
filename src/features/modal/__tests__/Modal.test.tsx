import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '@/features/modal/Modal'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/utils/theme'

const Host: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <button type="button" aria-label="Open Modal" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Test Modal"
        footer={<button type="button">Footer Action</button>}
      >
        <div>
          <button type="button">First</button>
          <button type="button">Second</button>
        </div>
      </Modal>
    </div>
  )
}

describe('Modal', () => {
  it('focuses the first focusable on open, traps focus, and restores focus on close', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider theme={theme}>
        <Host />
      </ThemeProvider>
    )

    const trigger = screen.getByRole('button', { name: /open modal/i })
    trigger.focus()
    await act(async () => {
      await user.click(trigger)
    })

    const closeBtn = await screen.findByRole('button', { name: /close modal/i })
    // After rAF, focus should move to Close button
    await waitFor(() => expect(closeBtn).toHaveFocus())

    // Tab moves to the first content button
    await act(async () => {
      await user.tab()
    })
    expect(screen.getByRole('button', { name: /first/i })).toHaveFocus()

    // Shift+Tab wraps back to Close (focus trap)
    await act(async () => {
      await user.keyboard('{Shift>}{Tab}{/Shift}')
    })
    expect(closeBtn).toHaveFocus()

    // Ensure body scroll locked while open
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'))

    // Escape closes the modal and restores focus to the trigger
    await act(async () => {
      await user.keyboard('{Escape}')
    })
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())

    // Body scroll restored
    expect(document.body.style.overflow).toBe('')
  })
})
