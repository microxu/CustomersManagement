import { Customer, CustomerId, Note, NoteId } from '../api/model';
import { createAction } from './action';

export const updateCustomers = createAction<'store/customer/updateCustomers', Customer[]>(
  'store/customer/updateCustomers'
);

export const updateCustomer = createAction<'store/customer/updateCustomer', Customer>(
  'store/customer/updateCustomer'
);

export const updateNotes = createAction<'store/customer/updateNotes', { customerId: CustomerId; notes: Note[] }>(
  'store/customer/updateNotes'
);

export const updateNote = createAction<'store/customer/updateNote', Note>(
  'store/customer/updateNote'
);

export const removeNote = createAction<'store/customer/removeNote', { customerId: CustomerId; noteId: NoteId }>(
  'store/customer/removeNote'
);
