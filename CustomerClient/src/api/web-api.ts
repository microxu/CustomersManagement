import { ApiClient, baseUrl } from '.';
import { requestAsync, requestJsonAsync } from './http';
import { Customer, CustomerId, Note, NoteId } from './model';

async function getCustomersAsync(): Promise<Customer[]> {
  return await requestJsonAsync<Customer[]>('GET', `${baseUrl}/customer`);
}

async function updateCustomerAsync(customer: Customer): Promise<Customer> {
  await requestAsync('PUT', `${baseUrl}/customer`, customer);
  return customer;
}

async function getNotesAsync(customerId: CustomerId): Promise<Note[]> {
  return await requestJsonAsync<Note[]>('GET', `${baseUrl}/customer/${customerId}/note`);
}

async function createNoteAsync(customerId: CustomerId, note: string): Promise<Note> {
  const created: Note = await requestJsonAsync<Note>('POST', `${baseUrl}/customer/note`, { userId: customerId, note });
  return created;
}

async function updateNoteAsync(note: Note): Promise<Note> {
  await requestAsync('PUT', `${baseUrl}/customer/note`, note);
  return note;
}

async function deleteNoteAsync(noteId: NoteId): Promise<void> {
  throw new Error('Not implemented.');
}

export const webApiClient: ApiClient = {
  getCustomersAsync,
  updateCustomerAsync,
  getNotesAsync,
  createNoteAsync,
  updateNoteAsync,
  deleteNoteAsync,
};
