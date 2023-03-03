import coverImage from '../assets/cards/cover.png'
import { getRandomUniqueId } from '../utils'

export interface CardProps {
  id?: number;
  cardId: number;
  image: string;
  guessed: boolean;
  coverImage?: string;
  isFaceUp?: boolean;
}

class Card {
  id: number
  cardId: number
  image: string
  guessed: boolean
  coverImage: string
  isFaceUp: boolean

  constructor({ cardId, image, guessed }: CardProps) {
    this.id = getRandomUniqueId()
    this.cardId = cardId
    this.image = image
    this.guessed = guessed
    this.coverImage = coverImage
    this.isFaceUp = false
  }
}

export default Card

