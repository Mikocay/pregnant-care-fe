import config from '@/config';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAdmin = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = useState(false);

  const createButton = () => {
    if (path.includes(config.routes.admin.managePlans)) {
      navigate(config.routes.admin.formPlan);
    }
    //! Add more conditions here
  };

  useEffect(() => {
    if (path.includes(config.routes.admin.formPlan)) {
      setIsCreate(true);
    }
    //! Add more conditions here
    else {
      setIsCreate(false);
    }
  }, [path]);

  return {
    createButton,
    isCreate,
  };
};
