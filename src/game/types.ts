export type GameStatus = 'playing' | 'resolving' | 'won'

export type Difficulty = 'easy' | 'medium' | 'hard'

/** Fewest moves needed to win each difficulty; null until the first win. */
export type BestMoves = Record<Difficulty, number | null>

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
  difficulty: Difficulty
  bestMoves: BestMoves
  /** True when the game that was just won beat the previous best for its difficulty. */
  isNewRecord: boolean
}

export type GameAction =
  | { type: 'select-card'; cardId: string }
  | { type: 'resolve-mismatch' }
  // The deck is created by the caller so the reducer stays pure.
  | { type: 'new-game'; difficulty: Difficulty; cards: GameCard[] }
