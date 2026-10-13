import { BoardControllersContainer } from '../../styles/board'

interface BoardControllersProps {
  moves: number
  movesLabel: string
  newGameLabel: string
  onRestart: () => void
}

const BoardControllers = ({ moves, movesLabel, newGameLabel, onRestart }: BoardControllersProps) => {
  return (
    <BoardControllersContainer>
      <p>{movesLabel}: <span data-testid='moves'>{moves}</span></p>
      <button
        className='reset-board-button'
        onClick={onRestart}
      >
        {newGameLabel}
      </button>
    </BoardControllersContainer>
  )
}

export default BoardControllers

