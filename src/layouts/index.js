import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/mainTheme';
import Navigation from '../components/navigation/Navigation';
import GlobalStyle from '../assets/styles/globalStyles';

const MainLayout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Navigation />
    {children}
    <GlobalStyle />
  </ThemeProvider>
);

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]).isRequired,
};

export default MainLayout;
