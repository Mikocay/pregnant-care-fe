import { FetusState } from '../types/fetus';

export const initialState: FetusState = {
  fetusStandardsNameAndUnit: [],
  fetusStandardsByWeek: [],
  growthMetrics: [],
  fetuses: [],
  growthMetricsByWeek: [],
  loading: false,
  error: null,
};
