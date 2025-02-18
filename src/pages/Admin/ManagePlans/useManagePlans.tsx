import config from '@/config';
import { axiosPrivate } from '@/config/axios';
import { Plan } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useManagePlans = () => {
  const [datas, setDatas] = useState<Plan[]>();
  const navigate = useNavigate();

  //! Get all data
  useEffect(() => {
    const getAllData = async () => {
      const response = await axiosPrivate.get(API_ENDPOINTS.admin.managePlans);
      setDatas(response.data.data);
    };

    getAllData();
  }, []);

  const editButton = async (id: string) => {
    //! Change the endpoint
    const response = await axiosPrivate.get(
      `${API_ENDPOINTS.admin.managePlans}/${id}`,
    );
    const data = response.data.data;
    navigate(config.routes.admin.formPlan, {
      state: { initialPlan: data },
    });
  };

  return {
    datas,
    editButton,
  };
};
