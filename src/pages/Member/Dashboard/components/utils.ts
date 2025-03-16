interface MeasurementData {
  name: string;
  unit: string;
  value: number;
  min: number;
  max: number;
}

interface WeekData {
  week: number;
  data: MeasurementData[];
}

export const formatData = (weeklyData: WeekData[]) => {
  return weeklyData.map((weekData) => {
    const formattedWeekData: Record<string, any> = {
      week: weekData.week,
    };

    weekData.data.forEach((measurement) => {
      formattedWeekData[measurement.name] = measurement.value;
      formattedWeekData[`${measurement.name}_min`] = measurement.min;
      formattedWeekData[`${measurement.name}_max`] = measurement.max;
    });

    return formattedWeekData;
  });
};

export const getLatestWeekData = (weeklyData: WeekData[]) => {
  if (!weeklyData || weeklyData.length === 0) return null;

  // Filter out weeks with no data
  const weeksWithData = weeklyData.filter(
    (week) => week.data && week.data.length > 0,
  );

  if (weeksWithData.length === 0) return null;

  // Sort by week number in descending order
  const sortedWeeks = [...weeksWithData].sort((a, b) => b.week - a.week);

  return sortedWeeks[0];
};

export const getWeekData = (weeklyData: WeekData[], week: number) => {
  return weeklyData.find((data) => data.week === week) || null;
};

export const getDataByMeasurement = (
  weeklyData: WeekData[],
  measurementName: string,
) => {
  return weeklyData
    .filter((weekData) => {
      // Find the measurement in this week's data
      const measurement = weekData.data.find((m) => {
        if (measurementName === 'Weight' && m.name === 'Weight') return true;
        if (measurementName === 'BPD' && m.name === 'BPD') return true;
        if (measurementName === 'CRL' && m.name === 'CRL') return true;
        if (measurementName === 'AC' && m.name === 'AC') return true;
        if (measurementName === 'FL' && m.name === 'FL') return true;
        if (
          measurementName === 'Fetal Heart Rate' &&
          m.name === 'Fetal Heart Rate'
        )
          return true;
        return false;
      });

      return !!measurement;
    })
    .map((weekData) => {
      const measurement = weekData.data.find((m) => {
        if (measurementName === 'Weight' && m.name === 'Weight') return true;
        if (measurementName === 'BPD' && m.name === 'BPD') return true;
        if (measurementName === 'CRL' && m.name === 'CRL') return true;
        if (measurementName === 'AC' && m.name === 'AC') return true;
        if (measurementName === 'FL' && m.name === 'FL') return true;
        if (
          measurementName === 'Fetal Heart Rate' &&
          m.name === 'Fetal Heart Rate'
        )
          return true;
        return false;
      });

      return {
        week: weekData.week,
        value: measurement ? measurement.value : 0,
        min: measurement ? measurement.min : 0,
        max: measurement ? measurement.max : 0,
        unit: measurement ? measurement.unit : '',
      };
    })
    .sort((a, b) => a.week - b.week);
};
