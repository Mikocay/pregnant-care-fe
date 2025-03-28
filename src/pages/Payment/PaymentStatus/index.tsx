import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './PaymentStatus.module.css';

interface PaymentStatusProps {
  planName: string;
  planPrice: string;
  paymentStatus: 'processing' | 'success' | 'failure';
}

export default function PaymentStatus({
  planName,
  planPrice,
  paymentStatus,
}: PaymentStatusProps) {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/', { state: { status: paymentStatus } });
  };

  if (paymentStatus === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spin size="large" />
        <p className="mt-4 text-lg">Processing your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {paymentStatus === 'success' ? (
        <Result
          status="success"
          icon={<CheckCircleOutlined />}
          title="Payment Successful!"
          subTitle={`You have successfully upgraded to the ${planName} plan for ${planPrice}.`}
          extra={[
            <Button
              type="primary"
              className={styles.button}
              key="console"
              onClick={handleReturn}
            >
              Return to Dashboard
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          icon={<CloseCircleOutlined />}
          title="Payment Failed"
          subTitle="There was an issue processing your payment. Please try again."
          extra={[
            <Button
              type="primary"
              className={styles.button}
              key="console"
              onClick={handleReturn}
            >
              Try Again
            </Button>,
          ]}
        />
      )}
    </div>
  );
}
