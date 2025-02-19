import { selectFetus } from '@/redux/features/fetus/selector';
import { setFetusStandards } from '@/redux/features/fetus/slice';
import { EditOutlined } from '@ant-design/icons';
import { Table, TableProps } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface DataType {
  key: string;
  name: string;
  unit: string;
  created_at: string;
  action?: React.ReactNode;
}

function GrowthMetrics() {
  const dispatch = useDispatch();
  const fetusState = useSelector(selectFetus);
  useEffect(() => {
    dispatch(setFetusStandards());
  }, [dispatch]);
  console.log('fetusState', fetusState);


  const data: DataType[] = Array.isArray(fetusState) ? fetusState.map((fetus: any) => ({
    key: fetus.id,
    name: fetus.name,
    unit: fetus.unit,
    created_at: fetus.created_at,
    action: <EditOutlined />,
  })) : [];

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => <EditOutlined />,
    }
  ];

  return <Table<DataType> columns={columns} dataSource={data} />;
}

export default GrowthMetrics;
