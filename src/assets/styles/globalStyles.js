import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

  html {
    font-size: 62.5%;
  }

  ul,li{
      list-style: none;
  }

  a{
      text-decoration: none;
      color: inherit
  }

  body {
    font-size: 1.6rem;
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

`

export default GlobalStyle
