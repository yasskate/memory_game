import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  background: transparent;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0.5em;
  width: 100%;

  .card-image {
    height: 10em;
    width: 7.5em;
  }

  .card-button {
    :hover {
      opacity: 0.7;
      }
  }
 `

