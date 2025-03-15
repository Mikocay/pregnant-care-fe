import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { Fetus, FetusStandard, FetusStandardSummary, GrowthMetric, GrowthMetricByWeek } from '@/types';

const fetusSlice = createSlice({
  name: 'fetus',
  initialState,
  reducers: {
    fetchFetusStandards: () => {
    },
    setFetusStandards: (state, actions: PayloadAction<FetusStandard[]>) => {
      state.fetusStandardsNameAndUnit = actions.payload;
    },

    // Fetch dữ liệu theo tuần
    fetchFetusStandardsByWeek: (state, action: PayloadAction<number>) => { },

    // Set dữ liệu theo tuần
    setFetusStandardsByWeek: (state, action: PayloadAction<FetusStandardSummary[]>) => {
      state.fetusStandardsByWeek = action.payload;
    },

    // Fetch Metric theo tuần
    fetchGrowthMetric: (state, action: PayloadAction<{ fetusId: string, metrics: GrowthMetricByWeek }>) => { },

    // Set Metric theo tuần
    setGrowthMetric: (state, action: PayloadAction<GrowthMetric[]>) => {
      state.growthMetrics = action.payload;
    },

    // Fetch Fetus của user
    fetchFetus: (state, action: PayloadAction<string>) => { },
    // Set Fetus của user
    setFetus: (state, action: PayloadAction<Fetus[]>) => {
      state.fetuses = action.payload
    },

    //Fetch Metric theo tuần
    fetchGrowthMetricByWeek: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    //Set Metric theo tuần
    setGrowthMetricByWeek: (state, action: PayloadAction<GrowthMetricByWeek[]>) => {
      state.growthMetricsByWeek = action.payload;
      state.loading = false;
    },

    // Add error handling reducer
    fetchGrowthMetricByWeekError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  fetchFetusStandards,
  setFetusStandards,
  fetchFetusStandardsByWeek,
  setFetusStandardsByWeek,
  fetchGrowthMetric,
  setGrowthMetric,
  fetchFetus,
  setFetus,
  fetchGrowthMetricByWeek,
  setGrowthMetricByWeek,
  fetchGrowthMetricByWeekError,
} = fetusSlice.actions;
export default fetusSlice.reducer;
