import { all, fork } from 'redux-saga/effects';

import contacts from 'sagas/contacts';

function* rootSaga() {
  yield all([fork(contacts)]);
}

export default rootSaga;
