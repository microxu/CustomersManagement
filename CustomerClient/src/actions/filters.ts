import { Filter } from '../store';
import { createAction } from './action';

export const addFilter = createAction<'store/filter/add', Filter>(
  'store/filter/add'
);

export const removeFilter = createAction<'store/filter/remove', Filter>(
  'store/filter/remove'
);
