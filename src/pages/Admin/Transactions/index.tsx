import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { notification, Table, TableProps } from 'antd';
import { useState } from 'react';
import { Payment } from './types';
import { getPaymentQuery } from './query/paymentQuery';

const Transaction = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', pagination.current, pagination.pageSize],
    queryFn: getPaymentQuery,
    staleTime: 5000,
  });

  if (error) {
    notification.error({ message: 'Error', description: error.message });
  }

  const columns: TableProps<Payment>['columns'] = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'transaction_id',
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'user',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Stripe ID',
      dataIndex: 'stripeId',
      key: 'stripeId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'created_at',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => <EditOutlined />,
    },
  ];
  const handleTableChange = (
    newPagination: TableProps<Payment>['pagination'],
  ) => {
    if (newPagination) {
      setPagination(newPagination as { current: number; pageSize: number });
    }
  };

  return (
    <Table<Payment>
      columns={columns}
      dataSource={data?.data.data}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data?.data.pagination.total || 0, // Total transactions from backend
      }}
      onChange={handleTableChange}
    />
  );
};

export default Transaction;
