import styled from 'styled-components'

export const BoardContainer = styled.div`
  width: 100%;

  .deck-wrapper {
    background-color: yellow;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`

export const BoardControllersContainer = styled.div`
  background-color: purple;
`
