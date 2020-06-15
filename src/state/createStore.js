import { createStore as reduxCreateStore } from 'redux';
import { CHANGE_ACTIVE_FILTERS } from './actionTypes';

const initialState = {
  activeFilters: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_FILTERS:
      return {
        ...state,
        activeFilters: action.payload,
      };

    default:
      return state;
  }
};

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
