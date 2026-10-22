import { describe, expect, it } from 'vitest'
import { createEmptyBestMoves } from './difficulty'
import { createGameState, gameReducer } from './gameReducer'
import type { GameCard, GameState } from './types'

const card = (id: string, pairId: number): GameCard => ({
  id,
  pairId,
  image: `${id}.webp`,
  coverImage: 'cover.webp',
  isFaceUp: false,
  isMatched: false,
})

const pairDeck = () => [card('a1', 1), card('a2', 1), card('b1', 2), card('b2', 2)]

const select = (state: GameState, ...cardIds: string[]) =>
  cardIds.reduce((current, cardId) => gameReducer(current, { type: 'select-card', cardId }), state)

/** Wins a two-pair deck after `misses` failed turns. */
const winWithMisses = (state: GameState, misses: number) => {
  let current = state
  for (let miss = 0; miss < misses; miss += 1) {
    current = gameReducer(select(current, 'a1', 'b1'), { type: 'resolve-mismatch' })
  }
  return select(current, 'a1', 'a2', 'b1', 'b2')
}

describe('gameReducer', () => {
  it('marks a matching pair that includes the first deck index and wins the game', () => {
    let state = createGameState({ cards: [card('first', 1), card('second', 1)] })

    state = select(state, 'first', 'second')

    expect(state.moves).toBe(1)
    expect(state.cards.every(currentCard => currentCard.isMatched)).toBe(true)
    expect(state.status).toBe('won')
  })

  it('locks a failed turn until the mismatch resolves without mutating the prior state', () => {
    const initialState = createGameState({ cards: [card('first', 1), card('second', 2)] })
    let state = select(initialState, 'first', 'second')

    expect(state.status).toBe('resolving')
    expect(state.moves).toBe(1)
    expect(initialState.cards.every(currentCard => !currentCard.isFaceUp)).toBe(true)

    state = gameReducer(state, { type: 'resolve-mismatch' })

    expect(state.status).toBe('playing')
    expect(state.selectedCardIds).toEqual([])
    expect(state.cards.every(currentCard => !currentCard.isFaceUp)).toBe(true)
  })

  it('ignores selections while a failed turn is resolving', () => {
    const state = select(createGameState({ cards: [card('first', 1), card('second', 2), card('third', 3)] }), 'first', 'second')
    const resolvingState = gameReducer(state, { type: 'select-card', cardId: 'third' })

    expect(resolvingState).toBe(state)
  })

  it('keeps playing after a match until every pair is found', () => {
    const state = select(createGameState({ cards: pairDeck() }), 'a1', 'a2')

    expect(state.status).toBe('playing')
    expect(state.isNewRecord).toBe(false)
    expect(state.bestMoves).toEqual(createEmptyBestMoves())
  })

  it('starts a fresh game when the player restarts during a resolving turn', () => {
    let state = select(createGameState({ difficulty: 'easy', cards: pairDeck() }), 'a1', 'b1')
    const nextCards = [card('c1', 3), card('c2', 3)]

    state = gameReducer(state, { type: 'new-game', difficulty: 'easy', cards: nextCards })

    expect(state.moves).toBe(0)
    expect(state.selectedCardIds).toEqual([])
    expect(state.status).toBe('playing')
    expect(state.difficulty).toBe('easy')
    expect(state.cards).toBe(nextCards)
  })

  it('switches difficulty with a new deck while keeping every best result', () => {
    const won = winWithMisses(createGameState({ difficulty: 'easy', cards: pairDeck() }), 0)
    const hardCards = [card('h1', 9), card('h2', 9)]

    const state = gameReducer(won, { type: 'new-game', difficulty: 'hard', cards: hardCards })

    expect(state.difficulty).toBe('hard')
    expect(state.cards).toBe(hardCards)
    expect(state.moves).toBe(0)
    expect(state.status).toBe('playing')
    expect(state.isNewRecord).toBe(false)
    expect(state.bestMoves).toEqual({ easy: 2, medium: null, hard: null })
  })

  it('records the first win as the best result for its difficulty', () => {
    const state = winWithMisses(createGameState({ difficulty: 'medium', cards: pairDeck() }), 1)

    expect(state.status).toBe('won')
    expect(state.moves).toBe(3)
    expect(state.isNewRecord).toBe(true)
    expect(state.bestMoves).toEqual({ easy: null, medium: 3, hard: null })
  })

  it('keeps the previous best when a win takes more moves', () => {
    const bestMoves = { ...createEmptyBestMoves(), medium: 2 }
    const state = winWithMisses(createGameState({ difficulty: 'medium', bestMoves, cards: pairDeck() }), 1)

    expect(state.status).toBe('won')
    expect(state.isNewRecord).toBe(false)
    expect(state.bestMoves).toBe(bestMoves)
  })

  it('replaces the best result when a win takes fewer moves', () => {
    const bestMoves = { ...createEmptyBestMoves(), easy: 5 }
    const state = winWithMisses(createGameState({ difficulty: 'easy', bestMoves, cards: pairDeck() }), 0)

    expect(state.isNewRecord).toBe(true)
    expect(state.bestMoves).toEqual({ easy: 2, medium: null, hard: null })
    expect(bestMoves.easy).toBe(5)
  })

  it('ignores selections after the game is won', () => {
    const won = winWithMisses(createGameState({ cards: pairDeck() }), 0)

    expect(gameReducer(won, { type: 'select-card', cardId: 'a1' })).toBe(won)
  })
})
