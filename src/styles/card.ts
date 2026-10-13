import styled from 'styled-components'

export const CardContainer = styled.div`
  width: 100%;

  .card-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-button {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    padding: 0;
    overflow: hidden;
    cursor: pointer;
    background: #171819;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    transition: border-color 160ms ease, opacity 160ms ease, transform 160ms ease;

    &:hover:not(:disabled) {
      border-color: #f9ce73;
      transform: translateY(-0.15rem);
    }

    &:disabled {
      cursor: default;
    }

    &:disabled .card-image {
      opacity: 0.85;
    }
  }
`

