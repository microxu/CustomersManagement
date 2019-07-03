import * as actions from '../actions/filters';
import { Filter } from '../store';
import { INITIAL_STATE } from './initial-state';

export function filtersReducer(
  state: Filter[] = INITIAL_STATE.filters,
  action:
    typeof actions.addFilter.shape |
    typeof actions.removeFilter.shape
): Filter[] {
  switch (action.type) {
    case actions.addFilter.type:
      return state.concat([action.payload]);
    case actions.removeFilter.type:
      return state.filter(f => f !== action.payload);
    default:
      return state;
  }
}
