import { useEffect, useRef } from 'react'
import { WinDialogContainer } from '../../styles/winDialog'

interface WinDialogProps {
  open: boolean
  title: string
  message: string
  difficulty: string
  bestResult: string
  newRecordLabel: string | null
  playAgainLabel: string
  viewBoardLabel: string
  onPlayAgain: () => void
  onClose: () => void
}

/** Native modal dialog: traps focus, closes on Escape, and returns focus when it closes. */
const WinDialog = ({
  open,
  title,
  message,
  difficulty,
  bestResult,
  newRecordLabel,
  playAgainLabel,
  viewBoardLabel,
  onPlayAgain,
  onClose,
}: WinDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const playAgainRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      // showModal focuses the first button; the main action should get focus instead.
      playAgainRef.current?.focus()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Only report closes the player started (Escape or "view board"), not ones caused by `open` turning false.
  const handleClose = () => {
    if (open) onClose()
  }

  return (
    <WinDialogContainer ref={dialogRef} aria-labelledby='win-dialog-title' onClose={handleClose}>
      <p className='win-difficulty'>{difficulty}</p>
      <h2 id='win-dialog-title'>{title}</h2>
      <p className='win-moves'>{message}</p>
      {newRecordLabel && <p className='win-record'>{newRecordLabel}</p>}
      <p className='win-best'>{bestResult}</p>
      <div className='win-actions'>
        <button type='button' className='win-secondary' onClick={onClose}>
          {viewBoardLabel}
        </button>
        <button type='button' className='win-primary' onClick={onPlayAgain} ref={playAgainRef}>
          {playAgainLabel}
        </button>
      </div>
    </WinDialogContainer>
  )
}

export default WinDialog
