import { useState } from 'react'
import DeckEntity from '../entities/deck'

const newDeck = new DeckEntity()

const useDeck = () => {
  const [deck] = useState(newDeck.deck)

  return {
    deck
  }
}

export default useDeck

