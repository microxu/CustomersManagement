import { ApiClient } from '.';
import { Customer, CustomerId, Note, NoteId } from './model';

const customers: Customer[] = [
  {
    id: '962c067f-8bd7-4945-883d-42ef9fcd1534',
    userStatus: 'current',
    userName: 'Customer A',
    gender: 'M',
    age: 60,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  },
  {
    id: '875561cc-36c6-4307-a036-84d992450ae6',
    userStatus: 'current',
    userName: 'Customer B',
    gender: 'F',
    age: 34,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  },
  {
    id: '1ed5256e-a35a-4b27-b6cb-a60c57655f2e',
    userStatus: 'current',
    userName: 'Customer C',
    gender: 'M',
    age: 27,
    phoneNumber: '0812345678',
    createDate: new Date().toISOString()
  }
];

const notes: Note[] = [
  {
    id: 1,
    userId: '875561cc-36c6-4307-a036-84d992450ae6',
    note: 'note 1'
  },
  {
    id: 2,
    userId: '875561cc-36c6-4307-a036-84d992450ae6',
    note: 'note 2'
  }
];

async function getCustomersAsync(): Promise<Customer[]> {
  return customers;
}

async function updateCustomerAsync(customer: Customer): Promise<Customer> {
  const c = customers.find(c => c.id === customer.id);
  if (c == null) {
    throw new Error(`Customer ${customer.id} not found.`);
  }
  c.userName = customer.userName;
  c.userStatus = customer.userStatus;
  c.age = customer.age;
  c.gender = customer.gender;
  c.phoneNumber = customer.phoneNumber;
  return c;
}

async function getNotesAsync(customerId: CustomerId): Promise<Note[]> {
  return notes.filter(n => n.userId === customerId);
}

async function createNoteAsync(customerId: CustomerId, note: string): Promise<Note> {
  const nextId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  const n = { id: nextId, userId: customerId, note };
  notes.push(n);
  return n;
}

async function updateNoteAsync(note: Note): Promise<Note> {
  const n = notes.find(i => i.id === note.id);
  if (n == null) {
    throw new Error(`Note ${note.id} not found.`);
  }
  n.note = note.note;
  return n;
}

async function deleteNoteAsync(noteId: NoteId): Promise<void> {
  const idx = notes.findIndex(i => i.id === noteId);
  if (idx === -1) {
    throw new Error(`Note ${noteId} not found.`);
  }
  notes.splice(idx, 1);
}

export const stubClient: ApiClient = {
  getCustomersAsync,
  updateCustomerAsync,
  getNotesAsync,
  createNoteAsync,
  updateNoteAsync,
  deleteNoteAsync,
};
