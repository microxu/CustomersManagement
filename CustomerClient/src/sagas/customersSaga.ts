import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as commandActions from '../actions/commands';
import * as actions from '../actions/customer';
import { apiClient } from '../api';
import { Customer } from '../api/model';

function* fetchCustomerSaga(action: typeof commandActions.fetchCustomers.shape): SagaIterator {
  // TODO: Error Handling
  const customers: Customer[] = yield call(apiClient.getCustomersAsync);
  yield put(actions.updateCustomers(customers));
}

function* updateCustomerSaga(action: typeof commandActions.updateCustomer.shape): SagaIterator {
  const customer = action.payload;
  // TODO: Error Handling
  const c: Customer = yield call(apiClient.updateCustomerAsync, customer);
  yield put(actions.updateCustomer(c));
}

export function* customersSaga(): SagaIterator {
  yield takeEvery(commandActions.fetchCustomers.type, fetchCustomerSaga);
  yield takeEvery(commandActions.updateCustomer.type, updateCustomerSaga);
}
