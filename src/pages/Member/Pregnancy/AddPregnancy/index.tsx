import { Button, Form, Input, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './AddPregnancy.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { RootState } from '@/redux/store/store';
import {
  fetchFetus,
  fetchFetusStandardsByWeek,
  fetchGrowthMetric,
  fetchGrowthMetricByWeek,
} from '@/redux/features/fetus/slice';
import { FetusStandardSummary, GrowthMetricByWeek } from '@/types';

interface AddPregnancy {
  id: string;
  week: number;
  open: boolean;
  onClose: () => void;
}

const AddPregnancy: React.FC<AddPregnancy> = ({ id, week, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { fetusStandardsByWeek, growthMetricsByWeek } = useAppSelector(
    (state: RootState) => state.fetus,
  );
  const [form] = Form.useForm();
  const fetusesHasWeekData = growthMetricsByWeek.find(
    (item) => item.week === week,
  );
  useEffect(() => {
    if (open) {
      dispatch(fetchFetusStandardsByWeek(week));
    }
  }, [week, open, dispatch]);

  useEffect(() => {
    if (open) {
      const fetusesHasWeekData = growthMetricsByWeek.find(
        (item) => item.week === week,
      );

      const defaultValues = fetusStandardsByWeek.reduce(
        (acc: Record<string, string>, field) => {
          if (!fetusesHasWeekData) {
            acc[field.name] = '';
            return acc;
          }
          acc[field.name] =
            fetusesHasWeekData.data
              .find((d) => d.name === field.name)
              ?.value.toString() || '';
          return acc;
        },
        {},
      );

      form.setFieldsValue(defaultValues);
    }
  }, [
    fetusStandardsByWeek,
    fetusesHasWeekData,
    open,
    form,
    growthMetricsByWeek,
    week,
  ]);

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      setLoading(true);
      const formattedData: GrowthMetricByWeek = {
        week,
        data: fetusStandardsByWeek?.map((field) => ({
          name: field.name,
          unit: field.unit,
          value: Number(values[field.name]) || 0,
        })),
      };
      // Gửi dữ liệu lên server
      await dispatch(
        fetchGrowthMetric({ fetusId: id, metrics: formattedData }),
      );

      // Gọi lại API để lấy dữ liệu mới
      await dispatch(fetchGrowthMetricByWeek(id));
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };
  return (
    <Modal
      title={`Week ${week} Details`}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      {loading ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className={styles.form}
        >
          {fetusStandardsByWeek.map((field: FetusStandardSummary) => (
            <Form.Item
              key={field.name}
              label={`${field.name} (${field.unit})`}
              name={field.name}
            >
              <Input type="number" placeholder={`Enter ${field.name}`} />
            </Form.Item>
          ))}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default AddPregnancy;
