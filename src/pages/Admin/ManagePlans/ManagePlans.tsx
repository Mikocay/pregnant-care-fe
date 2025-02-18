import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './ManagePlans.module.css';
import { Plan } from '@/types';

const ManagePlans = () => {
  const data: Plan[] = [
    {
      key: '1',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vwRMx4Sb5LghJfg7BuHpU6BB5493fU.png',
      packageName: 'Free trial (3 days)',
      features: [
        'Full access to all features',
        'Priority customer support',
        'Cancel anytime with no extra charges',
      ],
      price: 0,
      dateCreate: '10:30 5-10-2025',
    },
    {
      key: '2',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vwRMx4Sb5LghJfg7BuHpU6BB5493fU.png',
      packageName: 'Each month',
      features: [
        'Access to all basic features',
        'No credit card required',
        'Experience the platform risk-free',
      ],
      price: 19.99,
      dateCreate: '10:30 5-10-2025',
    },
    {
      key: '3',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vwRMx4Sb5LghJfg7BuHpU6BB5493fU.png',
      packageName: 'Lifetime',
      features: [
        'All features unlocked permanently',
        'Exclusive lifetime member perk',
        'No recurring payments',
      ],
      price: 199,
      dateCreate: '10:30 5-10-2025',
    },
  ];

  const columns = [
    {
      title: 'Package name',
      dataIndex: 'packageName',
      key: 'packageName',
      render: (text: string, record: Plan) => (
        <div className={styles.packageInfo}>
          <img
            src={record.avatar || '/placeholder.svg'}
            alt="avatar"
            className={styles.avatar}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features: string[]) => (
        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
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
      dataIndex: 'dateCreate',
      key: 'dateCreate',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className={styles.editButton}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            className={styles.deleteButton}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      className={styles.table}
    />
  );
};

export default ManagePlans;
