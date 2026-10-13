import { memo } from 'react'
import Card from '../card/card'
import type { GameCard, GameStatus } from '../../game/types'
import { BoardContainer } from '../../styles/board'

interface BoardProps {
  cards: GameCard[]
  onSelectCard: (cardId: string) => void
  status: GameStatus
}

const Board = ({ cards, onSelectCard, status }: BoardProps) => {
  const isResolvingTurn = status === 'resolving'

  return (
    <BoardContainer aria-label='Tablero de memorama'>
      <div className='deck-wrapper'>
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            disabled={isResolvingTurn}
            onSelect={onSelectCard}
          />
         ))}
      </div>
    </BoardContainer>
  )
}

export default memo(Board)

