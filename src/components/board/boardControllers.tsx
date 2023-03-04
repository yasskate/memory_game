import React, { FC, useEffect } from 'react'
import useBoardStore, { useBoardStoreProps } from '../../stores/useBoardStore'
import { BoardControllersContainer } from '../../styles/board'
import useDeckStore from '../../stores/useDeckStore'

const BoardControllers: FC = () => {
  const { resetDeck } = useDeckStore()
  const { moves, resetBoard, gameOver, setGameOver } = useBoardStore()

  const handleOnclick = () => {
    resetBoard()
    resetDeck()
    setGameOver(false)
  }

  return (
    <BoardControllersContainer disabled={gameOver} >
      Movimientos: <p data-testid="moves">{moves}</p>
      <button
        className='reset-board-button'
        data-testid='reset-board-button'
        onClick={handleOnclick}
        disabled={!gameOver}
      >
        Reiniciar tablero
      </button>
    </BoardControllersContainer>
  )
}

export default BoardControllers

