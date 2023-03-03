import styled from 'styled-components'

export const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .deck-wrapper {
    background-color: yellow;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    margin: 3em 0;

    background: rgba(255, 255, 0, 0.18);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.2px);
    -webkit-backdrop-filter: blur(6.2px);
    border: 1px solid rgba(255, 255, 0, 0.2);
  }

  @media(min-width: 982px) {
    .deck-wrapper {
      width: 80%;
    }
  }
`

export const BoardControllersContainer = styled.div<{ disabled: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(250, 250, 250, 0.16);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.2px);
  -webkit-backdrop-filter: blur(6.2px);
  border: 1px solid rgba(250, 250, 250, 0.2);
  padding: 1em;

  .reset-board-button {
    border: none;
    outline: none;
    color: #fff;
    background-color: #2bace3;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
    padding: 1em;
    opacity: ${props => props.disabled ? 1 : 0.4};

    :hover {
      cursor: ${props => props.disabled ? ' pointer' : 'not-allowed' };
    }
  }
`
