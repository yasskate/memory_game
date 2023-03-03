import { useEffect, useState } from 'react'
import { shallow } from 'zustand/shallow'
import useDeckStore from '../stores/useDeckStore'
import useBoardStore from '../stores/useBoardStore'
import DeckEntity from '../entities/deck'
import ValidateCards from '../entities/validateCards'
import { CardProps } from '../entities/card'

const useDeck = () => {
  const { deck, setDeck, cardsFaceUp, setCardsFaceUp } = useDeckStore(state => state, shallow)
  const { incrementMoves, setGameOver, gameOver } = useBoardStore()

  useEffect(() => {
    handleFlippedCardsValidations()

    if (isGameOver()) setGameOver(true)
  }, [deck, cardsFaceUp])

  const handleFlippedCardsValidations = async () => {
    if (cardsFaceUp.length < 2) return

    if (cardsFaceUpArePairs()) {
      handleGuessedCards()
      resetCardsFaceUp()
    } else {
      await flipCardsFaceDown()
    }

    incrementMoves()
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
    setCardsFaceUp([...cardsFaceUp, selectedCard])
  }

  const flipCardsFaceDown = () => {
    if (!cardsFaceUp.length && (cardsFaceUpArePairs() || !(getUnguessedCards().length >= 2))) return

    setDeckPromise().then(response => response === 'success' && resetCardsFaceUp())
  }

  const setDeckPromise = () => new Promise((resolve) =>
    setTimeout(() => {
      const [cardIndex1, cardIndex2] = cardsFaceUp.map(({ id }) => getCardIndex(id!))

      const deckCopy = [...deck]
      const selectedCard1 = deck[cardIndex1]
      const selectedCard2 = deck.at(cardIndex1)

      deck[cardIndex1] = { ...selectedCard1, isFaceUp: !selectedCard1.isFaceUp }
      deck[cardIndex2] = { ...deckCopy[cardIndex2], isFaceUp: !deck[cardIndex2].isFaceUp }

      resolve('success')
      return deckCopy
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

  const resetCardsFaceUp = () =>
    setCardsFaceUp([])

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

  const isGameOver = (): boolean =>
    getCardsFaceUp().length === deck.length

  return {
    deck,
    cardsFaceUp,
    handleFlip,
  }
}

export default useDeck

