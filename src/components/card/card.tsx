import { memo } from 'react'
import type { GameCard } from '../../game/types'
import { CardContainer } from '../../styles/card'

interface CardProps {
  card: GameCard
  disabled: boolean
  onSelect: (cardId: string) => void
}

const Card = ({ card, disabled, onSelect }: CardProps) => {
  const isFaceUp = card.isFaceUp || card.isMatched
  const isDisabled = disabled || card.isMatched
  const label = isFaceUp ? 'Carta descubierta' : 'Carta oculta'

  return (
    <CardContainer>
      <button
        aria-label={label}
        aria-pressed={isFaceUp}
        disabled={isDisabled}
        onClick={() => onSelect(card.id)}
        className='card-button'
      >
        <img className='card-image' src={isFaceUp ? card.image : card.coverImage} alt='' />
      </button>
    </CardContainer>
  )
}

export default memo(Card)

