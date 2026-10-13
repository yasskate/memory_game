import { useCallback, useEffect, useReducer } from 'react'
import { createGameState, gameReducer } from '../game/gameReducer'

const MISMATCH_DELAY_MS = 900

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, undefined, createGameState)

  useEffect(() => {
    if (state.status !== 'resolving') return

    const timeoutId = window.setTimeout(() => {
      dispatch({ type: 'resolve-mismatch' })
    }, MISMATCH_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [state.status])

  const selectCard = useCallback((cardId: string) => {
    dispatch({ type: 'select-card', cardId })
  }, [])

  const restart = useCallback(() => {
    dispatch({ type: 'restart' })
  }, [])

  return { ...state, restart, selectCard }
}

export default useGame
