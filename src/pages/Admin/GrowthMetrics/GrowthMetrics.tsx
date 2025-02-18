import { Table, TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  unit: string;
  description: string;
  min_value: number;
  max_value: number;
  week: number;
}

function GrowthMetrics() {
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Min value',
      dataIndex: 'min_value',
      key: 'min_value',
    },
    {
      title: 'Max value',
      dataIndex: 'max_value',
      key: 'max_value',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'Crown-Rump Length',
      unit: 'cm',
      description: 'Length of the baby from head to bottom.',
      min_value: 0.1,
      max_value: 10,
      week: 8,
    },
    {
      key: '2',
      name: 'Crown-Rump Length',
      unit: 'cm',
      description: 'Length of the baby from head to bottom.',
      min_value: 0.1,
      max_value: 10,
      week: 8,
    },
  ];

  return <Table<DataType> columns={columns} dataSource={data} />;
}

export default GrowthMetrics;
