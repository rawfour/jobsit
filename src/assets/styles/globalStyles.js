import { createGlobalStyle } from 'styled-components';

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
    font-size: ${({ theme }) => theme.fontSizes.s};
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme.colors.text};
    @media ${({ theme }) => theme.breakpoints.lg} {
      font-size: ${({ theme }) => theme.fontSizes.m};
  }
  }

`;

export default GlobalStyle;
