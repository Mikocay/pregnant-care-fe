import type React from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import styles from '../styles/Auth.module.css';
import ASSETS from '@/assets';

const SignUp: React.FC = () => {
  const onFinish = () => {
    console.log('Success:');
  };

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
              Google
            </Button>
            {/* <Button icon={<FacebookOutlined />} size="large">
              Facebook
            </Button> */}
          </div>

          <div className={styles.divider}>OR</div>

          <Form
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="fullname"
              rules={[
                { required: true, message: 'Please input your full name!' },
              ]}
            >
              <Input placeholder="Enter your fullname" size="large" />
            </Form.Item>

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
              ]}
            >
              <Input.Password placeholder="Enter your password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter your confirm password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{ backgroundColor: '#ff7875' }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <div className={styles.footer}>
            Already have an account?
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
