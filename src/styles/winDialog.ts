import styled from 'styled-components'

export const WinDialogContainer = styled.dialog`
  width: min(calc(100% - 2rem), 26rem);
  margin: auto;
  padding: clamp(1.5rem, 5vw, 2rem);
  color: #e7e2d9;
  text-align: center;
  background: #24262a;
  border: 1px solid #3b3d42;
  border-radius: 1.25rem;
  box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.45);

  &::backdrop {
    background: rgba(10, 10, 12, 0.7);
  }

  &[open] {
    animation: win-dialog-in 220ms ease-out;
  }

  @keyframes win-dialog-in {
    from {
      opacity: 0;
      transform: translateY(0.75rem) scale(0.97);
    }
  }

  .win-difficulty {
    color: #f9ce73;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h2 {
    margin: 0.25rem 0 0.75rem;
    color: #fff7e7;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2rem, 8vw, 2.5rem);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .win-moves {
    color: #fff7e7;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .win-record {
    display: inline-block;
    margin-top: 0.75rem;
    padding: 0.25rem 0.75rem;
    color: #1d1c1a;
    background: #f9ce73;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 800;
  }

  .win-best {
    margin-top: 0.75rem;
    color: #c6c0b8;
  }

  .win-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
    margin-top: 1.5rem;

    button {
      flex: 1 1 8rem;
      padding: 0.7rem 0.9rem;
      border-radius: 0.65rem;
      cursor: pointer;
      font-weight: 800;
      white-space: nowrap;
    }
  }

  .win-primary {
    color: #1d1c1a;
    background: #f9ce73;
    border: 1px solid #f9ce73;

    &:hover {
      background: #ffe3a5;
    }
  }

  .win-secondary {
    color: #e7e2d9;
    background: transparent;
    border: 1px solid #55565a;

    &:hover {
      border-color: #f9ce73;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &[open] {
      animation: none;
    }
  }
`
