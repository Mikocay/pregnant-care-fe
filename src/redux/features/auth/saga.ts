import { call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './slice';
import { userService } from '@/services/user.service';

function* loginSaga(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const response = yield call(userService.postLogin, action.payload);

    const { accessToken, user } = response.data;

    yield put(loginSuccess({ accessToken, userRole: user }));
  } catch (error: ) {
    yield put(loginFailure(error.response?.data?.message || 'Login failed'));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
