import config from '@/config';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useMember = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [hideContent, setHideContent] = useState(false);

  const createButton = () => {
    console.log('Create button clicked');
    //! Add more conditions here
  };

  useEffect(() => {
    if (path.includes(config.routes.member.calendar)) {
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
