import * as actions from '../actions/customer';
import { Customer } from '../api/model';
import { ReduxIndex } from '../store';
import { INITIAL_STATE } from './initial-state';

export function customersReducer(
  state: ReduxIndex<Customer> = INITIAL_STATE.customers,
  action:
    typeof actions.updateCustomers.shape |
    typeof actions.updateCustomer.shape
): ReduxIndex<Customer> {
  switch (action.type) {
    case actions.updateCustomers.type: {
      return action.payload.reduce(
        (p, c) => {
          p[c.id] = c;
          return p;
        },
        {} as ReduxIndex<Customer>
      );
    }
    case actions.updateCustomer.type: {
      const customerId = action.payload.id;
      return {
        ...state,
        [customerId]: action.payload
      };
    }
    default:
      return state;
  }
}
