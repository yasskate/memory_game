import ValidateCardsEntity from '../validateCards'
import CardEntity, { CardProps } from '../card'



describe("Test validate cards entity", () => {
  const createCard = (props: CardProps) => {
    const newCard = new CardEntity(props)
    return newCard
  }

  it("should validate if two cards are pair", () => {
    const cards = [
      { ...createCard({ cardId: 1, image: '', guessed: false }), isFaceUp: true },
      { ...createCard({ cardId: 1, image: '', guessed: false }), isFaceUp: true },
    ]

    const validateCardsEntity = new ValidateCardsEntity(cards)

    expect(validateCardsEntity.arePairs()).toBe(true)
  })

  it("should validate if two cards are not pair", () => {
    const cards = [
      { ...createCard({ cardId: 4, image: '', guessed: false }), isFaceUp: true },
      { ...createCard({ cardId: 1, image: '', guessed: false }), isFaceUp: true },
    ]

    const validateCardsEntity = new ValidateCardsEntity(cards)

    expect(validateCardsEntity.arePairs()).toBe(false)
  })

})

