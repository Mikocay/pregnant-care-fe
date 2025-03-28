import { Plan } from '@/types';
import { Button, Flex, Form, Input, Select } from 'antd';
import { useLocation } from 'react-router-dom';
import styles from './FormGrowthMatrics.module.css';
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useFormGrowthMetrics } from './useFormPlan';

const FormCreateGrowthMetrics = () => {
  const state = useLocation();
  const initialPlan = state.state?.initialPlan as Plan;

  const [form] = Form.useForm();
  const { onSubmit, navigateBack } = useFormGrowthMetrics();

  return (
    <>
      <div className={styles.formHeader}>
        <div className={styles.backButton}>
          <ArrowLeftOutlined onClick={navigateBack} />
        </div>
        <p className={styles.formTitle}>
          {initialPlan ? 'Edit Growth Metrics' : 'Add Growth Metrics'}
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          const formValues = form.getFieldsValue();
          // Thêm ID vào formValues nếu đang chỉnh sửa
          if (initialPlan) {
            formValues.id = initialPlan.id;
          }
          onSubmit(formValues);
        }}
        initialValues={initialPlan}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="unit"
          label="Unit"
          rules={[{ required: true, message: 'Please input the unit' }]}
        >
          <Select
            showSearch
            placeholder="Select a unit"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: 'mm', label: 'mm' },
              { value: 'g', label: 'g' },
              { value: 'bpm', label: 'bpm' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="weeks"
          label="Weeks"
        >
          <Form.List name="weeks">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Flex key={field.key} gap="middle" align="center">
                    {/* Week Input */}
                    <Form.Item
                      name={[field.name, 'week']}
                      rules={[{ required: true, message: 'Please enter the week' }]}
                      style={{ width: 'calc(33% - 10px)' }}
                    >
                      <Input placeholder="Enter week" />
                    </Form.Item>

                    {/* Min Value Input */}
                    <Form.Item
                      name={[field.name, 'min']}
                      rules={[{ required: true, message: 'Please enter min value' }]}
                      style={{ width: 'calc(33% - 10px)' }}
                    >
                      <Input placeholder="Enter min values" />
                    </Form.Item>

                    {/* Max Value Input */}
                    <Form.Item
                      name={[field.name, 'max']}
                      rules={[{ required: true, message: 'Please enter max value' }]}
                      style={{ width: 'calc(33% - 10px)' }}
                    >
                      <Input placeholder="Enter max values" />
                    </Form.Item>

                    {/* Remove Button */}
                    {fields.length > 1 && (
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    )}
                  </Flex>
                ))}

                {/* Add Week Button */}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add week
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormCreateGrowthMetrics;
