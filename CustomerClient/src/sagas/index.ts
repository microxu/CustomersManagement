import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { customersSaga } from './customersSaga';
import { notesSaga } from './notesSaga';

export function* rootSaga(): SagaIterator {
  yield all([
    fork(customersSaga),
    fork(notesSaga)
  ]);
}
