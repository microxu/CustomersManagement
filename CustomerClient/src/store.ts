import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Customer, Note } from './api/model';
import * as reducers from './reducers';
import { INITIAL_STATE } from './reducers/initial-state';
import { rootSaga } from './sagas';

export type ReduxIndex<T> = Record<string, T | undefined>;

export interface Sorting {
  key: string;
  ascending: boolean;
}

export interface Filter {
  key?: string;
  value: string;
}

export interface AppState {
  customers: ReduxIndex<Customer>;
  notes: ReduxIndex<ReduxIndex<Note>>;
  sorting: Sorting;
  filters: Filter[];
}

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers(reducers);

export const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
