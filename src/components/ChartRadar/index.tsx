import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { Radar } from '@ant-design/plots';
import { RootState } from '@/redux/store/store';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRadarChartGrowthMetricByWeek } from '@/redux/features/fetus/slice';

function ChartRadar({week}: {week: number}) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  const radarChartGrowthMetricsByWeek =useAppSelector((state: RootState) => state.fetus.radarChartGrowthMetricsByWeek);
  
  useEffect(() => {
      if (id && week) {
        dispatch(fetchRadarChartGrowthMetricByWeek({ fetusId: id, week }));
      }
    }, [dispatch, id, week]);

  const config = {
    data: radarChartGrowthMetricsByWeek,
    xField: 'item',
    yField: 'score',
    seriesField: 'value',
    colorField: 'value',

    area: {
      style: {
        fillOpacity: 0.2,
      },
    },
    scale: {
      x: {
        padding: 0.3,
        align: 0,
      },
      y: {
        nice: true,
      },
    },
    axis: {
      x: {
        title: false,
        grid: true,
      },
      y: {
        gridAreaFill: 'rgba(0, 0, 0, 0.04)',
        label: false,
        title: false,
      },
    },
    height: 500, 
    autoFit: false, 
  };
  return (
    <div >
      <Radar {...config} />
    </div>
  )
}

export default ChartRadar