import { Fetus, FetusStandard, FetusStandardSummary, GrowthMetric, GrowthMetricByWeek, RadarChartGrowthMetricByWeek } from "@/types";

export interface FetusState {
    fetusStandardsNameAndUnit: {
        data: FetusStandard[];
    }
    fetusStandardsByWeek: {
        // map(arg0: (field: any) => { name: any; unit: any; value: number; }): unknown;
        reduce(arg0: (acc: { [key: string]: string; }, field: any) => { [key: string]: string; }, arg1: {}): any;
        length: number;
        data: FetusStandardSummary[];
    }
    growthMetrics: {
        data: GrowthMetric[];
    }
    fetuses: Fetus[]


    growthMetricsByWeek: GrowthMetricByWeek[];
    radarChartGrowthMetricsByWeek: RadarChartGrowthMetricByWeek;
    loading: boolean;
    error: any;

}