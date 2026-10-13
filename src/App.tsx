import Board from './components/board/board'
import BoardControllers from './components/board/boardControllers'
import useGame from './hooks/useGame'
import { AppContainer } from './styles/app'

function App() {
  const { cards, moves, restart, selectCard, status } = useGame()
  const isGameOver = status === 'won'

  return (
    <AppContainer>
      <header className='app-header'>
        <p className='eyebrow'>Juego de memoria</p>
        <h1>Memorama</h1>
        <p className='intro'>Encuentra las nueve parejas con el menor número de movimientos.</p>
      </header>

      <BoardControllers moves={moves} onRestart={restart} />

      {isGameOver && (
        <p className='win-message' role='status'>
          ¡Lo lograste en {moves} movimientos!
        </p>
      )}

      <Board cards={cards} onSelectCard={selectCard} status={status} />
    </AppContainer>
  )
}

export default App
