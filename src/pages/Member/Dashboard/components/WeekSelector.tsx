'use client';

import type React from 'react';
import { Slider, Typography, Space } from 'antd';
import styles from './styles.module.css';

const { Title, Text } = Typography;

interface WeekSelectorProps {
  weeklyData: {
    week: number;
    data: {
      name: string;
      unit: string;
      value: number;
      min: number;
      max: number;
    }[];
  }[];
  selectedWeek: number | null;
  onSelectWeek: (week: number) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  weeklyData,
  selectedWeek,
  onSelectWeek,
}) => {
  const weeks = weeklyData
    .map((item) => item.week)
    .filter((week) => week >= 5 && week <= 40);
  const minWeek = Math.min(...weeks);
  const maxWeek = Math.max(...weeks);

  const handleChange = (value: number) => {
    onSelectWeek(value);
  };

  const marks: Record<number, React.ReactNode> = {};

  // Add marks for every 4 weeks
  for (let i = minWeek; i <= maxWeek; i += 4) {
    marks[i] = i;
  }

  // Always add the last week
  marks[maxWeek] = maxWeek;

  return (
    <div className={styles.weekSelectorContainer}>
      <Space direction="vertical" className={styles.weekSelectorHeader}>
        <Title level={4}>Select Pregnancy Week</Title>
        {selectedWeek && (
          <Text className={styles.selectedWeek}>
            Week {selectedWeek} / {maxWeek}
          </Text>
        )}
      </Space>
      <Slider
        min={minWeek}
        max={maxWeek}
        value={selectedWeek || minWeek}
        onChange={handleChange}
        marks={marks}
        className={styles.weekSlider}
      />
      <div className={styles.trimesterMarkers}>
        <div className={styles.trimester}>
          <div
            className={styles.trimesterIndicator}
            style={{ backgroundColor: '#95de64' }}
          ></div>
          <Text>First Trimester (1-12 weeks)</Text>
        </div>
        <div className={styles.trimester}>
          <div
            className={styles.trimesterIndicator}
            style={{ backgroundColor: '#69c0ff' }}
          ></div>
          <Text>Second Trimester (13-27 weeks)</Text>
        </div>
        <div className={styles.trimester}>
          <div
            className={styles.trimesterIndicator}
            style={{ backgroundColor: '#ff85c0' }}
          ></div>
          <Text>Third Trimester (28-40 weeks)</Text>
        </div>
      </div>
    </div>
  );
};
