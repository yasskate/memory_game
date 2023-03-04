import React, { useState } from 'react'
import Board from './components/board/board'
import BoardControllers from './components/board/boardControllers'
import { AppContainer } from './styles/app'

function App() {

  return (
    <AppContainer>
      <h1 className='title'>Memorama challenge</h1>
      <BoardControllers />
      <Board />
    </AppContainer>
  )
}

export default App
