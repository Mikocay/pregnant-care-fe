'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface MetricData {
  subject: string;
  value: number;
  normalRange: number;
}

interface RadarMetricChartProps {
  data: MetricData[];
}

export default function RadarMetricChart({ data }: RadarMetricChartProps) {
  // Normalize data for better visualization
  const normalizedData = data.map((item) => {
    // Calculate percentage of value relative to normalRange
    const percentage = (item.value / item.normalRange) * 100;
    return {
      ...item,
      normalizedValue: Math.min(100, percentage), // Cap at 100%
      normalRange: 100, // Set all normal ranges to 100%
    };
  });

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={normalizedData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Giá trị đo được"
            dataKey="normalizedValue"
            stroke="#ff4d6d"
            fill="#ff4d6d"
            fillOpacity={0.5}
          />
          <Radar
            name="Phạm vi bình thường"
            dataKey="normalRange"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.1}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
