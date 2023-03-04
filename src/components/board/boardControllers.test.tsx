import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BoardControllers from './boardControllers'

describe("Test board component", () => {
  it("should render a basic card component", async () => {
    render(<BoardControllers />)

    const resetBoardButton = screen.getByTestId('reset-board-button')

    await waitFor(() => {
      fireEvent.click(resetBoardButton)
      expect(resetBoardButton).toHaveBeenCalled
    })
  })
})

