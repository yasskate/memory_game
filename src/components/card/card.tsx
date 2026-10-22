import { memo } from 'react'
import type { GameCard } from '../../game/types'
import { CardContainer } from '../../styles/card'

interface CardProps {
  card: GameCard
  disabled: boolean
  labels: { hidden: string; revealed: string }
  onSelect: (cardId: string) => void
}

const Card = ({ card, disabled, labels, onSelect }: CardProps) => {
  const isFaceUp = card.isFaceUp || card.isMatched
  const isDisabled = disabled || card.isMatched
  const label = isFaceUp ? labels.revealed : labels.hidden

  return (
    <CardContainer>
      <button
        aria-label={label}
        aria-pressed={isFaceUp}
        disabled={isDisabled}
        onClick={() => onSelect(card.id)}
        className='card-button'
      >
        {/* Both faces stay mounted so the rotation can animate in either direction. */}
        <span className='card-inner' data-face-up={isFaceUp}>
          <span className='card-face card-face--back'>
            <img className='card-image' src={card.coverImage} alt='' />
          </span>
          <span className='card-face card-face--front'>
            <img className='card-image' src={card.image} alt='' />
          </span>
        </span>
      </button>
    </CardContainer>
  )
}

export default memo(Card)
