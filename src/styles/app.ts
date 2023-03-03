import styled from 'styled-components'

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  background-color: green;

  @media(min-width: 982px) {
    width: 65%;
  }
`

