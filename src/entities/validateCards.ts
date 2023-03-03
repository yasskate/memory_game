import { CardProps } from './card'

interface ValidateCardsProps {
  arePairs: () => boolean
  cards: CardProps[]
}

class ValidateCards {
  cards: CardProps[]

  constructor(cards: CardProps[]) {
    this.cards = cards
  }

  arePairs() {
    const ids = new Set(this.cards.map(card => card.id))
    const cardIds = new Set(this.cards.map(card => card.cardId))

    return cardIds.size < this.cards.length && ids.size === 2
  }
}

export default ValidateCards

