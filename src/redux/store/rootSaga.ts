import { all, fork } from 'redux-saga/effects';

// Import sagas
import counterSaga from '@/redux/features/counter/saga';
import { watchAuth } from '@/redux/features/auth/saga';

// Combine sagas
export function* rootSaga() {
  yield all([fork(counterSaga), fork(watchAuth)]);
}
