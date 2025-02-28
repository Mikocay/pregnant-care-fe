import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { userService } from '@/services/user.service';

function* getPaymentMethodsSaga(): Generator<any, void, any> {
    try {
        const res = yield call(userService.getPaymentMethods);
        
    }
    catch (error) {
        if (error instanceof AxiosError) {
            // yield put(fetchGlobalDataFailure(error.response?.data));
        }
    }
}

export function* globalSaga() {
}
