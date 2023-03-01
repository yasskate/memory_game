import { createGlobalStyle } from "styled-components"

 // export default createGlobalStyle`
 const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      outline:0;
      box-sizing:border-box;
      font-family: 'Open Sans', sans-serif; 
  }

  #root {
    margin:0 auto;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }
`

export default GlobalStyle

