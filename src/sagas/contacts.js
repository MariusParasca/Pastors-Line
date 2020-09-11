import { all, fork, takeEvery } from 'redux-saga/effects';
import { FETCH_CONTACTS, FETCH_CONTACTS_SEND } from 'store/actionTypes/contacts';

import { sagaGetHelper } from 'utils/sagaHelpers';

function* fetchContactsSaga(action) {
  yield sagaGetHelper(FETCH_CONTACTS, '/contacts.json', action.queryParams);
}

function* watchFetchContacts() {
  yield takeEvery(FETCH_CONTACTS_SEND, fetchContactsSaga);
}

function* watchAll() {
  yield all([fork(watchFetchContacts)]);
}

export default watchAll;
