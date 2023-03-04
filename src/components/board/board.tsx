import React, { FC, useState } from 'react'
import Card from '../card/card'
import useDeck from '../../hooks/useDeck'
import { BoardContainer } from '../../styles/board'

const Board: FC = () => {
  const { deck, cardsFaceUp, handleFlip } = useDeck()
  const disableOnClick = cardsFaceUp.length > 1

  return (
    <BoardContainer>
      <div className='deck-wrapper'>
        {deck.map(card => (
          <Card
            id={card.id}
            key={card.id}
            handleSelectedCard={handleFlip}
            disabled={disableOnClick}
            { ...card }
          />
         ))}
      </div>
    </BoardContainer>
  )
}

export default Board

