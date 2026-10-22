import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import { PROGRESS_STORAGE_KEY } from './utils/progressStorage'

type User = ReturnType<typeof userEvent.setup>

const storedProgress = () => JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) ?? 'null')

/** Finds every pair through each card's face image and matches them all without a miss. */
const winGame = async (user: User) => {
  const board = screen.getByRole('region', { name: /tablero|board/i })
  const buttons = within(board).getAllByRole('button')
  const pairs = new Map<string, HTMLElement[]>()

  buttons.forEach(button => {
    const face = button.querySelector('.card-face--front img')?.getAttribute('src') ?? ''
    pairs.set(face, [...(pairs.get(face) ?? []), button])
  })

  for (const [first, second] of pairs.values()) {
    await user.click(first)
    await user.click(second)
  }

  return pairs.size
}

describe('App', () => {
  it('renders a complete, playable board at the default medium difficulty', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Memorama' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(24)
    expect(screen.getByRole('button', { name: 'Medio' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByTestId('moves')).toHaveTextContent('0')
    expect(screen.getByTestId('best-moves')).toHaveTextContent('—')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it.each([
    ['Fácil', 16],
    ['Medio', 24],
    ['Difícil', 32],
  ])('deals the right number of cards for %s and remembers the choice', async (label, cardCount) => {
    const user = userEvent.setup()
    const { unmount } = render(<App />)

    await user.click(screen.getByRole('button', { name: label }))

    expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(cardCount)
    expect(screen.getByRole('button', { name: label })).toHaveAttribute('aria-pressed', 'true')

    unmount()
    render(<App />)

    expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(cardCount)
  })

  it('flips a mismatched pair back after a short delay', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    try {
      const user = userEvent.setup()
      render(<App />)
      const buttons = screen.getAllByRole('button', { name: 'Carta oculta' })
      const faceOf = (button: HTMLElement) => button.querySelector('.card-face--front img')?.getAttribute('src')
      const second = buttons.find(button => faceOf(button) !== faceOf(buttons[0]))!

      await user.click(buttons[0])
      await user.click(second)

      expect(screen.getAllByRole('button', { name: 'Carta descubierta' })).toHaveLength(2)
      expect(screen.getByTestId('moves')).toHaveTextContent('1')

      await act(() => vi.advanceTimersByTimeAsync(900))

      expect(screen.queryByRole('button', { name: 'Carta descubierta' })).not.toBeInTheDocument()
      expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(24)
    } finally {
      vi.useRealTimers()
    }
  })

  it('shows a win dialog with the moves and saves the first result as the best', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Fácil' }))

    const pairCount = await winGame(user)

    const dialog = screen.getByRole('dialog', { name: '¡Ganaste!' })
    expect(pairCount).toBe(8)
    expect(dialog).toHaveTextContent('Nivel Fácil')
    expect(dialog).toHaveTextContent('¡Lo lograste en 8 movimientos!')
    expect(dialog).toHaveTextContent('¡Nuevo récord!')
    expect(dialog).toHaveTextContent('Tu mejor partida: 8 movimientos')
    expect(screen.getByTestId('best-moves')).toHaveTextContent('8')
    expect(storedProgress()).toEqual({ difficulty: 'easy', bestMoves: { easy: 8, medium: null, hard: null } })
    expect(within(dialog).getByRole('button', { name: 'Jugar de nuevo' })).toHaveFocus()
  })

  it('shows the previous best when a game does not beat it', async () => {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({ difficulty: 'easy', bestMoves: { easy: 8, medium: null, hard: null } }),
    )
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByTestId('best-moves')).toHaveTextContent('8')

    await winGame(user)

    const dialog = screen.getByRole('dialog', { name: '¡Ganaste!' })
    expect(dialog).not.toHaveTextContent('¡Nuevo récord!')
    expect(dialog).toHaveTextContent('Tu mejor partida: 8 movimientos')
  })

  it('lets the player view the board, then shows the dialog again after the next win', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Fácil' }))
    await winGame(user)

    await user.click(screen.getByRole('button', { name: 'Ver tablero' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Carta descubierta' })).toHaveLength(16)

    await user.click(screen.getByRole('button', { name: 'Nueva partida' }))
    await winGame(user)
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Jugar de nuevo' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByTestId('moves')).toHaveTextContent('0')
    expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(16)

    await winGame(user)
    expect(screen.getByRole('dialog', { name: '¡Ganaste!' })).toBeInTheDocument()
  })

  it('switches the game interface and document metadata to English', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.getByRole('heading', { name: 'Memory Match' })).toBeInTheDocument()
    expect(screen.getByText('Find every pair using as few moves as you can.')).toBeInTheDocument()
    expect(screen.getByText('Moves:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New game' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Difficulty' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hard' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Hidden card' })).toHaveLength(24)
    expect(screen.getByLabelText('Memory game board')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe('Memory Match')

    await user.click(screen.getByRole('button', { name: 'Español' }))

    expect(screen.getByRole('heading', { name: 'Memorama' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('es')
  })
})
