import type React from 'react';
import { Form, Input, Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import styles from '../styles/Auth.module.css';
import ASSETS from '@/assets';
import { useNavigate } from 'react-router-dom';
import config from '@/config/routes';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    const result = await useLogin(email, password);

    if (result.success) {
      console.log('Đăng nhập thành công!');
      navigate(config.routes.public.home); // Điều hướng sau khi đăng nhập thành công
    } else {
      console.log(result.message);
    }
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
          <h1 className={styles.title}>Welcome to PregnaCare</h1>

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
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
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
            Don't have an account?
            <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
