'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import FetalDashboard from './components/index';
import { Spin, Result } from 'antd'; // Import Result from Ant Design for error handling
import { axiosPrivate } from '@/config/axios';
import { API_ENDPOINTS } from '@/utils/api';
import { useParams } from 'react-router-dom';

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
  const [error, setError] = useState<string | null>(null); // To handle any errors
  const { id } = useParams(); // Get `id` from URL params

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true every time we start fetching data
      setError(null); // Reset any existing error state
      try {
        const response = await axiosPrivate.get(
          `${API_ENDPOINTS.members.getGrowthMetricByFetus}/${id}`,
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
        setLoading(false); // Once fetching is complete, set loading to false
      }
    };

    if (id) {
      fetchData(); // Fetch data when `id` changes
    }
  }, [id]); // The effect will re-run whenever `id` changes

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
        <h1>No data available</h1>
      </div>
    );
  }

  return <FetalDashboard fetalData={fetalData} key={id} />;
};

export default Dashboard;
