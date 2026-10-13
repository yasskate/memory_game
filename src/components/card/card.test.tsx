import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Card from './card'

const card = {
  id: 'card-1-0',
  pairId: 1,
  image: 'image.png',
  coverImage: 'cover.png',
  isFaceUp: false,
  isMatched: false,
}

describe('Card', () => {
  it('selects its card through the provided callback', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(<Card card={card} disabled={false} labels={{ hidden: 'Hidden card', revealed: 'Revealed card' }} onSelect={onSelect} />)

    await user.click(screen.getByRole('button', { name: 'Hidden card' }))

    expect(onSelect).toHaveBeenCalledWith('card-1-0')
  })

  it('does not allow interaction while the board is resolving a turn', () => {
    render(<Card card={card} disabled labels={{ hidden: 'Hidden card', revealed: 'Revealed card' }} onSelect={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Hidden card' })).toBeDisabled()
  })
})
