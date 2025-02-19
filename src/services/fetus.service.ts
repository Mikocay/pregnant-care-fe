import { axiosClient } from '@/config/axios';
import { FetusStandard } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { AxiosResponse } from 'axios';


export const fetusStandard = {
    //#region findAll
    findAll: (page?: number, limit?: number): Promise<AxiosResponse<FetusStandard>> => {
        return axiosClient.get(API_ENDPOINTS.admin.findAllFetusStandards, { params: { page, limit } });
    }
    //#endregion
};
