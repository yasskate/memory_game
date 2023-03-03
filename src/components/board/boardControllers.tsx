import { FC, useEffect } from 'react'
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

  console.log("GAME OVER!!  ===> ", gameOver)
  return (
    <BoardControllersContainer>
      Board Controllers {moves}
      {gameOver && (<button onClick={handleOnclick}>Reiniciar tablero</button>)}
    </BoardControllersContainer>
  )
}

export default BoardControllers

