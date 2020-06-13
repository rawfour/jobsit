import React, { useReducer, createContext } from 'react';
import PropTypes from 'prop-types';
import { CHANGE_ACTIVE_FILTERS } from './actionTypes';

export const GlobalStateContext = createContext();
export const GlobalDispatchContext = createContext();

const initialState = {
  activeFilters: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_FILTERS: {
      return {
        ...state,
        activeFilters: action.paylaod,
      };
    }
    default:
      throw new Error('Bad action type');
  }
};

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>{children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GlobalContextProvider;
