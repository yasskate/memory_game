import { createDeck } from './deck'
import type { GameAction, GameState } from './types'

export const createGameState = (cards = createDeck()): GameState => ({
  cards,
  moves: 0,
  selectedCardIds: [],
  status: 'playing',
})

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  if (action.type === 'restart') {
    return createGameState()
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

  if (firstCard.pairId !== secondCard.pairId) {
    return {
      ...state,
      cards: cardsWithSelection,
      moves: state.moves + 1,
      selectedCardIds,
      status: 'resolving',
    }
  }

  const matchedCards = cardsWithSelection.map(card =>
    selectedCardIds.includes(card.id) ? { ...card, isMatched: true } : card,
  )
  const status = matchedCards.every(card => card.isMatched) ? 'won' : 'playing'

  return {
    ...state,
    cards: matchedCards,
    moves: state.moves + 1,
    selectedCardIds: [],
    status,
  }
}
