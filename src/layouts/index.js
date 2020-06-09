import React from "react"
import { ThemeProvider } from "styled-components"
import { theme } from "../assets/styles/mainTheme"
import Navigation from "../components/navigation/Navigation"
import GlobalStyle from "../assets/styles/globalStyles"

const MainLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Navigation />
    {children}
    <GlobalStyle />
  </ThemeProvider>
)

export default MainLayout
