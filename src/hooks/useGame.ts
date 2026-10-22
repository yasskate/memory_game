import { useCallback, useEffect, useReducer } from 'react'
import { createDeck } from '../game/deck'
import { PAIRS_BY_DIFFICULTY } from '../game/difficulty'
import { createGameState, gameReducer } from '../game/gameReducer'
import type { Difficulty } from '../game/types'
import { loadProgress, saveProgress } from '../utils/progressStorage'

const MISMATCH_DELAY_MS = 900

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => createGameState(loadProgress()))

  useEffect(() => {
    if (state.status !== 'resolving') return

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'resolve-mismatch' })
    }, MISMATCH_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [state.status])

  const { difficulty, bestMoves } = state

  useEffect(() => {
    saveProgress({ difficulty, bestMoves })
  }, [difficulty, bestMoves])

  const startNewGame = useCallback((nextDifficulty: Difficulty) => {
    dispatch({
      type: 'new-game',
      difficulty: nextDifficulty,
      cards: createDeck(PAIRS_BY_DIFFICULTY[nextDifficulty]),
    })
  }, [])

  const selectCard = useCallback((cardId: string) => {
    dispatch({ type: 'select-card', cardId })
  }, [])

  const restart = useCallback(() => startNewGame(difficulty), [difficulty, startNewGame])

  const changeDifficulty = useCallback(
    (nextDifficulty: Difficulty) => {
      if (nextDifficulty !== difficulty) startNewGame(nextDifficulty)
    },
    [difficulty, startNewGame],
  )

  return { ...state, changeDifficulty, restart, selectCard }
}

export default useGame
