import React from 'react';
import ContextConsumer from '../context';

const withContext = (Component) => {
  return (props) => (
    <ContextConsumer>
      {(context) => {
        return <Component {...props} context={context} />;
      }}
    </ContextConsumer>
  );
};

export default withContext;
