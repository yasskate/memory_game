import { FC, useState } from 'react'
import Card from '../card/card'
import useDeck from '../../hooks/useDeck'
import { BoardContainer } from '../../styles/board'

const Board: FC = () => {
  const { deck } = useDeck()

  return (
    <BoardContainer>
      {deck.map(card => (
        <Card key={card.id} {...card} />
      ))}
    </BoardContainer>
  )
}

export default Board

