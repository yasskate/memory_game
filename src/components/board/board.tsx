import { memo } from 'react'
import Card from '../card/card'
import type { Difficulty, GameCard, GameStatus } from '../../game/types'
import { BoardContainer } from '../../styles/board'

interface BoardProps {
  cards: GameCard[]
  difficulty: Difficulty
  label: string
  onSelectCard: (cardId: string) => void
  status: GameStatus
  cardLabels: { hidden: string; revealed: string }
}

const Board = ({ cards, difficulty, label, onSelectCard, status, cardLabels }: BoardProps) => {
  const isResolvingTurn = status === 'resolving'

  return (
    <BoardContainer aria-label={label}>
      <div className='deck-wrapper' data-difficulty={difficulty}>
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

