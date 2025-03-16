import type React from 'react';
import { Card, Statistic, Tag } from 'antd';
import {
  ColumnHeightOutlined,
  HeartOutlined,
  DashboardOutlined,
  AreaChartOutlined,
  ColumnWidthOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import styles from './styles.module.css';

interface MeasurementCardProps {
  name: string;
  value: number;
  unit: string;
  week: number;
  min?: number;
  max?: number;
}

export const MeasurementCard: React.FC<MeasurementCardProps> = ({
  name,
  value,
  unit,
  week,
  min,
  max,
}) => {
  const getIcon = () => {
    if (name.includes('BPD')) return <DashboardOutlined />;
    if (name.includes('CRL')) return <ColumnHeightOutlined />;
    if (name.includes('AC')) return <AreaChartOutlined />;
    if (name.includes('FL')) return <ColumnWidthOutlined />;
    if (name.includes('Weight')) return <LineChartOutlined />;
    if (name.includes('Heart')) return <HeartOutlined />;
    return <DashboardOutlined />;
  };

  const getColor = () => {
    if (name.includes('BPD')) return '#7367f0';
    if (name.includes('CRL')) return '#28c76f';
    if (name.includes('AC')) return '#ff9f43';
    if (name.includes('FL')) return '#ea5455';
    if (name.includes('Weight')) return '#00cfe8';
    if (name.includes('Heart')) return '#ff6b6b';
    return '#1890ff';
  };

  const getTitle = () => {
    if (name.includes('BPD')) return 'Biparietal Diameter';
    if (name.includes('CRL')) return 'Crown-Rump Length';
    if (name.includes('AC')) return 'Abdominal Circumference';
    if (name.includes('FL')) return 'Femur Length';
    if (name.includes('Weight')) return 'Fetal Weight';
    if (name.includes('Heart')) return 'Fetal Heart Rate';
    return name;
  };

  const getStatus = () => {
    if (!min || !max) return null;

    if (value < min) {
      return <Tag color="error">Below normal</Tag>;
    } else if (value > max) {
      return <Tag color="error">Above normal</Tag>;
    } else {
      return <Tag color="success">Normal</Tag>;
    }
  };

  return (
    <Card
      className={styles.measurementCard}
      style={{ borderTop: `2px solid ${getColor()}` }}
    >
      <Statistic
        title={getTitle()}
        value={value}
        precision={0}
        valueStyle={{ color: getColor() }}
        prefix={getIcon()}
        suffix={unit}
      />
      <div className={styles.cardFooter}>
        <div className={styles.weekIndicator}>Week {week}</div>
        {min && max && (
          <div className={styles.rangeIndicator}>
            Range: {min}-{max} {unit}
          </div>
        )}
        {getStatus()}
      </div>
    </Card>
  );
};
