import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { fetchFetusStandards, setFetusStandards } from './slice';
import { fetusStandard } from '@/services/fetus.service';

export function* findAll(): SagaIterator {
  try {
    const response = yield call(fetusStandard.findAll);
    yield put(setFetusStandards(response.data.data));
  } catch (error) {
    console.log('error', error);
  }
}

export default function* fetusSaga() {
  yield takeLatest(fetchFetusStandards.type, findAll);
}
