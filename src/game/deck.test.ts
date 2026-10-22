import { describe, expect, it } from 'vitest'
import { AVAILABLE_PAIRS, createDeck, shuffle } from './deck'
import { PAIRS_BY_DIFFICULTY } from './difficulty'

describe('createDeck', () => {
  it('has enough card images for the hardest difficulty', () => {
    expect(AVAILABLE_PAIRS).toBe(16)
  })

  it.each(Object.entries(PAIRS_BY_DIFFICULTY))('creates complete, uniquely identified pairs for %s', (_difficulty, pairCount) => {
    const deck = createDeck(pairCount)
    const counts = new Map<number, number>()

    deck.forEach(card => counts.set(card.pairId, (counts.get(card.pairId) ?? 0) + 1))

    expect(deck).toHaveLength(pairCount * 2)
    expect(new Set(deck.map(card => card.id))).toHaveLength(pairCount * 2)
    expect([...counts.values()]).toEqual(Array(pairCount).fill(2))
    expect(new Set(deck.map(card => card.image))).toHaveLength(pairCount)
    expect(deck.every(card => !card.isFaceUp && !card.isMatched)).toBe(true)
  })

  it('picks a random subset of animals for smaller decks', () => {
    const firstPairs = createDeck(8, () => 0).map(card => card.pairId)
    const lastPairs = createDeck(8, () => 0.999).map(card => card.pairId)

    expect(new Set(firstPairs)).not.toEqual(new Set(lastPairs))
  })

  it.each([0, 17, 2.5])('rejects an impossible pair count of %s', pairCount => {
    expect(() => createDeck(pairCount)).toThrow(RangeError)
  })

  it('uses Fisher-Yates without mutating the source array', () => {
    const source = [1, 2, 3, 4]
    const shuffled = shuffle(source, () => 0)

    expect(source).toEqual([1, 2, 3, 4])
    expect(shuffled).toEqual([2, 3, 4, 1])
  })
})
