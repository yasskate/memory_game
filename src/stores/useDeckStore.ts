import { create } from 'zustand'
import DeckEntity, { DeckProps } from '../entities/deck'
import { CardProps } from '../entities/card'

export interface useDeckStoreProps {
  deck: CardProps[];
  setDeck: (payload: CardProps[]) => void;
  cardsFaceUp: CardProps[] | [];
  setCardsFaceUp: (payload: CardProps[]) => void;
  resetDeck: () => void;
}

const createDeck = () => {
  const newDeck = new DeckEntity()
  return newDeck.deck
}

const useDeckStore = create<useDeckStoreProps>((set) => ({
  deck: [...createDeck()],
  setDeck: (payload: CardProps[]) => set(() => ({ deck: payload })),
  cardsFaceUp: [],
  setCardsFaceUp: (payload: CardProps[]) => set(() => ({ cardsFaceUp: [...payload] })),
  resetDeck: () => set(() => ({ deck: [...createDeck()] }))
 }))

export default useDeckStore

