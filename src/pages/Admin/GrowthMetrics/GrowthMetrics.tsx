import { selectFetus } from '@/redux/features/fetus/selector';
import { fetchFetusStandards } from '@/redux/features/fetus/slice';
import { FetusStandard } from '@/types';
import { formatDate } from '@/utils/helper';
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

  //#region Fetus Standards
  const fetusState = useSelector(selectFetus);
  const fetusStandards = fetusState.fetusStandardsNameAndUnit.data;
  useEffect(() => {
    dispatch(fetchFetusStandards());
  }, []);

  const data: DataType[] = fetusStandards ? fetusStandards.map((fetus: FetusStandard) => ({
    key: fetus._id,
    name: fetus.name,
    unit: fetus.unit,
    created_at: formatDate(fetus.createdAt),
    action: <EditOutlined />,
  })) : [];
  //#endregion

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

  return (
    <>
      <Table<DataType> columns={columns} dataSource={data} />
    </>

  )
}

export default GrowthMetrics;
