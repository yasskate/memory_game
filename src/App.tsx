import { useEffect, useState } from 'react'
import Board from './components/board/board'
import BoardControllers from './components/board/boardControllers'
import useGame from './hooks/useGame'
import { translations, type Language } from './i18n/translations'
import { AppContainer } from './styles/app'

function App() {
  const { cards, moves, restart, selectCard, status } = useGame()
  const isGameOver = status === 'won'
  const [language, setLanguage] = useState<Language>('es')
  const strings = translations[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = strings.documentTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', strings.description)
  }, [language, strings])

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
        movesLabel={strings.movesLabel}
        newGameLabel={strings.newGame}
        onRestart={restart}
      />

      {isGameOver && (
        <p className='win-message' role='status'>
          {strings.winMessage(moves)}
        </p>
      )}

      <Board
        cards={cards}
        label={strings.boardLabel}
        onSelectCard={selectCard}
        status={status}
        cardLabels={{ hidden: strings.hiddenCard, revealed: strings.revealedCard }}
      />
    </AppContainer>
  )
}

export default App
