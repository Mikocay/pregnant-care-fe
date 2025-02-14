import { all, fork } from 'redux-saga/effects';

// Import sagas
import counterSaga from '@/redux/features/counter/saga';
import userSaga from '@/redux/features/user/userSaga';

// Combine sagas
export function* rootSaga() {
  yield all([fork(counterSaga), fork(userSaga)]);
}
