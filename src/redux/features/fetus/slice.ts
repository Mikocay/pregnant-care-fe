import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { Fetus, FetusStandard, FetusStandardSummary, GrowthMetric } from '@/types';

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
    fetchGrowthMetric: (state, action: PayloadAction<{ fetusId: string, metrics: GrowthMetric[] }>) => { },

    // Set Metric theo tuần
    setGrowthMetric: (state, action: PayloadAction<GrowthMetric[]>) => {
      state.growthMetrics = action.payload;
    },

    // Fetch Fetus của user
    fetchFetus: (state, action: PayloadAction<string>) => { },
    // Set Fetus của user
    setFetus: (state, action: PayloadAction<Fetus[]>) => {
      state.fetuses = action.payload
    }

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
  setFetus
} = fetusSlice.actions;
export default fetusSlice.reducer;
