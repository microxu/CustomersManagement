import { Sorting } from '../store';
import { createAction } from './action';

export const updateSorting = createAction<'store/sorting/update', Sorting>(
  'store/sorting/update'
);
