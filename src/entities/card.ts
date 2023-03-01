import coverImage from '../assets/cards/cover.png'

export interface CardProps {
  id?: number;
  cardId: number;
  image: string;
  guessed: boolean;
  coverImage?: string;
}

class Card {
  id: number
  cardId: number
  image: string
  guessed: boolean
  coverImage: string

  constructor({ cardId, image, guessed }: CardProps) {
    this.id = Math.floor(Math.random() * 9999) + 1
    this.cardId = cardId
    this.image = image
    this.guessed = guessed
    this.coverImage = coverImage
  }
}

export default Card

