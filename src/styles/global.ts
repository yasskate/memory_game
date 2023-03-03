import { createGlobalStyle } from "styled-components"

 const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'Open Sans', sans-serif; 
  }

  #root {
    display: flex;
    flex: 1;
    justify-content: center;
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
    display: flex;
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: #242424;
  }
`

export default GlobalStyle

