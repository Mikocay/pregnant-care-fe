import { axiosPrivate } from '@/config/axios';
import { Fetus, FetusStandard, FetusStandardSummary, GrowthMetric } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { AxiosResponse } from 'axios';


export const fetusStandard = {
    //#region findAll
    findAll: (page?: number, limit?: number): Promise<AxiosResponse<FetusStandard>> => {
        return axiosPrivate.get(API_ENDPOINTS.admin.findAllFetusStandards, { params: { page, limit } });
    },
    //#endregion

    //#region finFetusStandardByWeek
    findFetusStandardByWeek: (week: number): Promise<AxiosResponse<FetusStandardSummary[]>> => {
        return axiosPrivate.get(API_ENDPOINTS.admin.findFetusStandardByWeek, { params: { week } });
    },
    //#endregion

    //#region createGrowthMetrics
    createGrowthMetrics: (fetusId: string, metrics: GrowthMetric[]): Promise<AxiosResponse<GrowthMetric[]>> => {
        return axiosPrivate.post(`${API_ENDPOINTS.members.createGrowthMetric}/${fetusId}`, metrics);
    },
    //#endregion

    //#region getFetusesByUser
    getFetusesByUser: (userId: string): Promise<AxiosResponse<Fetus[]>> => {
        return axiosPrivate.get(`${API_ENDPOINTS.members.getFetusesByUser}/${userId}`);
    },
    //#endregion
};
