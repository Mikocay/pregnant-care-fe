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
} from './slice';
import { AxiosError } from 'axios';
import { RegisterFormData } from '../types/authType';

function* loginSaga(
  action: PayloadAction<{ email: string; password: string }>,
): Generator {
  try {
    const response = yield call(userService.postLogin, action.payload);
    const tokenData = response.data.data; // Gồm accessToken và userId

    //* Lưu accessToken vào localStorage (hoặc sessionStorage)
    yield call([localStorage, 'setItem'], 'accessToken', tokenData.accessToken);
    yield call([localStorage, 'setItem'], 'userId', tokenData.userId);

    //* Gọi API lấy thông tin user (nếu bắt buộc)
    const getUser = yield call(userService.getUserInfoById, tokenData.userId);
    const userRole = getUser.data.data.role;

    //* Lưu userRole vào localStorage (hoặc sessionStorage)
    yield call([localStorage, 'setItem'], 'userRole', userRole);

    //* Dispatch action lưu thông tin user vào Redux
    yield put(loginSuccess({ tokenData, user: getUser.data.data }));
  } catch (error: unknown) {
    let errorMessage = 'Login failed';

    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || error.message;
    }

    yield put(loginFailure(errorMessage));

    // Xóa token nếu login thất bại
    yield call([localStorage, 'removeItem'], 'accessToken');
    yield call([localStorage, 'removeItem'], 'userId');
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

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
  yield takeLatest(confirmEmailRequest.type, confirmEmailSaga);
}
