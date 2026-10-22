import type { BestMoves, Difficulty } from './types'

export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const satisfies readonly Difficulty[]

export const PAIRS_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 8,
  medium: 12,
  hard: 16,
}

export const DEFAULT_DIFFICULTY: Difficulty = 'medium'

export const isDifficulty = (value: unknown): value is Difficulty =>
  DIFFICULTIES.includes(value as Difficulty)

export const createEmptyBestMoves = (): BestMoves => ({ easy: null, medium: null, hard: null })
