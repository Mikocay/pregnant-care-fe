import {
  Fetus,
  FetusStandard,
  FetusStandardSummary,
  GrowthMetric,
  GrowthMetricByWeek,
  RadarChartGrowthMetricByWeek,
} from '@/types';

interface FetusState {
  fetusStandardsNameAndUnit: FetusStandard[];
  fetusStandardsByWeek: FetusStandardSummary[];
  growthMetrics: GrowthMetric[];
  growthMetricsByWeek: GrowthMetricByWeek[];
  fetuses: Fetus[];
  radarChartGrowthMetricsByWeek: RadarChartGrowthMetricByWeek;
  selectedFetus: Fetus | null;
  loading: boolean;
  error: any;
}

export const initialState: FetusState = {
  fetusStandardsNameAndUnit: [],
  fetusStandardsByWeek: [],
  growthMetrics: [],
  growthMetricsByWeek: [],
  fetuses: [],
  radarChartGrowthMetricsByWeek: {
    data: [],
  },
  selectedFetus: null,
  loading: false,
  error: null,
};
