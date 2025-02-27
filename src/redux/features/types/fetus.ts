import { Fetus, FetusStandard, FetusStandardSummary, GrowthMetric } from "@/types";

export interface FetusState {
    fetusStandardsNameAndUnit: {
        data: FetusStandard[];
    }
    fetusStandardsByWeek: {
        reduce(arg0: (acc: { [key: string]: string; }, field: any) => { [key: string]: string; }, arg1: {}): any;
        length: number;
        data: FetusStandardSummary[];
    }
    growthMetrics: {
        data: GrowthMetric[];
    }
    fetuses: {
        map(arg0: (fetus: Fetus) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
        data: Fetus[];
    }
}
