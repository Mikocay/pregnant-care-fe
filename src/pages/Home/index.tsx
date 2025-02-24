import type React from 'react';
import { Typography } from 'antd';
import {
  CalendarOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import styles from './HomePage.module.css';

const { Title, Paragraph } = Typography;

export interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const services: ServiceCard[] = [
    {
      icon: <HeartOutlined style={{ fontSize: '24px', color: '#FF7675' }} />,
      title: 'Pregnancy Tracking',
      description:
        'Track your pregnancy journey with our comprehensive tools and insights.',
    },
    {
      icon: <CalendarOutlined style={{ fontSize: '24px', color: '#FF7675' }} />,
      title: 'Schedule Management',
      description:
        'Stay organized with appointment reminders and important milestone tracking.',
    },
    {
      icon: <TeamOutlined style={{ fontSize: '24px', color: '#FF7675' }} />,
      title: 'Sharing and Community',
      description:
        'Connect with other parents and share your experiences in our supportive community.',
    },
  ];

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Title level={1} className={styles.heroTitle}>
              Crafted for optimal pregnancy tracking.
            </Title>
          </div>
          <div className={styles.heroImage}>
            <img src="" alt="Happy expecting couple" />
          </div>
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.servicesContainer}>
          <div className={styles.servicesTitle}>
            <Title level={2}>See our services for members</Title>
            <Paragraph type="secondary">
              Everything you need for a healthy and happy pregnancy journey
            </Paragraph>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.cardIcon}>{service.icon}</div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
