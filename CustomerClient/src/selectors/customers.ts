import { createSelector } from 'reselect';
import { Customer, CustomerId, Note } from '../api/model';
import { AppState, Filter, ReduxIndex, Sorting } from '../store';
import { isNotNull } from '../utils';

const selectCustomersList = createSelector(
  (s: AppState) => s.customers,
  (
    customers: ReduxIndex<Customer>
  ): Customer[] => {
    return Object.values(customers).filter(isNotNull);
  }
);

const filterCustomers = createSelector(
  selectCustomersList,
  (s: AppState) => s.filters,
  (
    customers: Customer[],
    filters: Filter[],
  ): Customer[] => {
    if (filters.length > 0) {
      return customers.filter(c => {
        for (const f of filters) {
          const r = applyFilter(c, f);
          if (!r) {
            return false;
          }
        }
        return true;
      });
    }
    return customers;
  }
);

function applyFilter(c: Customer, f: Filter): boolean {
  const { key: k, value: v } = f;
  if (k != null) {
    // key-based match
    const key = mapKey(k);
    if (key == null) {
      return false;
    }
    const value = (c as any)[key];
    if (value == null) {
      return false;
    }
    return value.toString().toLowerCase().includes(v.toLowerCase());
  } else {
    // full text search
    const fullStr =
      `${c.id}|${c.userName}|${c.userStatus}|${c.gender}|${c.age}|${c.phoneNumber}|${c.createDate}`
        .toLowerCase();
    return fullStr.includes(v.toLowerCase());
  }
}

function mapKey(key: string): string | undefined {
  switch (key.toLowerCase()) {
    case 'id':
      return 'id';
    case 'name':
    case 'username':
    case 'customername':
      return 'userName';
    case 'status':
    case 'userstatus':
      return 'userStatus';
    case 'gender':
      return 'gender';
    case 'age':
      return 'age';
    case 'phone':
    case 'phonenumber':
    case 'contact':
      return 'phoneNumber';
    case 'created':
    case 'create':
    case 'createddate':
    case 'createdate':
    case 'date':
      return 'createDate';
    default:
      return undefined;
  }
}

export const selectCustomers = createSelector(
  filterCustomers,
  (s: AppState) => s.sorting,
  (
    customers: Customer[],
    sorting: Sorting,
  ): Customer[] => {
    const { key, ascending } = sorting;
    return customers.sort((a: any, b: any) => {
      const r = a[key] < b[key] ? -1 : 1;
      return ascending ? r : r * -1;
    });
  }
);

export const selectNotes = createSelector(
  (s: AppState) => s.notes,
  (_: AppState, customerId: CustomerId) => customerId,
  (
    notes: ReduxIndex<ReduxIndex<Note>>,
    customerId: CustomerId
  ): Note[] => {
    const cnotes = notes[customerId];
    if (cnotes != null) {
      return Object.values(cnotes).filter(isNotNull);
    }

    return [];
  }
);
