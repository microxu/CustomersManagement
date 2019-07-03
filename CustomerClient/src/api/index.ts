import { Customer, CustomerId, Note, NoteId } from './model';
import { stubClient } from './stub-api';
import { webApiClient } from './web-api';

export interface ApiClient {
  getCustomersAsync: () => Promise<Customer[]>;
  updateCustomerAsync: (customer: Customer) => Promise<Customer>;
  getNotesAsync: (customerId: CustomerId) => Promise<Note[]>;
  createNoteAsync: (customerId: CustomerId, note: string) => Promise<Note>;
  updateNoteAsync: (note: Note) => Promise<Note>;
  deleteNoteAsync: (noteId: NoteId) => Promise<void>;
}

// The flag to switch beteen stub api and real api
export const useStubApi: boolean = true;
// The baseUrl of api endpoint (for webAPI only)
export const baseUrl: string = 'http://localhost:8080';
//for test
//export const apiClient = useStubApi ? stubClient : webApiClient;
export const apiClient = stubClient;
//export const apiClient = webApiClient;
