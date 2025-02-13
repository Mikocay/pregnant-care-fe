import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userService } from '@/services/user.service';
import { loginFailure, loginRequest, loginSuccess } from './slice';

function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>,
): Generator {
  try {
    const response = yield call(userService.postLogin, action.payload);
    yield put(loginSuccess(response.data));
    localStorage.setItem('accessToken', response.data.accessToken);
    console.log('Login success:', response.data);
  } catch (error: unknown) {
    let errorMessage = 'Login failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(loginFailure(errorMessage));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest.type, loginSaga);
}
