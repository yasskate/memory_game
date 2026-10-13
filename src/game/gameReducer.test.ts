import { describe, expect, it } from 'vitest'
import { createGameState, gameReducer } from './gameReducer'
import type { GameCard } from './types'

const card = (id: string, pairId: number): GameCard => ({
  id,
  pairId,
  image: `${id}.png`,
  coverImage: 'cover.png',
  isFaceUp: false,
  isMatched: false,
})

describe('gameReducer', () => {
  it('marks a matching pair that includes the first deck index and wins the game', () => {
    let state = createGameState([card('first', 1), card('second', 1)])

    state = gameReducer(state, { type: 'select-card', cardId: 'first' })
    state = gameReducer(state, { type: 'select-card', cardId: 'second' })

    expect(state.moves).toBe(1)
    expect(state.cards.every(currentCard => currentCard.isMatched)).toBe(true)
    expect(state.status).toBe('won')
  })

  it('locks a failed turn until the mismatch resolves without mutating the prior state', () => {
    const initialState = createGameState([card('first', 1), card('second', 2)])
    let state = gameReducer(initialState, { type: 'select-card', cardId: 'first' })
    state = gameReducer(state, { type: 'select-card', cardId: 'second' })

    expect(state.status).toBe('resolving')
    expect(initialState.cards.every(currentCard => !currentCard.isFaceUp)).toBe(true)

    state = gameReducer(state, { type: 'resolve-mismatch' })

    expect(state.status).toBe('playing')
    expect(state.selectedCardIds).toEqual([])
    expect(state.cards.every(currentCard => !currentCard.isFaceUp)).toBe(true)
  })

  it('ignores selections while a failed turn is resolving', () => {
    let state = createGameState([card('first', 1), card('second', 2), card('third', 3)])
    state = gameReducer(state, { type: 'select-card', cardId: 'first' })
    state = gameReducer(state, { type: 'select-card', cardId: 'second' })
    const resolvingState = gameReducer(state, { type: 'select-card', cardId: 'third' })

    expect(resolvingState).toBe(state)
  })

  it('starts a fresh game when the player restarts during a resolving turn', () => {
    let state = createGameState([card('first', 1), card('second', 2)])
    state = gameReducer(state, { type: 'select-card', cardId: 'first' })
    state = gameReducer(state, { type: 'select-card', cardId: 'second' })

    state = gameReducer(state, { type: 'restart' })

    expect(state.moves).toBe(0)
    expect(state.selectedCardIds).toEqual([])
    expect(state.status).toBe('playing')
    expect(state.cards).toHaveLength(18)
    expect(state.cards.every(currentCard => !currentCard.isFaceUp && !currentCard.isMatched)).toBe(true)
  })
})
