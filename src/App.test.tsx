import React from 'react'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
// import BoardEntity, { BoardProps } from '../../entities/board'
import App from './App'

describe("Test app component", () => {
  it("should render the title correctly", async () => {
    render(<App />)

    const titleText = screen.getByText('Memorama challenge')
    expect(titleText.textContent).toBe("Memorama challenge")
  })

  it("should render the default moves value", async () => {
    render(<App />)

    const cardButtons = screen.getAllByTestId('card-button')
    const titleText = screen.getByTestId('moves')

    await waitFor(() => {
      expect(titleText.textContent).toBe("0")
    })
  })
})

