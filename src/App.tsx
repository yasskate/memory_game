import { useEffect, useState } from 'react'
import Board from './components/board/board'
import BoardControllers from './components/board/boardControllers'
import WinDialog from './components/winDialog/winDialog'
import useGame from './hooks/useGame'
import { translations, type Language } from './i18n/translations'
import { AppContainer } from './styles/app'

function App() {
  const {
    bestMoves,
    cards,
    changeDifficulty,
    difficulty,
    isNewRecord,
    moves,
    restart,
    selectCard,
    status,
  } = useGame()
  const [language, setLanguage] = useState<Language>('es')
  const [isWinDialogDismissed, setWinDialogDismissed] = useState(false)
  const strings = translations[language]
  const bestForDifficulty = bestMoves[difficulty]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = strings.documentTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', strings.description)
  }, [language, strings])

  // Each new game can show its own win dialog again.
  useEffect(() => {
    if (status !== 'won') setWinDialogDismissed(false)
  }, [status])

  return (
    <AppContainer lang={language}>
      <header className='app-header'>
        <div className='language-switch' role='group' aria-label={strings.languageLabel}>
          {(['es', 'en'] as const).map(option => (
            <button
              key={option}
              type='button'
              aria-pressed={language === option}
              onClick={() => setLanguage(option)}
            >
              {option === 'es' ? 'Español' : 'English'}
            </button>
          ))}
        </div>
        <p className='eyebrow'>{strings.eyebrow}</p>
        <h1>{strings.title}</h1>
        <p className='intro'>{strings.intro}</p>
      </header>

      <BoardControllers
        moves={moves}
        bestMoves={bestForDifficulty}
        difficulty={difficulty}
        labels={{
          moves: strings.movesLabel,
          best: strings.bestLabel,
          noBest: strings.noBest,
          newGame: strings.newGame,
          difficulty: strings.difficultyLabel,
          difficulties: strings.difficulties,
        }}
        onChangeDifficulty={changeDifficulty}
        onRestart={restart}
      />

      <Board
        cards={cards}
        difficulty={difficulty}
        label={strings.boardLabel}
        onSelectCard={selectCard}
        status={status}
        cardLabels={{ hidden: strings.hiddenCard, revealed: strings.revealedCard }}
      />

      <WinDialog
        open={status === 'won' && !isWinDialogDismissed}
        title={strings.winTitle}
        message={strings.winMessage(moves)}
        difficulty={strings.winDifficulty(strings.difficulties[difficulty])}
        bestResult={strings.bestResult(bestForDifficulty ?? moves)}
        newRecordLabel={isNewRecord ? strings.newRecord : null}
        playAgainLabel={strings.playAgain}
        viewBoardLabel={strings.viewBoard}
        onPlayAgain={restart}
        onClose={() => setWinDialogDismissed(true)}
      />
    </AppContainer>
  )
}

export default App
