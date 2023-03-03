import { useEffect, useState } from 'react'
import DeckEntity from '../entities/deck'
import ValidateCards from '../entities/validateCards'
import { CardProps } from '../entities/card'

const mainSourceDeck = new DeckEntity()

const useDeck = () => {
  const [deck, setDeck] = useState(mainSourceDeck.deck)
  const [cardsFaceUp, setCardsFaceUp] = useState<CardProps[] | []>([])

  useEffect(() => {
    handleFlippedCardsValidations()
  }, [cardsFaceUp])

  const handleFlippedCardsValidations = async () => {
    if (cardsFaceUp.length < 2) return

    if (cardsFaceUpArePairs()) {
      handleGuessedCards()
      resetCardsFaceUp()
    } else {
      await flipCardsFaceDown()
    }
  }

  const handleFlip = (card: CardProps) => {
    if (card.guessed || card.isFaceUp) return
    flipCard(card)
  }

  const flipCard = (card: CardProps) => {
    const newDeck = [...deck]
    const cardIndex = getCardIndex(card.id!)
    const selectedCard = { ...newDeck[cardIndex], isFaceUp: !card.isFaceUp }

    newDeck[cardIndex] =  selectedCard

    setDeck(newDeck)
    setCardsFaceUp(prevcardsFaceUp => ([...prevcardsFaceUp, selectedCard]))
  }

  const flipCardsFaceDown = () => {
    if (!cardsFaceUp.length && (cardsFaceUpArePairs() || !(getUnguessedCards().length >= 2))) return

    setDeckPromise().then(response => response === 'success' && resetCardsFaceUp())
  }

  const setDeckPromise = () => new Promise((resolve) =>
    setTimeout(() => {
      const [cardIndex1, cardIndex2] = cardsFaceUp.map(({ id }) => getCardIndex(id!))

      setDeck((prevDeck) => {
        const updatedDeck = [...prevDeck]
        const selectedCard1 = deck[cardIndex1]
        const selectedCard2 = deck.at(cardIndex1)

        updatedDeck[cardIndex1] = { ...selectedCard1, isFaceUp: !selectedCard1.isFaceUp }
        updatedDeck[cardIndex2] = { ...prevDeck[cardIndex2], isFaceUp: !deck[cardIndex2].isFaceUp }

        resolve('success')
        return updatedDeck
      })
    }, 1500)
  )

  const handleGuessedCards = () => {
    const newDeck = [...deck]
    const [cardIndex1, cardIndex2] = cardsFaceUp.map(({ id }) => getCardIndex(id!))

    if (cardIndex1 && cardIndex2) {
      newDeck[cardIndex1] = { ...deck[cardIndex1], guessed: !deck[cardIndex1].guessed }
      newDeck[cardIndex2] = { ...deck[cardIndex2], guessed: !deck[cardIndex2].guessed }
      setDeck(newDeck)
    }
  }

  const resetCardsFaceUp = () => {
    setCardsFaceUp([])
  }

  const getCardsFaceUp = (): CardProps[] | [] =>
    deck.filter(cards => cards.isFaceUp)

  const getUnguessedCards = (): CardProps[] | [] =>
    getCardsFaceUp().filter(cards => !cards.guessed)

  const getCardIndex = (cardId: number): number =>
    deck.findIndex(card => card.id=== cardId)

  const cardsFaceUpArePairs = (): boolean => {
    if (cardsFaceUp.length < 2) return false

    const validateCards = new ValidateCards(cardsFaceUp)
    return validateCards.arePairs()
  }

  return {
    deck,
    cardsFaceUp,
    handleFlip
  }
}

export default useDeck

