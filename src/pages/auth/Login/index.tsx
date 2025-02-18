import React from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import styles from '../styles/Auth.module.css';
import ASSETS from '@/assets';
import { useLogin } from './useLogin';
import config from '@/config';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { handleSubmit, form, handleClick } = useLogin();

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
          <p className={styles.title}>Welcome to PregnaCare</p>

          <Form
            form={form}
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
                onClick={handleClick}
                style={{ backgroundColor: '#ff7875' }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.orDivider}>
            <div className={styles.socialButtons}>
              <Button icon={<GoogleOutlined />} size="large">
                Google
              </Button>
            </div>

            <Link
              to={config.routes.auth.forgotPassword}
              style={{
                display: 'block',
                textAlign: 'center',
                marginBottom: '1rem',
                color: '#666',
              }}
            >
              Forgot password?
            </Link>
          </div>


          <div className={styles.footer}>
            Don't have an account?{' '}
            <Link to={config.routes.auth.signUp}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
