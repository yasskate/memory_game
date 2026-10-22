import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Card from './card'

const card = {
  id: 'card-1-0',
  pairId: 1,
  image: 'image.webp',
  coverImage: 'cover.webp',
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

  it('keeps both faces mounted and flips when the card is revealed or covered again', () => {
    const labels = { hidden: 'Hidden card', revealed: 'Revealed card' }
    const { container, rerender } = render(<Card card={card} disabled={false} labels={labels} onSelect={vi.fn()} />)
    const inner = container.querySelector('.card-inner')
    const imageSources = () => Array.from(container.querySelectorAll('img')).map(image => image.getAttribute('src'))

    expect(inner).toHaveAttribute('data-face-up', 'false')
    expect(imageSources()).toEqual(['cover.webp', 'image.webp'])

    rerender(<Card card={{ ...card, isFaceUp: true }} disabled={false} labels={labels} onSelect={vi.fn()} />)
    expect(inner).toHaveAttribute('data-face-up', 'true')
    expect(screen.getByRole('button', { name: 'Revealed card' })).toBeInTheDocument()

    rerender(<Card card={card} disabled={false} labels={labels} onSelect={vi.fn()} />)
    expect(inner).toHaveAttribute('data-face-up', 'false')
    expect(imageSources()).toEqual(['cover.webp', 'image.webp'])
  })

  it('stays face up once matched', () => {
    const { container } = render(
      <Card card={{ ...card, isMatched: true }} disabled={false} labels={{ hidden: 'Hidden card', revealed: 'Revealed card' }} onSelect={vi.fn()} />,
    )

    expect(container.querySelector('.card-inner')).toHaveAttribute('data-face-up', 'true')
    expect(screen.getByRole('button', { name: 'Revealed card' })).toBeDisabled()
  })
})
