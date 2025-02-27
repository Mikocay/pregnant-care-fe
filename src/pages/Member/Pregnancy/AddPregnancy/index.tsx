import { Button, Form, Input, Modal, Select, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './AddPregnancy.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { RootState } from '@/redux/store/store';
import { fetchFetus, fetchFetusStandardsByWeek, fetchGrowthMetric } from '@/redux/features/fetus/slice';
import { Fetus, FetusStandardSummary } from '@/types';
const { Option } = Select;

interface AddPregnancy {
  week: number;
  open: boolean;
  onClose: () => void;
}

const AddPregnancy: React.FC<AddPregnancy> = ({ week, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { fetusStandardsByWeek, fetuses } = useAppSelector((state: RootState) => state.fetus);
  const [form] = Form.useForm();
  const [selectedFetus, setSelectedFetus] = useState<string>('');

  useEffect(() => {
    if (open) {
      setLoading(true);
      const fetchData = () => {
        setLoading(true);
        try {
          dispatch(fetchFetusStandardsByWeek(week));
          dispatch(fetchFetus(localStorage.getItem('userId') as string));
        } catch (error) {
          console.log('error', error);
        }
        finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [week, open, dispatch]);

  useEffect(() => {
    if (fetusStandardsByWeek.length > 0) {
      form.setFieldsValue(
        fetusStandardsByWeek.reduce((acc: { [key: string]: string }, field) => {
          acc[field.name] = '';
          return acc;
        }, {})
      );
    }
  }, [fetusStandardsByWeek, form]);

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      setLoading(true);
      const formattedData = fetusStandardsByWeek.map((field) => ({
        name: field.name,
        unit: field.unit,
        value: Number(values[field.name]), // Chuyển giá trị thành số
        week: week,
      }));
      // gọi API để lưu dữ liệu
      dispatch(fetchGrowthMetric({ fetusId: selectedFetus, metrics: formattedData }));

    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  return (
    <Modal title={`Week ${week} Details`} open={open} onCancel={onClose} footer={null}>
      {loading ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSubmit} className={styles.form}>
          <Form.Item
            name="fetus" label="Select baby" rules={[{ required: true, message: 'Please choose baby' }]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="Enter baby"
              onChange={(value) => setSelectedFetus(value)}
              value={selectedFetus}
              allowClear
            >
              {fetuses.map((fetus: Fetus) => (
                <Option key={fetus._id} value={fetus._id}>
                  {fetus.name} - {fetus.gender === 'male' ? 'Nam' : 'Nữ'}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {fetusStandardsByWeek.map((field: FetusStandardSummary) => (
            <Form.Item
              key={field.name}
              label={`${field.name} (${field.unit})`}
              name={field.name}>
              <Input
                type='number'
                placeholder={`Enter ${field.name}`}
              />
            </Form.Item>
          ))}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Modal>
  )
}

export default AddPregnancy