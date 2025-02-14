import React from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from '../styles/Auth.module.css';
import ASSETS from '@/assets';
import { useSignup } from './useSignup';

const SignUp: React.FC = () => {
  const { handleSubmit, handleClick, form } = useSignup();

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
          <h1 className={styles.title}>SIGN UP</h1>

          <div className={styles.socialButtons}>
            <Button icon={<GoogleOutlined />} size="large">
              Sign up with Google
            </Button>
          </div>

          <div className={styles.divider}>OR</div>

          <Form
            name="signup"
            onFinish={handleSubmit}
            layout="vertical"
            requiredMark="optional"
            form={form}
          >
            <Form.Item
              name="fullname"
              rules={[
                { required: true, message: 'Please enter your full name!' },
              ]}
            >
              <Input placeholder="Full Name" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Invalid email format!' },
              ]}
            >
              <Input placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                {
                  min: 8,
                  max: 126,
                  message: 'Password must be 8-126 characters',
                },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return value && getFieldValue('password') === value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                onClick={handleClick}
                className={styles.submitBtn}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.footer}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
