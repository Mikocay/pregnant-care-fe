import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import {
  Fetus,
  FetusStandard,
  FetusStandardSummary,
  GrowthMetric,
  GrowthMetricByWeek,
  RadarChartGrowthMetricByWeek,
} from '@/types';

const fetusSlice = createSlice({
  name: 'fetus',
  initialState,
  reducers: {
    fetchFetusStandards: (state) => {
      state.loading = true;
      state.error = null;
    },
    setFetusStandards: (state, actions: PayloadAction<FetusStandard[]>) => {
      state.fetusStandardsNameAndUnit = actions.payload;
      state.loading = false;
    },

    // Fetch dữ liệu theo tuần
    fetchFetusStandardsByWeek: (state, action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },

    // Set dữ liệu theo tuần
    setFetusStandardsByWeek: (
      state,
      action: PayloadAction<FetusStandardSummary[]>,
    ) => {
      state.fetusStandardsByWeek = action.payload;
      state.loading = false;
    },

    // Fetch Metric theo tuần
    fetchGrowthMetric: (
      state,
      action: PayloadAction<{ fetusId: string; metrics: GrowthMetricByWeek }>,
    ) => {
      state.loading = true;
      state.error = null;
    },

    // Set Metric theo tuần
    setGrowthMetric: (state, action: PayloadAction<GrowthMetric[]>) => {
      state.growthMetrics = action.payload;
      state.loading = false;
    },

    // Fetch Fetus của user
    fetchFetus: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    // Set Fetus của user
    setFetus: (state, action: PayloadAction<Fetus[]>) => {
      state.fetuses = action.payload;
      state.loading = false;

      // If there are fetuses and no selected fetus, select the first one
      if (action.payload.length > 0 && !state.selectedFetus) {
        state.selectedFetus = action.payload[0];
      }
    },

    // Select a specific fetus
    selectFetus: (state, action: PayloadAction<string>) => {
      const selectedFetus = state.fetuses.find(
        (fetus) => fetus.id === action.payload,
      );
      if (selectedFetus) {
        state.selectedFetus = selectedFetus;
      }
    },

    //Fetch Metric theo tuần
    fetchGrowthMetricByWeek: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    //Set Metric theo tuần
    setGrowthMetricByWeek: (
      state,
      action: PayloadAction<GrowthMetricByWeek[]>,
    ) => {
      state.growthMetricsByWeek = action.payload;
      state.loading = false;
    },

    // Add error handling reducer
    fetchGrowthMetricByWeekError: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Fetch Radar Chart theo tuần
    fetchRadarChartGrowthMetricByWeek: (
      state,
      action: PayloadAction<{ fetusId: string; week: number }>,
    ) => {},

    //Set Radar Chart theo tuần
    setRadarChartGrowthMetricByWeek: (
      state,
      action: PayloadAction<RadarChartGrowthMetricByWeek>,
    ) => {
      state.radarChartGrowthMetricsByWeek = action.payload;
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
  fetchRadarChartGrowthMetricByWeek,
  setRadarChartGrowthMetricByWeek,
  selectFetus,
} = fetusSlice.actions;
export default fetusSlice.reducer;
