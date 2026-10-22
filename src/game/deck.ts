import coverImage from '../assets/cards/cover.webp'
import { images } from '../utils/images'
import type { GameCard } from './types'

type Random = () => number

export const shuffle = <T,>(items: T[], random: Random = Math.random): T[] => {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

export const AVAILABLE_PAIRS = Object.keys(images).length

/** Picks `pairCount` random images and returns two shuffled cards for each. */
export const createDeck = (pairCount: number, random: Random = Math.random): GameCard[] => {
  if (!Number.isInteger(pairCount) || pairCount < 1 || pairCount > AVAILABLE_PAIRS) {
    throw new RangeError(`pairCount must be an integer between 1 and ${AVAILABLE_PAIRS}, received ${pairCount}`)
  }

  const chosenImages = shuffle(Object.entries(images), random).slice(0, pairCount)
  const cards = chosenImages.flatMap(([pairId, image]) =>
    [0, 1].map(copy => ({
      id: `card-${pairId}-${copy}`,
      pairId: Number(pairId),
      image,
      coverImage,
      isFaceUp: false,
      isMatched: false,
    })),
  )

  return shuffle(cards, random)
}
