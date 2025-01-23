import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';

export function* log(action: PayloadAction) {
  console.log('Action:', action);
  yield;
}

export default function* counterSaga() {
  console.log('Hello, World! Saga Time.');
  // Add your logic here
  yield takeEvery('*', log);
}
