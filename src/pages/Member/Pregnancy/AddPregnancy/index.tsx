import { Button, Form, Input, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './AddPregnancy.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { RootState } from '@/redux/store/store';
import {
  fetchFetusStandardsByWeek,
  fetchGrowthMetric,
  fetchGrowthMetricByWeek,
} from '@/redux/features/fetus/slice';
import { FetusStandardSummary, GrowthMetricByWeek } from '@/types';

interface AddPregnancy {
  week: number;
  open: boolean;
  onClose: () => void;
}

const AddPregnancy: React.FC<AddPregnancy> = ({ week, open, onClose }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { fetusStandardsByWeek, growthMetricsByWeek, selectedFetus } =
    useAppSelector((state: RootState) => state.fetus);
  const [form] = Form.useForm();
  const fetusId = selectedFetus?.id;
  const fetusesHasWeekData = growthMetricsByWeek.find(
    (item) => item.week === week,
  );

  // Fetch standards for the selected week when modal opens or week changes
  useEffect(() => {
    if (open) {
      dispatch(fetchFetusStandardsByWeek(week));
    }
  }, [week, open, dispatch]);

  // Reset form when fetusId changes
  useEffect(() => {
    if (fetusId) {
      // Reset the form when fetus changes
      form.resetFields();

      // If modal is open, fetch data for the new fetus
      if (open) {
        dispatch(fetchGrowthMetricByWeek(fetusId));
      }
    }
  }, [fetusId, form, open, dispatch]);

  // Update form values when data changes or fetus changes
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
    fetusId, // Add fetusId as a dependency to update when fetus changes
  ]);

  const handleSubmit = async (values: Record<string, string>) => {
    if (!fetusId) {
      console.error('No fetus selected');
      return;
    }

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
      await dispatch(fetchGrowthMetric({ fetusId, metrics: formattedData }));

      // Gọi lại API để lấy dữ liệu mới
      await dispatch(fetchGrowthMetricByWeek(fetusId));
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const modalTitle = selectedFetus
    ? `${selectedFetus.name}: Week ${week} Details`
    : `Week ${week} Details`;

  return (
    <Modal title={modalTitle} open={open} onCancel={onClose} footer={null}>
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
          <Button type="primary" htmlType="submit" disabled={!fetusId}>
            Submit
          </Button>
        </Form>
      )}
    </Modal>
  );
};

export default AddPregnancy;
