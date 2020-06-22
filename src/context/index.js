import React from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = React.createContext();

class ContextProviderComponent extends React.Component {
  state = {
    specialLayout: false,
  };

  handleChangeSate = (newState) => {
    this.setState((state) => ({
      ...state,
      ...newState,
    }));
  };

  render() {
    const { children } = this.props;
    return (
      <Provider value={{ state: this.state, updateValue: this.handleChangeSate }}>
        {children}
      </Provider>
    );
  }
}

ContextProviderComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.element]).isRequired,
};

export { Consumer as default, ContextProviderComponent };
