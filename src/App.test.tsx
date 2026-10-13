import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders a complete, playable board', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Memorama' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Carta oculta' })).toHaveLength(18)
    expect(screen.getByTestId('moves')).toHaveTextContent('0')
  })
})
