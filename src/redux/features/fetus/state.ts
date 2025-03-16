import { FetusState } from '../types/fetus';

export const initialState: FetusState = {
  fetusStandardsNameAndUnit: [],
  fetusStandardsByWeek: [],
  growthMetrics: [],
  fetuses: [],
  growthMetricsByWeek: [],
  radarChartGrowthMetricsByWeek: [],
  loading: false,
  error: null,
};
