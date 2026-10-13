import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    background: #161719;
    color: #f5f0e8;
    font-family: 'Avenir Next', Avenir, 'Segoe UI', sans-serif;
    line-height: 1.5;
  }

  body {
    min-width: 20rem;
    min-height: 100dvh;
    background: radial-gradient(circle at top, #30343a 0, #161719 46rem);
  }

  button {
    font: inherit;
  }

  button:focus-visible {
    outline: 3px solid #fff7e7;
    outline-offset: 3px;
  }
`

export default GlobalStyle

