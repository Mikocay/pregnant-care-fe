import React, { useRef } from 'react';
import { Form, Input, Select, Button, Space } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import styles from './AddPaymentMethod.module.css';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { userService } from '@/services/user.service';

const { Option } = Select;

const AddPaymentMethod: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const card = useRef();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if (res) {
        await userService.postPaymentMethod({
          paymentMethodId: res.paymentMethod.id,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Add Payment Method</h2>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="cardholderName"
            label="Cardholder Name"
            rules={[
              { required: true, message: 'Please enter cardholder name' },
            ]}
          >
            <Input placeholder="Enter card holder name" />
          </Form.Item>

          <div className={styles.rowPaymentInput}>
            <CardElement ref={card} options={{}} />
          </div>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter address' }]}
          >
            <Input placeholder="Enter Full Address" />
          </Form.Item>

          <div className={styles.flexGroup}>
            <Form.Item
              name="country"
              label="Country"
              className={styles.flexItem}
              rules={[{ required: true, message: 'Please select country' }]}
            >
              <Select placeholder="Select country" allowClear>
                <Option value="us">United States</Option>
                <Option value="ca">Canada</Option>
                {/* Add more countries as needed */}
              </Select>
            </Form.Item>

            <Form.Item
              name="state"
              label="State"
              className={styles.flexItem}
              rules={[{ required: true, message: 'Please select state' }]}
            >
              <Select placeholder="Select state" allowClear>
                <Option value="ny">New York</Option>
                <Option value="ca">California</Option>
                {/* Add more states as needed */}
              </Select>
            </Form.Item>
          </div>

          <div className={styles.flexGroup}>
            <Form.Item
              name="city"
              label="City"
              className={styles.flexItem}
              rules={[{ required: true, message: 'Please select city' }]}
            >
              <Select placeholder="Select city" allowClear>
                <Option value="nyc">New York City</Option>
                <Option value="la">Los Angeles</Option>
                {/* Add more cities as needed */}
              </Select>
            </Form.Item>

            <Form.Item
              name="postalCode"
              label="Postal Code"
              className={styles.flexItem}
              rules={[{ required: true, message: 'Please enter postal code' }]}
            >
              <Input placeholder="Enter Zip Code" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.submitButton}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
