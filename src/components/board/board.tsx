import { memo } from 'react'
import Card from '../card/card'
import type { GameCard, GameStatus } from '../../game/types'
import { BoardContainer } from '../../styles/board'

interface BoardProps {
  cards: GameCard[]
  label: string
  onSelectCard: (cardId: string) => void
  status: GameStatus
  cardLabels: { hidden: string; revealed: string }
}

const Board = ({ cards, label, onSelectCard, status, cardLabels }: BoardProps) => {
  const isResolvingTurn = status === 'resolving'

  return (
    <BoardContainer aria-label={label}>
      <div className='deck-wrapper'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            labels={cardLabels}
            disabled={isResolvingTurn}
            onSelect={onSelectCard}
          />
         ))}
      </div>
    </BoardContainer>
  )
}

export default memo(Board)

