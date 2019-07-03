import { SagaIterator } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as commandActions from '../actions/commands';
import * as actions from '../actions/customer';
import { apiClient } from '../api';
import { Note } from '../api/model';

function* fetchNotesSaga(action: typeof commandActions.fetchNotes.shape): SagaIterator {
  const customerId = action.payload;
  // TODO: Error Handling
  const notes: Note[] = yield call(apiClient.getNotesAsync, customerId);
  yield put(actions.updateNotes({ customerId, notes }));
}

function* addNoteSaga(action: typeof commandActions.addNote.shape): SagaIterator {
  // TODO: Error Handling
  const { customerId, note } = action.payload;
  const n: Note = yield call(apiClient.createNoteAsync, customerId, note);
  yield put(actions.updateNote(n));
}

function* updateNoteSaga(action: typeof commandActions.updateNote.shape): SagaIterator {
  // TODO: Error Handling
  const note = action.payload;
  const n: Note = yield call(apiClient.updateNoteAsync, note);
  yield put(actions.updateNote(n));
}

function* deleteNoteSaga(action: typeof commandActions.deleteNote.shape): SagaIterator {
  const { userId: customerId, id: noteId } = action.payload;
  // TODO: Error Handling
  yield call(apiClient.deleteNoteAsync, noteId);
  yield put(actions.removeNote({ customerId, noteId }));
}

export function* notesSaga(): SagaIterator {
  yield takeEvery(commandActions.fetchNotes.type, fetchNotesSaga);
  yield takeEvery(commandActions.addNote.type, addNoteSaga);
  yield takeEvery(commandActions.updateNote.type, updateNoteSaga);
  yield takeEvery(commandActions.deleteNote.type, deleteNoteSaga);
}
