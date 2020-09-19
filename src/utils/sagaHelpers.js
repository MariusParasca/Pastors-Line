/* eslint-disable import/prefer-default-export */
import { call, put } from 'redux-saga/effects';
import { fetchFromAPI } from './helpers';

export function* sagaGetHelper(prefix, fetchPath, queryParams) {
  const { data, error } = yield call(fetchFromAPI, fetchPath, { queryParams });
  if (data) {
    yield put({ type: `${prefix}_DONE`, data });
  } else {
    yield put({ type: `${prefix}_FAILED`, error });
  }
}
