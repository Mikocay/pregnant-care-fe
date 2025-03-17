import { all, fork } from 'redux-saga/effects';

// Import sagas
import { authSaga } from '@/redux/features/auth/saga';
import fetusSaga from '../features/fetus/saga';
import { globalSaga } from '../features/global/saga';

// Combine sagas
export function* rootSaga() {
  yield all([fork(authSaga), fork(fetusSaga), fork(globalSaga)]);
}
