import { FC, useState } from 'react'
import Card from '../card/card'
import useDeck from '../../hooks/useDeck'
import { BoardContainer } from '../../styles/board'

const Board: FC = () => {
  const { deck, cardsFaceUp, handleFlip } = useDeck()

  const disableOnClick = cardsFaceUp.length > 1

  return (
    <BoardContainer>
      {deck.map(card => (
        <Card
          key={card.id}
          handleSelectedCard={handleFlip}
          disabled={disableOnClick}
          { ...card }
        />
      ))}
    </BoardContainer>
  )
}

export default Board

