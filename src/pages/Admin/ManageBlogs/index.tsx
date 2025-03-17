import { EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { notification, Table, TableProps } from 'antd';
import { useState } from 'react';
import { Blog } from './types';
import { getBlogPostsQuery } from './query/blogQuery';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ManageBlogs = () => {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['blogs', pagination.current, pagination.pageSize],
    queryFn: getBlogPostsQuery,
    staleTime: 5000,
  });

  if (error) {
    notification.error({
      message: 'Error',
      description: (error as Error).message,
    });
  }

  const handleViewBlog = (blogId: string) => {
    navigate(`/admin/blog/${blogId}`);
  };

  const columns: TableProps<Blog>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'heading',
      key: 'heading',
    },
    {
      title: 'Week',
      dataIndex: 'week',
      key: 'week',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Author ID',
      dataIndex: 'author_id',
      key: 'author_id',
    },
    {
      title: 'Published Date',
      dataIndex: 'published_date',
      key: 'published_date',
      render: (value) => dayjs(value * 1000).format('YYYY-MM-DD'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <EyeOutlined
          onClick={() => handleViewBlog(record.id)}
          style={{ cursor: 'pointer', color: '#1890ff' }}
        />
      ),
    },
  ];

  const handleTableChange = (newPagination: TableProps<Blog>['pagination']) => {
    if (newPagination) {
      setPagination(newPagination as { current: number; pageSize: number });
    }
  };

  return (
    <Table<Blog>
      columns={columns}
      dataSource={data?.data.data}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data?.data.pagination.total || 0,
      }}
      onChange={handleTableChange}
    />
  );
};

export default ManageBlogs;
