import React from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import styles from '../styles/Auth.module.css';
import ASSETS from '@/assets';
import { useLogin } from './useLogin';

const Login: React.FC = () => {
  const { isLoading, error, handleSubmit } = useLogin();
  const [form] = Form.useForm(); // Sử dụng Form của Ant Design để quản lý state

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(import.meta.env.API_BASE_URL);

  return (
    <div className={styles.container}>
      <div className={styles.illustrationSection}>
        <img
          src={ASSETS.authBackground}
          alt="Pregnancy care illustration"
          className={styles.illustration}
        />
      </div>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Welcome to PregnaCare</h1>

          <div className={styles.socialButtons}>
            <Button icon={<GoogleOutlined />} size="large">
              Google
            </Button>
          </div>

          <div className={styles.divider}>OR</div>

          <Form
            form={form} // Quản lý Form bằng Ant Design
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={{ email: '', password: '' }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input placeholder="Enter your email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  min: 8,
                  max: 126,
                  message: 'Password must be 8-126 characters',
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ backgroundColor: '#ff7875' }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <a
            href="/forgot-password"
            style={{
              display: 'block',
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#666',
            }}
          >
            Forgot password?
          </a>

          <div className={styles.footer}>
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
