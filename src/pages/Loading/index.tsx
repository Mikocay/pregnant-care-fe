import type React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loading.module.css';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
  message = 'Loading...',
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spin indicator={antIcon} />
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
