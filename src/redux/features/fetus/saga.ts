import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { fetchFetus, fetchFetusStandards, fetchFetusStandardsByWeek, fetchGrowthMetric, fetchGrowthMetricByWeek, setFetus, setFetusStandards, setFetusStandardsByWeek, setGrowthMetric, setGrowthMetricByWeek } from './slice';
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
    yield put(setFetusStandardsByWeek([]));
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

//Lấy Metric theo tuần
export function* findGrowthMetricByWeek(action: ReturnType<typeof fetchGrowthMetricByWeek>): SagaIterator {
  try {
    const response = yield call(fetusStandard.findAllGrowthMetricByMember, action.payload);

    yield put(setGrowthMetricByWeek(response.data.data.data));
  } catch (error) {
    console.log('error', error);

    yield put(setGrowthMetricByWeek([]));
  }
}
export default function* fetusSaga() {
  yield takeLatest(fetchFetusStandards.type, findAll);
  yield takeLatest(fetchFetusStandardsByWeek.type, findByWeek);
  yield takeLatest(fetchGrowthMetric.type, addMetric);
  yield takeLatest(fetchFetus.type, findFetusByUser);
  yield takeLatest(fetchGrowthMetricByWeek.type, findGrowthMetricByWeek);
}
