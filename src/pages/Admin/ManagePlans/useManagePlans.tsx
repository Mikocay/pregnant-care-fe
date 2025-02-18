import showNotification from '@/components/Notification/Notification';
import config from '@/config';
import { axiosPrivate } from '@/config/axios';
import { Plan } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useManagePlans = () => {
  const [datas, setDatas] = useState<Plan[]>();
  const navigate = useNavigate();

  //! Get all data
  const getAllData = async () => {
    const response = await axiosPrivate.get(API_ENDPOINTS.admin.managePlans);
    setDatas(response.data.data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const editButton = async (id: string) => {
    const response = await axiosPrivate.get(
      `${API_ENDPOINTS.admin.managePlans}/${id}`,
    );
    const data = response.data.data;
    navigate(config.routes.admin.formPlan, {
      state: { initialPlan: data },
    });
  };

  const deleteButton = useCallback(async (id: string) => {
    try {
      await axiosPrivate.delete(`${API_ENDPOINTS.admin.managePlans}/${id}`);
      showNotification({
        type: 'success',
        message: 'Delete successfully',
      });
      getAllData(); // Refresh the plans list
    } catch {
      showNotification({
        type: 'error',
        message: 'Delete failed',
      });
    }
  }, []);

  return {
    datas,
    editButton,
    deleteButton,
  };
};
