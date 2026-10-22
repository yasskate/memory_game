import styled from 'styled-components'

const FLIP_DURATION_MS = 450
// Small cards on phones get a tighter radius and shadow so they don't look bulky.
const CARD_RADIUS = 'clamp(0.4rem, 1.6vw, 0.75rem)'

export const CardContainer = styled.div`
  width: 100%;

  .card-button {
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: none;
    border-radius: ${CARD_RADIUS};
    perspective: 60rem;
    transition: transform 160ms ease;

    &:hover:not(:disabled) {
      transform: translateY(-0.15rem);
    }

    &:hover:not(:disabled) .card-face {
      border-color: #f9ce73;
    }

    &:disabled {
      cursor: default;
    }

    &:disabled .card-image {
      opacity: 0.85;
    }
  }

  .card-inner {
    position: absolute;
    inset: 0;
    display: block;
    transform-style: preserve-3d;
    transition: transform ${FLIP_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1);

    &[data-face-up='true'] {
      transform: rotateY(180deg);
    }
  }

  .card-face {
    position: absolute;
    inset: 0;
    display: block;
    overflow: hidden;
    background: #171819;
    border: 2px solid transparent;
    border-radius: ${CARD_RADIUS};
    box-shadow: 0 clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem) rgba(0, 0, 0, 0.2);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition: border-color 160ms ease;
  }

  .card-face--front {
    transform: rotateY(180deg);
  }

  .card-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 160ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    .card-button,
    .card-inner {
      transition: none;
    }
  }
`
