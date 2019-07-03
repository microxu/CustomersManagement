import * as actions from '../actions/customer';
import { Note } from '../api/model';
import { ReduxIndex } from '../store';
import { INITIAL_STATE } from './initial-state';

export function notesReducer(
  state: ReduxIndex<ReduxIndex<Note>> = INITIAL_STATE.notes,
  action:
    typeof actions.updateNotes.shape |
    typeof actions.updateNote.shape |
    typeof actions.removeNote.shape
): ReduxIndex<ReduxIndex<Note>> {
  switch (action.type) {
    case actions.updateNotes.type: {
      const { customerId, notes } = action.payload;
      return {
        ...state,
        [customerId]: notes.reduce((p, v) => {
          p[v.id] = v;
          return p;
        }, {} as ReduxIndex<Note>)
      };
    }
    case actions.updateNote.type: {
      const { userId: customerId, id: noteId } = action.payload;
      const existingNotes = state[customerId];
      return {
        ...state,
        [customerId]: {
          ...existingNotes,
          [noteId]: action.payload
        }
      };
    }
    case actions.removeNote.type: {
      const { customerId, noteId } = action.payload;
      const existingNotes = state[customerId];
      return {
        ...state,
        [customerId]: {
          ...existingNotes,
          [noteId]: undefined
        }
      };
    }
    default:
      return state;
  }
}
