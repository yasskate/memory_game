import { describe, expect, it } from 'vitest'
import { createDeck, shuffle } from './deck'

describe('createDeck', () => {
  it('creates two uniquely identified cards for every image', () => {
    const deck = createDeck(() => 0.5)
    const counts = new Map<number, number>()

    deck.forEach(card => counts.set(card.pairId, (counts.get(card.pairId) ?? 0) + 1))

    expect(deck).toHaveLength(18)
    expect(new Set(deck.map(card => card.id))).toHaveLength(18)
    expect([...counts.values()]).toEqual(Array(9).fill(2))
  })

  it('uses Fisher-Yates without mutating the source array', () => {
    const source = [1, 2, 3, 4]
    const shuffled = shuffle(source, () => 0)

    expect(source).toEqual([1, 2, 3, 4])
    expect(shuffled).toEqual([2, 3, 4, 1])
  })
})
