import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userService } from '@/services/user.service';
import {
  confirmEmailFailure,
  confirmEmailRequest,
  confirmEmailSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerPendingConfirmation,
  registerRequest,
  resetPasswordRequest,
  resetPasswordFailure,
  resetPasswordSuccess,
} from './slice';
import { AxiosError } from 'axios';
import { RegisterFormData, ResetPasswordForm } from '../types/authType';

function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>,
): Generator {
  try {
    const response = yield call(userService.postLogin, action.payload);
    yield put(loginSuccess(response.data.data));
    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (error: unknown) {
    let errorMessage = 'Login failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message
        ? error.response?.data.message
        : error.message;
    }
    yield put(loginFailure(errorMessage));
  }
}

function* registerSaga(action: PayloadAction<RegisterFormData>): Generator {
  try {
    const response = yield call(userService.postRegister, action.payload);
    console.log('Register success:', response.data.data);
    yield put(registerPendingConfirmation(action.payload.email));
  } catch (error: unknown) {
    let errorMessage = 'Register failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message
        ? error.response?.data.message
        : error.message;
    }
    yield put(registerFailure(errorMessage));
  }
}

function* confirmEmailSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield call(userService.confirmEmail, action.payload);
    console.log('Confirm email success:', response.data);
    yield put(confirmEmailSuccess(response.data.data));
    // localStorage.setItem('accessToken', response.data.data.accessToken);
  } catch (error: unknown) {
    let errorMessage = 'Confirm failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message
        ? error.response?.data.message
        : error.message;
    }
    yield put(confirmEmailFailure(errorMessage));
  }
}

function* requestResetPasswordSaga(action: PayloadAction<string>): Generator {
  try {
    const response = yield call(
      userService.requestResetPassword,
      action.payload,
    );
    console.log('Request reset password success:', response.data);
  } catch (error: unknown) {
    let errorMessage = 'Request reset password failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message
        ? error.response?.data.message
        : error.message;
    }
    console.error(errorMessage);
  }
}

function* resetPasswordSaga(
  action: PayloadAction<ResetPasswordForm>,
): Generator {
  try {
    const response = yield call(userService.resetPassword, action.payload);
    console.log('Reset password success:', response.data);
  } catch (error: unknown) {
    let errorMessage = 'Reset password failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message
        ? error.response?.data.message
        : error.message;
    }
    console.error(errorMessage);
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(confirmEmailRequest.type, confirmEmailSaga);
  yield takeLatest(resetPasswordRequest.type, resetPasswordSaga);
}
