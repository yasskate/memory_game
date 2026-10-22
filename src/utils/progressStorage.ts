import { createEmptyBestMoves, DEFAULT_DIFFICULTY, DIFFICULTIES, isDifficulty } from '../game/difficulty'
import type { BestMoves, Difficulty } from '../game/types'

export const PROGRESS_STORAGE_KEY = 'memory-game:progress'

export interface StoredProgress {
  difficulty: Difficulty
  bestMoves: BestMoves
}

const defaultProgress = (): StoredProgress => ({
  difficulty: DEFAULT_DIFFICULTY,
  bestMoves: createEmptyBestMoves(),
})

// Accessing localStorage can throw (private mode, blocked site data), so every access is guarded.
const getStorage = (): Storage | null => {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const isMoveCount = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value > 0

export const loadProgress = (storage: Storage | null = getStorage()): StoredProgress => {
  try {
    const raw = storage?.getItem(PROGRESS_STORAGE_KEY)
    if (!raw) return defaultProgress()

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return defaultProgress()

    const { difficulty, bestMoves } = parsed as Partial<Record<keyof StoredProgress, unknown>>
    const storedBest = typeof bestMoves === 'object' && bestMoves !== null ? (bestMoves as Record<string, unknown>) : {}

    return {
      difficulty: isDifficulty(difficulty) ? difficulty : DEFAULT_DIFFICULTY,
      bestMoves: Object.fromEntries(
        DIFFICULTIES.map(level => [level, isMoveCount(storedBest[level]) ? storedBest[level] : null]),
      ) as BestMoves,
    }
  } catch {
    return defaultProgress()
  }
}

export const saveProgress = (progress: StoredProgress, storage: Storage | null = getStorage()) => {
  try {
    storage?.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Progress is a convenience; the game keeps working when it cannot be saved.
  }
}
