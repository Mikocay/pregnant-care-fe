import config from '@/config';
import { axiosPrivate } from '@/config/axios';
import { Plan } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { useNavigate } from 'react-router-dom';

export const useFormGrowthMetrics = () => {
  const navigate = useNavigate();
  const onSubmit = async (formValues: Plan) => {
    console.log('formValues', formValues);

    if (formValues.id) {
      try {
        await axiosPrivate.put(
          `${API_ENDPOINTS.admin.createFetusStandard}/id=${formValues.id}`,
          formValues,
        );

        navigate(config.routes.admin.growthMatrics);
      } catch (error) {
        console.log(error);
      }
    } else {
      await axiosPrivate.post(API_ENDPOINTS.admin.createFetusStandard, formValues);
      navigate(config.routes.admin.growthMatrics);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return {
    onSubmit,
    navigateBack,
  };
};
