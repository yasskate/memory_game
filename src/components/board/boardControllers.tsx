import { DIFFICULTIES } from '../../game/difficulty'
import type { Difficulty } from '../../game/types'
import { BoardControllersContainer } from '../../styles/board'

interface BoardControllersProps {
  moves: number
  bestMoves: number | null
  difficulty: Difficulty
  labels: {
    moves: string
    best: string
    noBest: string
    newGame: string
    difficulty: string
    difficulties: Record<Difficulty, string>
  }
  onChangeDifficulty: (difficulty: Difficulty) => void
  onRestart: () => void
}

const BoardControllers = ({
  moves,
  bestMoves,
  difficulty,
  labels,
  onChangeDifficulty,
  onRestart,
}: BoardControllersProps) => {
  return (
    <BoardControllersContainer>
      <div className='stats'>
        <p>{labels.moves}: <span data-testid='moves'>{moves}</span></p>
        <p>{labels.best}: <span data-testid='best-moves'>{bestMoves ?? labels.noBest}</span></p>
      </div>
      <div className='difficulty-switch' role='group' aria-label={labels.difficulty}>
        {DIFFICULTIES.map(option => (
          <button
            key={option}
            type='button'
            aria-pressed={difficulty === option}
            onClick={() => onChangeDifficulty(option)}
          >
            {labels.difficulties[option]}
          </button>
        ))}
      </div>
      <button
        type='button'
        className='reset-board-button'
        onClick={onRestart}
      >
        {labels.newGame}
      </button>
    </BoardControllersContainer>
  )
}

export default BoardControllers
