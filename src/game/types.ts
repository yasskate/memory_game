export type GameStatus = 'playing' | 'resolving' | 'won'

export interface GameCard {
  id: string
  pairId: number
  image: string
  coverImage: string
  isFaceUp: boolean
  isMatched: boolean
}

export interface GameState {
  cards: GameCard[]
  moves: number
  selectedCardIds: string[]
  status: GameStatus
}

export type GameAction =
  | { type: 'select-card'; cardId: string }
  | { type: 'resolve-mismatch' }
  | { type: 'restart' }
