
export type CustomerId = string;
export type NoteId = number;
export type CustomerStatus = 'prospective' | 'current' | 'non-active';

export interface Customer {
  id: CustomerId;
  userName: string;
  userStatus: CustomerStatus;
  createDate: string;
  gender?: 'M' | 'F';
  age?: number;
  phoneNumber?: string;
}

export interface Note {
  id: NoteId;
  userId: CustomerId;
  note: string;
}
