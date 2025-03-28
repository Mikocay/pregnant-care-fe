'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  week: number;
  value: number;
  lowerLimit?: number;
  upperLimit?: number;
}

interface PregnancyLineChartProps {
  data: DataPoint[];
  color: string;
  yAxisLabel: string;
}

export default function PregnancyLineChart({
  data,
  color,
  yAxisLabel,
}: PregnancyLineChartProps) {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="week"
            label={{ value: 'Tuần thai', position: 'bottom', offset: 0 }}
          />
          <YAxis
            label={{
              value: yAxisLabel,
              angle: -90,
              position: 'insideLeft',
              offset: -5,
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          {data[0]?.lowerLimit !== undefined && (
            <Line
              type="monotone"
              dataKey="lowerLimit"
              stroke="#ddd"
              strokeDasharray="5 5"
              dot={false}
            />
          )}
          {data[0]?.upperLimit !== undefined && (
            <Line
              type="monotone"
              dataKey="upperLimit"
              stroke="#ddd"
              strokeDasharray="5 5"
              dot={false}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
