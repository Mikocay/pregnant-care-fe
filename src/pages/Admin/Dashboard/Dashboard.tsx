import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import '@/layouts/AdminLayout/AdminLayout.css';

function Dashboard() {
  const columns = [
    { title: 'Week', dataIndex: 'week', key: 'week' },
    { title: 'Heart Rate', dataIndex: 'heartRate', key: 'heartRate' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    {
      title: 'Blood Pressure',
      dataIndex: 'bloodPressure',
      key: 'bloodPressure',
    },
    {
      title: 'Health Status',
      dataIndex: 'healthStatus',
      key: 'healthStatus',
    },
    { title: 'Notes', dataIndex: 'notes', key: 'notes' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="action-buttons">
          <Button type="text" icon={<EditOutlined />} className="edit-button" />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            className="delete-button"
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      week: '1',
      heartRate: '110 bpm',
      weight: '60 kg',
      bloodPressure: 'United States',
      healthStatus: 'United States',
      notes: 'United States',
      createdAt: 'United States',
      updatedAt: 'United States',
    },
    // Add more rows as needed
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        total: 256,
        pageSize: 8,
        showSizeChanger: false,
      }}
      className="data-table"
    />
  );
}

export default Dashboard;
