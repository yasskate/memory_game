import coverImage from '../assets/cards/cover.png'
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

export const createDeck = (random: Random = Math.random): GameCard[] => {
  const cards = Object.entries(images).flatMap(([pairId, image]) =>
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
