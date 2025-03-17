import type React from 'react';
import { useEffect, useState } from 'react';
import FetalDashboard from './components/index';
import { Spin, Result, Empty } from 'antd'; // Added Empty from Ant Design
import { axiosPrivate } from '@/config/axios';
import { API_ENDPOINTS } from '@/utils/api';
import { useAppSelector } from '@/redux/store/hooks'; // Added Redux hooks

// Define the interface for the data structure
interface FetalDataItem {
  week: number;
  data: {
    name: string;
    unit: string;
    value: number;
    min: number;
    max: number;
  }[];
}

const Dashboard: React.FC = () => {
  const [fetalData, setFetalData] = useState<FetalDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get selectedFetus from Redux state instead of URL params
  const { selectedFetus, fetuses } = useAppSelector((state) => state.fetus);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedFetus?.id) return;

      setLoading(true);
      setError(null);
      try {
        const response = await axiosPrivate.get(
          `${API_ENDPOINTS.members.getGrowthMetricByFetus}/${selectedFetus.id}`,
        );
        // Check if response is in the expected format
        if (Array.isArray(response)) {
          setFetalData(response);
        } else if (response.data && Array.isArray(response.data)) {
          setFetalData(response.data);
        } else if (
          response.data &&
          response.data.statusCode === 200 &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setFetalData(response.data.data);
        } else {
          setFetalData([]);
          console.error('Unexpected data format:', response);
          setError('Data format is not valid.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFetus?.id]); // Dependency is now selectedFetus?.id

  if (!selectedFetus && fetuses.length > 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Empty
          description="Please select a fetus from the selector above"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  if (!selectedFetus) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Empty
          description="No fetus data available. Please add a fetus first."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Spin size="large" tip="Loading data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Result status="error" title="Error" subTitle={error} />
      </div>
    );
  }

  if (fetalData.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Empty description="No growth metric data available for this fetus" />
      </div>
    );
  }

  return <FetalDashboard fetalData={fetalData} key={selectedFetus.id} />;
};

export default Dashboard;
