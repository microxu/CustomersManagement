import * as actions from '../actions/sorting';
import { Sorting } from '../store';
import { INITIAL_STATE } from './initial-state';

export function sortingReducer(
  state: Sorting = INITIAL_STATE.sorting,
  action:
    typeof actions.updateSorting.shape
): Sorting {
  switch (action.type) {
    case actions.updateSorting.type:
      return action.payload;
    default:
      return state;
  }
}
