import { create } from 'zustand'
import BoardEntity, { BoardProps } from '../entities/board'

export interface useBoardStoreProps extends BoardProps {
  incrementMoves: () => void;
  gameOver: boolean;
  resetBoard: () => void;
  setGameOver: (payload: boolean) => void;
}


const createBoardEntity = (): BoardProps => {
  const boardEntity = new BoardEntity()
  return { ...boardEntity }
}

const useBoardStore = create<useBoardStoreProps>((set) => ({
  moves: createBoardEntity().moves,
  gameOver: createBoardEntity().gameOver,
  incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),
  resetBoard: () => set({ ...createBoardEntity()}),
  setGameOver: (payload) => set(() => ({ gameOver: payload }))
 }))

export default useBoardStore

