import { createDeck } from './deck'
import { createEmptyBestMoves, DEFAULT_DIFFICULTY, PAIRS_BY_DIFFICULTY } from './difficulty'
import type { BestMoves, Difficulty, GameAction, GameCard, GameState } from './types'

interface GameStateOptions {
  difficulty?: Difficulty
  bestMoves?: BestMoves
  cards?: GameCard[]
}

export const createGameState = ({
  difficulty = DEFAULT_DIFFICULTY,
  bestMoves = createEmptyBestMoves(),
  cards = createDeck(PAIRS_BY_DIFFICULTY[difficulty]),
}: GameStateOptions = {}): GameState => ({
  cards,
  moves: 0,
  selectedCardIds: [],
  status: 'playing',
  difficulty,
  bestMoves,
  isNewRecord: false,
})

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  if (action.type === 'new-game') {
    return createGameState({ difficulty: action.difficulty, bestMoves: state.bestMoves, cards: action.cards })
  }

  if (action.type === 'resolve-mismatch') {
    if (state.status !== 'resolving') return state

    return {
      ...state,
      cards: state.cards.map(card =>
        state.selectedCardIds.includes(card.id) ? { ...card, isFaceUp: false } : card,
      ),
      selectedCardIds: [],
      status: 'playing',
    }
  }

  if (state.status !== 'playing') return state

  const selectedCard = state.cards.find(card => card.id === action.cardId)
  if (!selectedCard || selectedCard.isFaceUp || selectedCard.isMatched) return state

  const selectedCardIds = [...state.selectedCardIds, selectedCard.id]
  const cardsWithSelection = state.cards.map(card =>
    card.id === selectedCard.id ? { ...card, isFaceUp: true } : card,
  )

  if (selectedCardIds.length < 2) {
    return { ...state, cards: cardsWithSelection, selectedCardIds }
  }

  const [firstCardId, secondCardId] = selectedCardIds
  const firstCard = cardsWithSelection.find(card => card.id === firstCardId)
  const secondCard = cardsWithSelection.find(card => card.id === secondCardId)

  if (!firstCard || !secondCard) return state

  const moves = state.moves + 1

  if (firstCard.pairId !== secondCard.pairId) {
    return {
      ...state,
      cards: cardsWithSelection,
      moves,
      selectedCardIds,
      status: 'resolving',
    }
  }

  const matchedCards = cardsWithSelection.map(card =>
    selectedCardIds.includes(card.id) ? { ...card, isMatched: true } : card,
  )

  if (!matchedCards.every(card => card.isMatched)) {
    return { ...state, cards: matchedCards, moves, selectedCardIds: [] }
  }

  const previousBest = state.bestMoves[state.difficulty]
  const isNewRecord = previousBest === null || moves < previousBest

  return {
    ...state,
    cards: matchedCards,
    moves,
    selectedCardIds: [],
    status: 'won',
    bestMoves: isNewRecord ? { ...state.bestMoves, [state.difficulty]: moves } : state.bestMoves,
    isNewRecord,
  }
}
