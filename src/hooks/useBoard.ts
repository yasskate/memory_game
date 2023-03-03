import { useState } from 'react'

const useBoard = () => {
  const [moves, setMoves] = useState(0)

  return {
    moves,
  }
}

export default useBoard

