import React from 'react';
import PropTypes from 'prop-types';

const defaultContextValue = {};

const { Provider, Consumer } = React.createContext(defaultContextValue);

class ContextProviderComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      ...defaultContextValue,
    };
  }

  render() {
    const { children } = this.props;
    return <Provider value={this.state}>{children}</Provider>;
  }
}

ContextProviderComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.element]).isRequired,
};

export { Consumer as default, ContextProviderComponent };
