import { all, fork } from 'redux-saga/effects';

// Import sagas
import counterSaga from '@/features/counter/saga';

// Combine sagas
export function* rootSaga() {
  yield all([fork(counterSaga)]);
}
