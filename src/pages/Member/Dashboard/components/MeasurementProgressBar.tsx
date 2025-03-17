import type React from 'react';
import { Progress, Typography } from 'antd';
import styles from './styles.module.css';

const { Title, Text } = Typography;

interface MeasurementProgressBarProps {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
}

const getColorByMeasurement = (name: string) => {
  const colors: Record<string, string> = {
    BPD: '#7367f0',
    CRL: '#28c76f',
    AC: '#ff9f43',
    FL: '#ea5455',
    Weight: '#00cfe8',
    'Fetal Heart Rate': '#ff6b6b',
  };

  for (const key in colors) {
    if (name.includes(key)) {
      return colors[key];
    }
  }

  return '#1890ff'; // Default color
};

export const MeasurementProgressBar: React.FC<MeasurementProgressBarProps> = ({
  name,
  value,
  unit,
  min,
  max,
}) => {
  const percent = ((value - min) / (max - min)) * 100;
  const color = getColorByMeasurement(name);

  const displayName =
    {
      BPD: 'Biparietal Diameter (BPD)',
      CRL: 'Crown-Rump Length (CRL)',
      AC: 'Abdominal Circumference (AC)',
      FL: 'Femur Length (FL)',
      Weight: 'Fetal Weight',
      'Fetal Heart Rate': 'Fetal Heart Rate (FHR)',
    }[name] || name;

  const status =
    value < min
      ? 'Below normal range'
      : value > max
      ? 'Above normal range'
      : 'Within normal range';

  const statusColor = value < min || value > max ? '#ff4d4f' : '#52c41a';

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressHeader}>
        <Title level={5}>{displayName}</Title>
        <Text className={styles.progressValue} strong>
          {value} {unit}
        </Text>
      </div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressMinMax}>
          <Text className={styles.progressMin}>{Math.round(min)}</Text>
          <Text className={styles.progressMax}>{Math.round(max)}</Text>
        </div>
        <Progress
          percent={percent > 100 ? 100 : percent < 0 ? 0 : percent}
          showInfo={false}
          strokeColor={color}
          trailColor="#f0f0f0"
          className={styles.progressBar}
        />
      </div>
      <Text className={styles.progressStatus} style={{ color: statusColor }}>
        {status}
      </Text>
    </div>
  );
};
