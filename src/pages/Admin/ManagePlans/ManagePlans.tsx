import { Table, Button, Space, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import styles from './ManagePlans.module.css';
import { Plan } from '@/types';
import { useManagePlans } from './useManagePlans';
import ASSETS from '@/assets';

const ManagePlans = () => {
  //* use manage plans
  const { editButton, deleteButton, datas } = useManagePlans();

  const columns = [
    {
      title: 'Package name',
      dataIndex: 'packageName',
      key: 'packageName',
      render: (_name: string, record: Plan) => (
        <div className={styles.packageInfo}>
          <img
            src={ASSETS.logo || '/placeholder.svg'}
            alt="avatar"
            className={styles.avatar}
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    {
      title: 'Benefits',
      dataIndex: 'benefits',
      key: 'benefits',
      render: (benefits: string[]) => (
        <ul className={styles.featuresList}>
          {benefits.map((benefit, index) => (
            <li key={index}>• {benefit}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className={styles.price}>$ {price}</span>
      ),
    },
    {
      title: 'Date create',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) =>
        isActive ? (
          <CheckCircleOutlined
            style={{
              color: '#52c41a',
              fontSize: '18px',
            }}
          />
        ) : (
          <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: Plan) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className={styles.editButton}
            onClick={() => editButton(record.id)}
          />
          <Popconfirm
            title="Are you sure you want to delete this plan?"
            onConfirm={() => deleteButton(record.id)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
            className={styles.deleteConfirm}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              className={styles.deleteButton}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={datas}
      pagination={false}
      className={styles.table}
      rowKey={(record) => record.id}
    />
  );
};

export default ManagePlans;
