'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import FetalDashboard from './components/index';
import { Spin } from 'antd';
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
  const { id } = useParams();

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axiosPrivate.get(
          `${API_ENDPOINTS.members.getGrowthMetricByFetus}/${id}`,
        );
        // Check if data is in the expected format
        if (Array.isArray(response)) {
          setFetalData(response);
        } else if (response.data && Array.isArray(response.data)) {
          // If the API returns { data: [...] } format
          setFetalData(response.data);
        } else if (
          response.data &&
          response.data.statusCode === 200 &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          // If the API returns { statusCode: 200, data: [...] } format
          setFetalData(response.data.data);
        } else {
          console.error('Unexpected data format:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // For development/testing, use sample data if needed
    // Comment this out when using real API
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" tip="Loading data..." />
      </div>
    );
  }

  return <FetalDashboard fetalData={fetalData} />;
};

export default Dashboard;
