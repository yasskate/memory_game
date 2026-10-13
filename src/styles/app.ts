import styled from 'styled-components'

export const AppContainer = styled.main`
  width: min(100%, 72rem);
  margin: 0 auto;
  padding: clamp(1.25rem, 4vw, 3rem);

  .app-header {
    max-width: 42rem;
    margin: 0 auto 1.5rem;
    text-align: center;
  }

  .language-switch {
    display: flex;
    justify-content: flex-end;
    gap: 0.35rem;
    margin-bottom: clamp(1.25rem, 4vw, 2rem);

    button {
      padding: 0.4rem 0.7rem;
      color: #c6c0b8;
      background: transparent;
      border: 1px solid #55565a;
      border-radius: 999px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 700;
    }

    button[aria-pressed='true'] {
      color: #1d1c1a;
      background: #f9ce73;
      border-color: #f9ce73;
    }
  }

  .eyebrow {
    margin-bottom: 0.25rem;
    color: #f9ce73;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h1 {
    color: #fff7e7;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(2.5rem, 8vw, 4.75rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    line-height: 0.95;
  }

  .intro {
    margin: 1rem auto 0;
    color: #c6c0b8;
    max-width: 32rem;
  }

  .win-message {
    margin: 1.25rem auto -0.5rem;
    color: #fff7e7;
    font-weight: 700;
    text-align: center;
  }
`

