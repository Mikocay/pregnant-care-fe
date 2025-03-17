'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Tabs,
  Table,
  Select,
  Typography,
  Tag,
} from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { HeartOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import styles from './styles.module.css';
import { MeasurementProgressBar } from './MeasurementProgressBar';
import { WeekSelector } from './WeekSelector';
import { MeasurementCard } from './MeasurementCard';
import {
  formatData,
  getLatestWeekData,
  getDataByMeasurement,
  getWeekData,
} from './utils';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// This matches the exact structure from the API
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

interface DashboardProps {
  fetalData: FetalDataItem[];
}

const FetalDashboard: React.FC<DashboardProps> = ({ fetalData }) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedMeasurement, setSelectedMeasurement] =
    useState<string>('Weight');

  console.log('fetalData:', fetalData);

  useEffect(() => {
    if (fetalData.length > 0) {
      // Reset selectedWeek mỗi khi fetalData thay đổi
      const latestWeekData = getLatestWeekData(fetalData);
      if (latestWeekData) {
        setSelectedWeek(latestWeekData.week);
      }
    }
  }, [fetalData]); // Chạy lại khi fetalData thay đổi

  if (!fetalData) return <div>There are no data...</div>;

  const weeklyData = fetalData;
  const formattedData = formatData(weeklyData);

  const currentWeekData = selectedWeek
    ? getWeekData(weeklyData, selectedWeek)
    : null;

  const measurementOptions = [
    { label: 'Fetal Weight (g)', value: 'Weight' },
    { label: 'Biparietal Diameter - BPD (mm)', value: 'BPD' },
    { label: 'Crown-Rump Length - CRL (mm)', value: 'CRL' },
    { label: 'Abdominal Circumference - AC (mm)', value: 'AC' },
    { label: 'Femur Length - FL (mm)', value: 'FL' },
    { label: 'Fetal Heart Rate - FHR (bpm)', value: 'Fetal Heart Rate' },
  ];

  const measurementData = getDataByMeasurement(weeklyData, selectedMeasurement);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: (
        <div className={styles.overviewContainer}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24}>
              <Card className={styles.weekSelectorCard}>
                <WeekSelector
                  weeklyData={weeklyData}
                  selectedWeek={selectedWeek}
                  onSelectWeek={setSelectedWeek}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className={styles.statsRow}>
            {currentWeekData &&
              currentWeekData.data.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={8} key={index}>
                  <MeasurementCard
                    name={item.name}
                    value={item.value}
                    unit={item.unit}
                    week={selectedWeek || 0}
                    min={item.min}
                    max={item.max}
                  />
                </Col>
              ))}
          </Row>

          {currentWeekData &&
            currentWeekData.data.map((item, index) => (
              <Row gutter={[16, 16]} key={`progress-${index}`}>
                <Col span={24}>
                  <Card className={styles.progressCard}>
                    <MeasurementProgressBar
                      name={item.name}
                      value={item.value}
                      unit={item.unit}
                      min={item.min}
                      max={item.max}
                    />
                  </Card>
                </Col>
              </Row>
            ))}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Charts',
      children: (
        <div className={styles.chartsContainer}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <Title level={4}>Fetal Development Chart</Title>
                  <Select
                    value={selectedMeasurement}
                    onChange={setSelectedMeasurement}
                    options={measurementOptions}
                    className={styles.measurementSelect}
                  />
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={measurementData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="week"
                      label={{
                        value: 'Pregnancy Week',
                        position: 'insideBottomRight',
                        offset: -5,
                      }}
                    />
                    <YAxis
                      label={{
                        value: `${selectedMeasurement} (${
                          measurementData[0]?.unit || ''
                        })`,
                        angle: -90,
                        position: 'insideLeft',
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <ReferenceLine
                      y={measurementData[0]?.min}
                      stroke="#ff4d4f"
                      strokeDasharray="3 3"
                      label="Min"
                    />
                    <ReferenceLine
                      y={measurementData[0]?.max}
                      stroke="#52c41a"
                      strokeDasharray="3 3"
                      label="Max"
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name={`${selectedMeasurement}`}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="min"
                      name="Minimum"
                      stroke="#ff4d4f"
                      strokeDasharray="5 5"
                      strokeWidth={1}
                    />
                    <Line
                      type="monotone"
                      dataKey="max"
                      name="Maximum"
                      stroke="#52c41a"
                      strokeDasharray="5 5"
                      strokeWidth={1}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Card className={styles.chartCard}>
                <Title level={4}>Fetal Weight (g)</Title>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={getDataByMeasurement(weeklyData, 'Weight')}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#1890ff"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="min"
                      name="Min"
                      stroke="#ff4d4f"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="max"
                      name="Max"
                      stroke="#52c41a"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Card className={styles.chartCard}>
                <Title level={4}>Femur Length (mm)</Title>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={getDataByMeasurement(weeklyData, 'FL')}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ff7875"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="min"
                      name="Min"
                      stroke="#ff4d4f"
                      strokeDasharray="5 5"
                    />
                    <Line
                      type="monotone"
                      dataKey="max"
                      name="Max"
                      stroke="#52c41a"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '3',
      label: 'Data',
      children: (
        <div className={styles.dataContainer}>
          <Card className={styles.tableCard}>
            <Title level={4}>Weekly Measurement Data</Title>
            <Table
              dataSource={formattedData}
              rowKey="week"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 'max-content' }}
              className={styles.dataTable}
            >
              <Table.Column
                title="Week"
                dataIndex="week"
                key="week"
                fixed="left"
              />
              <Table.Column
                title="BPD (mm)"
                dataIndex="BPD"
                key="BPD"
                render={(value, record: any) => {
                  if (!value) return '-';
                  const status =
                    value < record.BPD_min
                      ? 'below'
                      : value > record.BPD_max
                      ? 'above'
                      : 'normal';
                  const color = status === 'normal' ? 'success' : 'error';
                  return (
                    <span>
                      {value} mm <Tag color={color}>{status}</Tag>
                    </span>
                  );
                }}
              />
              <Table.Column
                title="CRL (mm)"
                dataIndex="CRL"
                key="CRL"
                render={(value, record: any) => {
                  if (!value) return '-';
                  const status =
                    value < record.CRL_min
                      ? 'below'
                      : value > record.CRL_max
                      ? 'above'
                      : 'normal';
                  const color = status === 'normal' ? 'success' : 'error';
                  return (
                    <span>
                      {value} mm <Tag color={color}>{status}</Tag>
                    </span>
                  );
                }}
              />
              <Table.Column
                title="AC (mm)"
                dataIndex="AC"
                key="AC"
                render={(value, record: any) => {
                  if (!value) return '-';
                  const status =
                    value < record.AC_min
                      ? 'below'
                      : value > record.AC_max
                      ? 'above'
                      : 'normal';
                  const color = status === 'normal' ? 'success' : 'error';
                  return (
                    <span>
                      {value} mm <Tag color={color}>{status}</Tag>
                    </span>
                  );
                }}
              />
              <Table.Column
                title="FL (mm)"
                dataIndex="FL"
                key="FL"
                render={(value, record: any) => {
                  if (!value) return '-';
                  const status =
                    value < record.FL_min
                      ? 'below'
                      : value > record.FL_max
                      ? 'above'
                      : 'normal';
                  const color = status === 'normal' ? 'success' : 'error';
                  return (
                    <span>
                      {value} mm <Tag color={color}>{status}</Tag>
                    </span>
                  );
                }}
              />
              <Table.Column
                title="Weight (g)"
                dataIndex="Weight"
                key="Weight"
                render={(value, record: any) => {
                  if (!value) return '-';
                  const status =
                    value < record.Weight_min
                      ? 'below'
                      : value > record.Weight_max
                      ? 'above'
                      : 'normal';
                  const color = status === 'normal' ? 'success' : 'error';
                  return (
                    <span>
                      {value} g <Tag color={color}>{status}</Tag>
                    </span>
                  );
                }}
              />
              <Table.Column
                title="Heart Rate (bpm)"
                dataIndex="Fetal Heart Rate"
                key="Fetal Heart Rate"
                render={(value, record: any) => {
                  if (!value) return '-';
                  const status =
                    value < record['Fetal Heart Rate_min']
                      ? 'below'
                      : value > record['Fetal Heart Rate_max']
                      ? 'above'
                      : 'normal';
                  const color = status === 'normal' ? 'success' : 'error';
                  return (
                    <span>
                      {value} bpm <Tag color={color}>{status}</Tag>
                    </span>
                  );
                }}
              />
            </Table>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <Layout className={styles.dashboard}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <HeartOutlined className={styles.logoIcon} />
          <span className={styles.logoText}>Fetal Development Dashboard</span>
        </div>
      </Header>
      <Content className={styles.content}>
        <Tabs defaultActiveKey="1" items={items} className={styles.tabs} />
      </Content>
    </Layout>
  );
};

export default FetalDashboard;
