'use client';

import { useMemo } from 'react';
import { Tabs } from 'antd';
import PregnancyLineChart from './line-chart';
import ProgressBar from './progress-bar';
import RadarMetricChart from './radar-chart';
import type { RootState } from '@/redux/store/store';
import { useAppSelector } from '@/redux/store/hooks';

interface MetricsDashboardProps {
  selectedWeek: number;
}

export default function MetricsDashboard({
  selectedWeek,
}: MetricsDashboardProps) {
  const growthMetricsByWeek = useAppSelector(
    (state: RootState) => state.fetus.growthMetricsByWeek,
  );
  const fetusStandardsByWeek = useAppSelector(
    (state: RootState) => state.fetus.fetusStandardsByWeek,
  );

  // Transform data for line charts
  const lineChartData = useMemo(() => {
    const metrics: Record<string, { week: number; value: number }[]> = {};

    growthMetricsByWeek.forEach((weekData) => {
      weekData.data.forEach((metric) => {
        if (!metrics[metric.name]) {
          metrics[metric.name] = [];
        }
        metrics[metric.name].push({
          week: weekData.week,
          value: metric.value,
        });
      });
    });

    // Sort data by week for each metric
    Object.keys(metrics).forEach((key) => {
      metrics[key].sort((a, b) => a.week - b.week);
    });

    return metrics;
  }, [growthMetricsByWeek]);

  // Get current week's metrics
  const currentWeekData = useMemo(() => {
    const weekData = growthMetricsByWeek.find(
      (data) => data.week === selectedWeek,
    );
    if (!weekData) return null;

    const metricsMap: Record<
      string,
      { value: number; min: number; max: number; unit: string; color: string }
    > = {};

    weekData.data.forEach((metric) => {
      // Find standard range for this metric
      const standard = fetusStandardsByWeek.data.find(
        (std: { name: string }) => std.name === metric.name,
      );

      let min = 0;
      let max = 100;
      if (standard) {
        // Assuming standard has min/max values or we could calculate them
        min = standard.min || 0;
        max = standard.max || 100;
      }

      // Assign colors based on metric name
      let color = '#0088fe';
      if (metric.name.includes('BPD')) color = '#8884d8';
      else if (metric.name.includes('CRL')) color = '#82ca9d';
      else if (metric.name.includes('AC')) color = '#ffc658';
      else if (metric.name.includes('FHR')) color = '#ff8042';
      else if (metric.name.includes('FL')) color = '#ff4d6d';

      metricsMap[metric.name] = {
        value: metric.value,
        min,
        max,
        unit: metric.unit,
        color,
      };
    });

    return metricsMap;
  }, [growthMetricsByWeek, fetusStandardsByWeek, selectedWeek]);

  // Transform data for radar chart
  const radarData = useMemo(() => {
    if (!currentWeekData) return [];

    return Object.entries(currentWeekData).map(([name, data]) => ({
      subject: name,
      value: data.value,
      normalRange: data.max,
    }));
  }, [currentWeekData]);

  // If no data is available for the selected week
  if (!currentWeekData) {
    return (
      <div className="p-6 text-center">
        <p>
          No data available for week {selectedWeek}. Please add pregnancy
          details for this week.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Biểu đồ theo dõi thai nhi - Tuần {selectedWeek}
      </h2>

      <Tabs defaultActiveKey="current" className="w-full">
        <Tabs.TabPane tab="Chỉ số hiện tại" key="current">
          <div className="space-y-4 py-2">
            {Object.entries(currentWeekData).map(([name, data]) => (
              <ProgressBar
                key={name}
                label={`${name} (${data.unit})`}
                value={data.value}
                unit={data.unit}
                min={data.min}
                max={data.max}
                color={data.color}
              />
            ))}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Xu hướng phát triển" key="trends">
          <div className="space-y-6">
            {Object.entries(lineChartData).map(([name, data]) => {
              // Only show charts with enough data points
              if (data.length < 2) return null;

              const color = currentWeekData[name]?.color || '#0088fe';
              const unit = currentWeekData[name]?.unit || '';

              return (
                <div key={name}>
                  <h3 className="text-lg font-semibold mb-2">{name}</h3>
                  <PregnancyLineChart
                    data={data}
                    color={color}
                    yAxisLabel={`${name} (${unit})`}
                  />
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Biểu đồ Radar" key="radar">
          <div className="py-2">
            {radarData.length > 0 ? (
              <RadarMetricChart data={radarData} />
            ) : (
              <p className="text-center">Not enough data for radar chart</p>
            )}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
