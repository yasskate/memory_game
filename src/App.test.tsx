import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders a complete, playable board', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Memorama' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(18)
    expect(screen.getByTestId('moves')).toHaveTextContent('0')
  })

  it('switches the game interface and document metadata to English', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'English' }))

    expect(screen.getByRole('heading', { name: 'Memory Match' })).toBeInTheDocument()
    expect(screen.getByText('Find all nine pairs using as few moves as you can.')).toBeInTheDocument()
    expect(screen.getByText('Moves:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'New game' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Hidden card' })).toHaveLength(18)
    expect(screen.getByLabelText('Memory game board')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
    expect(document.title).toBe('Memory Match')

    await user.click(screen.getByRole('button', { name: 'Español' }))

    expect(screen.getByRole('heading', { name: 'Memorama' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('es')
  })
})
