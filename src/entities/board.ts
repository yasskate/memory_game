export interface BoardProps {
  moves: number;
  gameOver: boolean;
}

class Board {
  moves: number
  gameOver: boolean

  constructor() {
    this.moves = 0
    this.gameOver = false
  }
}

export default Board

