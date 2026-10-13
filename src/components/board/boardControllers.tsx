import { BoardControllersContainer } from '../../styles/board'

interface BoardControllersProps {
  moves: number
  onRestart: () => void
}

const BoardControllers = ({ moves, onRestart }: BoardControllersProps) => {
  return (
    <BoardControllersContainer>
      <p>Movimientos: <span data-testid='moves'>{moves}</span></p>
      <button
        className='reset-board-button'
        onClick={onRestart}
      >
        Nueva partida
      </button>
    </BoardControllersContainer>
  )
}

export default BoardControllers

