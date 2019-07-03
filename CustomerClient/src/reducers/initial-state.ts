import { AppState } from '../store';

export const INITIAL_STATE: AppState = {
  customers: {},
  notes: {},
  sorting: {
    key: 'createDate',
    ascending: false
  },
  filters: []
};
