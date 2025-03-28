import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Upload,
  message,
  Card,
  Divider,
  Typography,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  CalendarOutlined,
  CameraOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import styles from './Profile.module.css';

const { Option } = Select;
const { Title, Text } = Typography;

// Blood type options
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Sample list of nationalities
const nationalities = [
  'American',
  'Australian',
  'Brazilian',
  'British',
  'Canadian',
  'Chinese',
  'French',
  'German',
  'Indian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Korean',
  'Malaysian',
  'Mexican',
  'Russian',
  'Singaporean',
  'Spanish',
  'Thai',
  'Vietnamese',
];

interface ProfileFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  nationality: string;
  bloodType: string;
  dateOfBirth: number;
  avatar?: any;
}

const ProfileUpdateForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Sample initial data - in a real app, this would come from an API
  const initialValues: ProfileFormData = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    nationality: 'Vietnamese',
    bloodType: 'O+',
    dateOfBirth: Date.now() - 30 * 365 * 24 * 60 * 60 * 1000, // 30 years ago
  };

  const onFinish = (values: any) => {
    setLoading(true);

    // Convert moment date to timestamp
    const formData: ProfileFormData = {
      ...values,
      dateOfBirth: values.dateOfBirth.valueOf(),
    };

    // In a real app, you would send this data to your API
    console.log('Form values:', formData);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Profile updated successfully!');
    }, 1500);
  };

  // Avatar upload handling
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      return;
    }

    if (info.file.status === 'done') {
      // Get image URL from response in real application
      // Here we're using a FileReader to get a data URL for preview
      getBase64(info.file.originFileObj, (url: string) => {
        setImageUrl(url);
        setUploadSuccess(true);
        message.success('Avatar uploaded successfully!');

        // Reset the success icon after 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      });
    }
  };

  // Convert file to base64 for preview
  const getBase64 = (img: any, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  // Custom upload button
  const uploadButton = (
    <div className={styles.uploadButtonContent}>
      <CameraOutlined className={styles.cameraIcon} />
      <div className={styles.uploadText}>Upload Photo</div>
    </div>
  );

  return (
    <div className={styles.container}>
      <Card className={styles.profileCard} bordered={false}>
        <Title level={2} className={styles.cardTitle}>
          Update Profile
        </Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={{
            ...initialValues,
            dateOfBirth: moment(initialValues.dateOfBirth),
          }}
          onFinish={onFinish}
          className={styles.form}
        >
          <Row gutter={[32, 24]}>
            {/* Avatar Column */}
            <Col xs={24} md={8}>
              <div className={styles.avatarSection}>
                <div className={styles.avatarContainer}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className={styles.avatarUploader}
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // Replace with your upload endpoint
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <div className={styles.avatarWrapper}>
                        <img
                          src={imageUrl || '/placeholder.svg'}
                          alt="avatar"
                          className={styles.avatar}
                        />
                        {uploadSuccess && (
                          <div className={styles.successIcon}>
                            <CheckCircleOutlined />
                          </div>
                        )}
                      </div>
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
                <Text className={styles.avatarHint}>
                  Click to upload your profile picture
                </Text>
                <Text type="secondary" className={styles.avatarRequirements}>
                  JPG or PNG, max 2MB
                </Text>
              </div>
            </Col>

            {/* Form Fields Column */}
            <Col xs={24} md={16}>
              <div className={styles.formFields}>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your first name',
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className={styles.inputIcon} />}
                        placeholder="First Name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your last name',
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className={styles.inputIcon} />}
                        placeholder="Last Name"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined className={styles.inputIcon} />}
                    placeholder="Phone Number"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  name="nationality"
                  label="Nationality"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your nationality',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    placeholder="Select your nationality"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {nationalities.map((nationality) => (
                      <Option key={nationality} value={nationality}>
                        {nationality}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="bloodType"
                      label="Blood Type"
                      rules={[
                        {
                          required: true,
                          message: 'Please select your blood type',
                        },
                      ]}
                    >
                      <Select placeholder="Select blood type" size="large">
                        {bloodTypes.map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="dateOfBirth"
                      label="Date of Birth"
                      rules={[
                        {
                          required: true,
                          message: 'Please select your date of birth',
                        },
                      ]}
                    >
                      <DatePicker
                        className={styles.datePicker}
                        format="YYYY-MM-DD"
                        placeholder="Select date"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          <Divider className={styles.divider} />

          <Form.Item className={styles.submitButton}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
            >
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileUpdateForm;
