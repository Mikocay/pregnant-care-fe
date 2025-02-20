import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { setFetusStandards } from './slice';
import { fetusStandard } from '@/services/fetus.service';

export function* findAll(): SagaIterator {
  try {
    const response = yield call(fetusStandard.findAll);
    yield put(setFetusStandards(response.data));
    console.log('response', response);

  } catch (error) {
    console.log('error', error);
  }
}

export default function* fetusSaga() {
  yield takeLatest(setFetusStandards.type, findAll);
}
