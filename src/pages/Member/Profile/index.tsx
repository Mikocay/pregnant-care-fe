import type React from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  ConfigProvider,
} from 'antd';
import {
  UserOutlined,
  GlobalOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface UserFormData {
  firstName: string;
  lastName: string;
  bloodType: string;
  nationality: string;
  phoneNumber: string;
  dateOfBirth: Date;
}

const UpdateUserForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: UserFormData) => {
    console.log('Form values:', values);
    // Here you would typically send the data to your backend
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d23f57',
          colorPrimaryHover: '#b83548',
          colorBorder: '#e0e0e0',
          colorPrimaryBorder: '#d23f57',
          controlOutline: 'rgba(210, 63, 87, 0.2)',
        },
      }}
    >
      <Card className={styles.formCard}>
        <div className={styles.formHeader}>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className={styles.backButton}
          >
            Back
          </Button>
          <h2 className={styles.formTitle}>
            <EditOutlined className={styles.titleIcon} /> Update User
            Information
          </h2>
        </div>
        <Form
          form={form}
          name="updateUserForm"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: 'Please input your first name!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className={styles.inputIcon} />}
                  placeholder="First Name"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  { required: true, message: 'Please input your last name!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className={styles.inputIcon} />}
                  placeholder="Last Name"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="bloodType"
                label="Blood Type"
                rules={[
                  {
                    required: false,
                    message: 'Please select your blood type!',
                  },
                ]}
              >
                <Select placeholder="Select blood type">
                  <Option value="A+">A+</Option>
                  <Option value="A-">A-</Option>
                  <Option value="B+">B+</Option>
                  <Option value="B-">B-</Option>
                  <Option value="AB+">AB+</Option>
                  <Option value="AB-">AB-</Option>
                  <Option value="O+">O+</Option>
                  <Option value="O-">O-</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="nationality"
                label="Nationality"
                rules={[
                  { required: true, message: 'Please input your nationality!' },
                ]}
              >
                <Input
                  prefix={<GlobalOutlined className={styles.inputIcon} />}
                  placeholder="Nationality"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className={styles.inputIcon} />}
                  placeholder="Phone Number"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
                rules={[
                  {
                    required: true,
                    message: 'Please select your date of birth!',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  format="YYYY-MM-DD"
                  suffixIcon={<CalendarOutlined className={styles.inputIcon} />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
            >
              Update Information
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </ConfigProvider>
  );
};

export default UpdateUserForm;
