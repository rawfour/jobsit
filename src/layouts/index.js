import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/styles/mainTheme';
import Navigation from '../components/navigation/Navigation';
import GlobalStyle from '../assets/styles/globalStyles';
import { ContextProviderComponent } from '../context';

const MainLayout = ({ children, location: { pathname } }) => {
  return (
    <ContextProviderComponent>
      <ThemeProvider theme={theme} injectFirst>
        <Navigation pathname={pathname} />
        {children}
        <GlobalStyle />
      </ThemeProvider>
    </ContextProviderComponent>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]).isRequired,
  location: PropTypes.shape().isRequired,
};

export default MainLayout;
