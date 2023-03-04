import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CardEntity, { CardProps } from '../../entities/card'
import Card from './card'

describe("Test card component", () => {
  let card: CardProps

  const getProps = (props: CardProps | {} = {}) => ({
    ...card,
    disabled: false,
    handleSelectedCard: jest.fn(),
    ...props
  })

  beforeEach(() => {
    card = new CardEntity({ cardId: 1, image: '', guessed: false })
  })

  it("should render a basic card component", async () => {
    const props = getProps()

    render(<Card {...props} />)

    const cardButton = screen.getByTestId('card-button')
    await waitFor(() => {
      fireEvent.click(cardButton)
      expect(cardButton).toBeHaveBeenCalled
    })
  })

  it("should render a basic card component disabled", async () => {
    const props = getProps({ disabled: true })

    render(<Card {...props} />)

    const cardButton = screen.getByTestId('card-button')

    await waitFor(() => {
      expect(cardButton).toBeDisabled()
    })
  })
})

