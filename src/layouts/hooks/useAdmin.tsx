import config from '@/config';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAdmin = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [hideContent, setHideContent] = useState(false);

  const createButton = () => {
    if (path.includes(config.routes.admin.managePlans)) {
      navigate(config.routes.admin.formPlan);
    } else if (path.includes(config.routes.admin.growthMatrics)) {
      navigate(config.routes.admin.formGrwothMatrics);
    }
    //! Add more conditions here
  };

  useEffect(() => {
    if (path.includes(config.routes.admin.formPlan)) {
      setHideContent(true);
    }
    //! Add more conditions here
    else {
      setHideContent(false);
    }
  }, [path]);

  return {
    createButton,
    hideContent,
  };
};
