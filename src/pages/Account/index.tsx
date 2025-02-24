import type React from 'react';
import {
  RightOutlined,
  EditOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import styles from './Account.module.css';

const { Title } = Typography;

export interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  label: string;
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
        { key: 'profile', icon: <EditOutlined />, label: 'Edit profile' },
        {
          key: 'subscription',
          icon: <UserOutlined />,
          label: 'Manage your subscription',
        },
        // {
        //   key: 'restore',
        //   icon: <UndoOutlined />,
        //   label: 'Khôi phục danh sách phát',
        // },
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
        },
        // { key: 'change', icon: <SwapOutlined />, label: 'Đổi' },
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
            {section.items.map((item) => (
              <div key={item.key} className={styles.menuItem}>
                <span className={styles.menuItemIcon}>{item.icon}</span>
                <span className={styles.menuItemLabel}>{item.label}</span>
                <RightOutlined className={styles.menuItemArrow} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
