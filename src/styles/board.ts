import styled from 'styled-components'

export const BoardContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;

  .deck-wrapper {
    display: grid;
    gap: clamp(0.45rem, 1.4vw, 0.9rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-width: 48rem;
    width: 100%;
    margin: clamp(1.5rem, 4vw, 2.5rem) 0;
    padding: clamp(0.65rem, 2vw, 1.1rem);
    background: rgba(255, 247, 231, 0.05);
    border: 1px solid rgba(255, 247, 231, 0.1);
    border-radius: 1.25rem;
  }

  @media (min-width: 30rem) {
    .deck-wrapper {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 48rem) {
    .deck-wrapper {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
`

export const BoardControllersContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  justify-content: space-between;
  max-width: 48rem;
  margin: 1.5rem auto 0;
  padding: 0.9rem 1rem;
  background: #24262a;
  border: 1px solid #3b3d42;
  border-radius: 0.9rem;

  p {
    color: #e7e2d9;
    font-weight: 600;
  }

  .reset-board-button {
    border: none;
    color: #1d1c1a;
    background-color: #f9ce73;
    cursor: pointer;
    border-radius: 0.65rem;
    padding: 0.7rem 0.9rem;
    font-weight: 800;

    &:hover {
      background-color: #ffe3a5;
    }
  }
`
