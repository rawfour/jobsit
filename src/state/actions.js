import { CHANGE_ACTIVE_FILTERS } from './actionTypes';

export const changeActiveFilters = (activeFilters) => {
  return {
    type: CHANGE_ACTIVE_FILTERS,
    payload: activeFilters,
  };
};
