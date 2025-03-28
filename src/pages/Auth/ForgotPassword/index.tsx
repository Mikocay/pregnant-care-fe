import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../styles/Auth.module.css';
import ASSETS from '@/assets';
import { Link } from 'react-router-dom';
import config from '@/config';

const ForgetPassword: React.FC = () => {
  //   const { handleSubmit, form, handleClick } = useLogin();

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
          <p className={styles.title}>Forget Password</p>

          <Form
            // form={form}
            name="forgetPassword"
            // onFinish={handleSubmit}
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
                { required: true, message: 'Please enter your new password!' },
                {
                  min: 8,
                  max: 126,
                  message: 'Password must be 8-126 characters',
                },
              ]}
            >
              <Input.Password placeholder="New Password" size="large" />
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
                // onClick={handleClick}
                style={{ backgroundColor: '#ff7875' }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
          <div className={styles.footer}>
            <Link to={config.routes.auth.login}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
