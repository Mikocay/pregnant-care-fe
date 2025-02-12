import { Layout, Button, Input, Table } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import MenuSider from '@/components/MenuSider';
import logo from '@/assets/logo.png';
import MiniAvatar from '@/components/MiniAvatar';
import './AdminLayout.css'
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const columns = [
    { title: 'Week', dataIndex: 'week', key: 'week' },
    { title: 'Heart Rate', dataIndex: 'heartRate', key: 'heartRate' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    { title: 'Blood Pressure', dataIndex: 'bloodPressure', key: 'bloodPressure' },
    { title: 'Health Status', dataIndex: 'healthStatus', key: 'healthStatus' },
    { title: 'Notes', dataIndex: 'notes', key: 'notes' },
    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="action-buttons">
          <Button type="text" icon={<EditOutlined />} className="edit-button" />
          <Button type="text" icon={<DeleteOutlined />} className="delete-button" />
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
    <Layout className="admin-layout">
      <Sider theme="light" width={260} className="sidebar">
        <div className='sidebar-top'>
          <div className="logo">
            <img src={logo} alt="PregnaCare" width={30} />
          </div>
          <div>
            <p className="sidebar-title">PregnaCare</p>
            <p className='sidebar-subtitle'>
              Modern Member Dashboard
            </p>
          </div>
        </div>

        <MenuSider />
      </Sider>

      <Layout className="main-content">
        <Header className="header">
          <div className="header-right">
            <p className='header-name'>Hello <span className=''> UserName</span> </p>
            <MiniAvatar />

          </div>
        </Header>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }} >
          <Button type="primary" className="create-button">Create <EditOutlined /></Button>

        </div>

        <Content className="content">
          <div className="content-header">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="search-input"
            />
            <div className="sort-dropdown">
              Sort by: Newest
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              total: 256,
              pageSize: 8,
              showSizeChanger: false
            }}
            className="data-table"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;