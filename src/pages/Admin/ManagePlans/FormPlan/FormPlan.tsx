import { Plan } from '@/types';
import { Button, Form, Input, InputNumber, Switch } from 'antd';
import { useLocation } from 'react-router-dom';
import { useFormPlan } from './useFormPlan';
import styles from './FormPlan.module.css';
import {
  ArrowLeftOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

const FormPlan = () => {
  const state = useLocation();
  const initialPlan = state.state?.initialPlan as Plan;

  const [form] = Form.useForm();
  const { onSubmit, navigateBack } = useFormPlan();

  return (
    <div>
      <div className={styles.formHeader}>
        <div className={styles.backButton}>
          <ArrowLeftOutlined onClick={navigateBack} />
        </div>
        <p className={styles.formTitle}>
          {initialPlan ? 'Edit Plan' : 'Add Plan'}
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
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price' }]}
        >
          <InputNumber
            min={0}
            step={0.01}
            precision={2}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration (in days)"
          rules={[{ required: true, message: 'Please input the duration' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="isActive" label="Active" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.List name="benefits">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  required={false}
                  key={field.key}
                  label={index === 0 ? 'Benefits' : ''}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please input benefit or delete this field.',
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      style={{ width: 'calc(100% - 32px)' }}
                      placeholder="Enter a benefit"
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <MinusCircleOutlined
                      className={styles.deleteIcon}
                      onClick={() => remove(field.name)}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Benefit
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

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
    </div>
  );
};
export default FormPlan;
