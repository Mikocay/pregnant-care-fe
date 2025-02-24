import config from '@/config';
import { axiosPrivate } from '@/config/axios';
import { Plan } from '@/types';
import { API_ENDPOINTS } from '@/utils/api';
import { useNavigate } from 'react-router-dom';

export const useFormPlan = () => {
  const navigate = useNavigate();
  const onSubmit = async (formValues: Plan) => {
    if (formValues.id) {
      try {
        await axiosPrivate.patch(
          `${API_ENDPOINTS.admin.managePlans}/${formValues.id}`,
          formValues,
        );

        navigate(config.routes.admin.managePlans);
      } catch (error) {
        console.log(error);
      }
    } else {
      await axiosPrivate.post(API_ENDPOINTS.admin.managePlans, formValues);
      navigate(config.routes.admin.managePlans);
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
