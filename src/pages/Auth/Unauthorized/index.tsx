import type React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './Unauthorized.module.css';
import config from '@/config';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate(config.routes.public.home);
  };

  return (
    <div className={styles.container}>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={[
          <Button key="goBack" onClick={handleGoBack} className={styles.button}>
            Go Back
          </Button>,
          <Button
            key="home"
            type="primary"
            onClick={handleGoHome}
            className={styles.button}
          >
            Go Home
          </Button>,
        ]}
      />
    </div>
  );
};

export default UnauthorizedPage;
