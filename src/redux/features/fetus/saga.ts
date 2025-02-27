import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { fetchFetus, fetchFetusStandards, fetchFetusStandardsByWeek, fetchGrowthMetric, setFetus, setFetusStandards, setFetusStandardsByWeek, setGrowthMetric } from './slice';
import { fetusStandard } from '@/services/fetus.service';

export function* findAll(): SagaIterator {
  try {
    const response = yield call(fetusStandard.findAll);
    yield put(setFetusStandards(response.data.data));
  } catch (error) {
    console.log('error', error);
  }
}

// Lấy Fetus Standards theo tuần
export function* findByWeek(action: ReturnType<typeof fetchFetusStandardsByWeek>): SagaIterator {
  try {
    const response = yield call(fetusStandard.findFetusStandardByWeek, action.payload);
    yield put(setFetusStandardsByWeek(response.data.data));
  } catch (error) {
    console.log('error', error);
  }
}

// Nhập Metric theo tuần
export function* addMetric(action: ReturnType<typeof fetchGrowthMetric>): SagaIterator {
  try {
    const { fetusId, metrics } = action.payload;
    const response = yield call(fetusStandard.createGrowthMetrics, fetusId, metrics);
    yield put(setGrowthMetric(response.data.data));
  } catch (error) {
    console.log('error', error);
  }
}

//Lấy Fetus của user
export function* findFetusByUser(action: ReturnType<typeof fetchFetus>): SagaIterator {
  try {
    const response = yield call(fetusStandard.getFetusesByUser, action.payload);
    yield put(setFetus(response.data.data));
  } catch (error) {
    console.log('error', error);
  }
}
export default function* fetusSaga() {
  yield takeLatest(fetchFetusStandards.type, findAll);
  yield takeLatest(fetchFetusStandardsByWeek.type, findByWeek);
  yield takeLatest(fetchGrowthMetric.type, addMetric);
  yield takeLatest(fetchFetus.type, findFetusByUser);
}
