import Card, { CardProps } from './card'
import { images } from '../utils/images'

export interface DeckProps {
  deck: CardProps[]
}

class Deck {
  deck: CardProps[]
  deckCards: number

  constructor() {
    this.deck = []
    this.deckCards = Object.keys(images).length

    this.create()
    this.sortDeck()
  }

  create() {
    let numberOfCard = 1

    while (this.deck.length < this.deckCards * 2 && numberOfCard > 0) {
      const newCard = new Card({
        cardId: numberOfCard,
        image: images[numberOfCard as keyof typeof images],
        guessed: false
      })


      if (numberOfCard < this.deckCards && this.deck.length < this.deckCards) {
        numberOfCard++
      }

      if (numberOfCard <= this.deckCards && numberOfCard === this.deck.length || this.deck.length > this.deckCards) {
        numberOfCard--
      }

      this.deck.push(newCard)
    }
  }

  sortDeck() {
    this.deck.sort((card1, card2) => card1.id! - card2.id!)
  }

  reset() {}
}

export default Deck
