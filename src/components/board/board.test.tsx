import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BoardEntity, { BoardProps } from '../../entities/board'
import Board from './board'

describe("Test board component", () => {
  it("should render a basic card component", async () => {
    render(<Board />)

    const cardButtons = screen.getAllByTestId('card-button')

    await waitFor(() => {
      expect(cardButtons.length).toBe(18)
    })
  })
})

