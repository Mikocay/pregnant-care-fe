import type React from 'react';
import {
  RightOutlined,
  EditOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  UserOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import styles from './Account.module.css';
import { Link } from 'react-router-dom';
import config from '@/config';

const { Title } = Typography;

export interface MenuItem {
  key: string;
  icon?: JSX.Element;
  label: string;
  link?: string;
}

export interface Section {
  title: string;
  items: MenuItem[];
}

const SettingsPage: React.FC = () => {
  const sections: Section[] = [
    {
      title: 'Account',
      items: [
        {
          key: 'profile',
          icon: <EditOutlined />,
          label: 'Edit profile',
          link: config.routes.member.profile,
        },
        {
          key: 'subscription',
          icon: <UserOutlined />,
          label: 'Manage your subscription',
          link: config.routes.member.subscription,
        },
      ],
    },
    {
      title: 'Fetus',
      items: [
        {
          key: 'fetus',
          icon: <HeartOutlined />,
          label: 'Your Babies',
          // link: config.routes.member.profile,
        },
      ],
    },
    {
      title: 'Payment',
      items: [
        {
          key: 'history',
          icon: <HistoryOutlined />,
          label: 'Order history',
        },
        {
          key: 'payment',
          icon: <CreditCardOutlined />,
          label: 'Saved payment cards',
          link: config.routes.auth.checkout,
        },
      ],
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.planSection}>
          <div className={styles.planTitle}>Your Plan</div>
          <div className={styles.planName}>Free Trial (3 Days)</div>
        </div>

        {sections.map((section) => (
          <div key={section.title} className={styles.section}>
            <Title level={3} className={styles.sectionTitle}>
              {section.title}
            </Title>
            {section.items.map((item) => {
              const content = (
                <div key={item.key} className={styles.menuItem}>
                  <span className={styles.menuItemIcon}>{item.icon}</span>
                  <span className={styles.menuItemLabel}>{item.label}</span>
                  <RightOutlined className={styles.menuItemArrow} />
                </div>
              );

              return item.link ? (
                <Link
                  to={item.link}
                  key={item.key}
                  className={styles.menuItemLink}
                >
                  {content}
                </Link>
              ) : (
                content
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
