import type React from 'react';
import {
  HeartOutlined,
  CalendarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import styles from './Services.module.css';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <HeartOutlined />,
    title: 'Pregnancy Tracking',
    description:
      'Helps monitor fetal development, schedule checkups, track maternal health, provide tips, and ensure a healthy pregnancy',
  },
  {
    icon: <CalendarOutlined />,
    title: 'Schedule Management',
    description:
      'Organizes integrates calendars, sets reminders, tracks time, and enhances productivity through efficient planning and collaboration',
  },
  {
    icon: <TeamOutlined />,
    title: 'Sharing and Community',
    description:
      'Fosters connection, collaboration, resource sharing, and support, empowering individuals and groups to achieve common goals',
  },
];

export const ServicesSection = () => {
  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>See our services for members</h2>
          <p>
            Make your data invisible by generating unlimited identities. The
            next-level in privacy protection for online and travel.
          </p>
        </div>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#" className={styles.link}>
                Explore More
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L10 8L6 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
