import { Customer, CustomerId, Note } from '../api/model';
import { createAction } from './action';

export const fetchCustomers = createAction<'commands/customer/fetchCustomers', undefined>(
  'commands/customer/fetchCustomers'
);

export const fetchNotes = createAction<'commands/customer/fetchNotes', CustomerId>(
  'commands/customer/fetchNotes'
);

export const updateCustomer = createAction<'commands/customer/updateCustomer', Customer>(
  'commands/customer/updateCustomer'
);

export const addNote = createAction<'commands/customer/addNote', { customerId: CustomerId, note: string }>(
  'commands/customer/addNote'
);

export const updateNote = createAction<'commands/customer/updateNote', Note>(
  'commands/customer/updateNote'
);

export const deleteNote = createAction<'commands/customer/deleteNote', Note>(
  'commands/customer/deleteNote'
);
