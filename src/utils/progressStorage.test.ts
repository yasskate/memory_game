import { describe, expect, it } from 'vitest'
import { loadProgress, PROGRESS_STORAGE_KEY, saveProgress } from './progressStorage'

const memoryStorage = (initial?: string) => {
  const values = new Map<string, string>(initial === undefined ? [] : [[PROGRESS_STORAGE_KEY, initial]])
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    values,
  } as unknown as Storage & { values: Map<string, string> }
}

const throwingStorage = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('blocked')
  },
} as unknown as Storage

describe('progressStorage', () => {
  it('starts at medium with no best results when nothing is stored', () => {
    expect(loadProgress(memoryStorage())).toEqual({
      difficulty: 'medium',
      bestMoves: { easy: null, medium: null, hard: null },
    })
  })

  it('round-trips the difficulty and best results', () => {
    const storage = memoryStorage()
    const progress = { difficulty: 'hard' as const, bestMoves: { easy: 9, medium: null, hard: 30 } }

    saveProgress(progress, storage)

    expect(loadProgress(storage)).toEqual(progress)
  })

  it('discards unknown difficulties and invalid move counts', () => {
    const storage = memoryStorage(JSON.stringify({ difficulty: 'expert', bestMoves: { easy: -1, medium: 'ten', hard: 12.5 } }))

    expect(loadProgress(storage)).toEqual({
      difficulty: 'medium',
      bestMoves: { easy: null, medium: null, hard: null },
    })
  })

  it.each(['not json', 'null', '42'])('falls back to defaults for corrupted data: %s', raw => {
    expect(loadProgress(memoryStorage(raw)).difficulty).toBe('medium')
  })

  it('keeps working when storage is unavailable or throws', () => {
    expect(loadProgress(null).difficulty).toBe('medium')
    expect(loadProgress(throwingStorage).difficulty).toBe('medium')
    expect(() => saveProgress(loadProgress(null), throwingStorage)).not.toThrow()
  })
})
