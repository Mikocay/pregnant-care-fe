import type React from 'react';
import {
  RightOutlined,
  EditOutlined,
  CreditCardOutlined,
  HistoryOutlined,
  SwapOutlined,
  UserOutlined,
  UndoOutlined,
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
      title: 'Tài khoản',
      items: [
        {
          key: 'subscription',
          icon: <UserOutlined />,
          label: 'Quản lý gói đăng ký',
        },
        { key: 'profile', icon: <EditOutlined />, label: 'Chỉnh sửa hồ sơ' },
        {
          key: 'restore',
          icon: <UndoOutlined />,
          label: 'Khôi phục danh sách phát',
        },
      ],
    },
    {
      title: 'Thanh toán',
      items: [
        {
          key: 'history',
          icon: <HistoryOutlined />,
          label: 'Lịch sử đặt hàng',
        },
        {
          key: 'payment',
          icon: <CreditCardOutlined />,
          label: 'Thẻ thanh toán đã lưu',
        },
        { key: 'change', icon: <SwapOutlined />, label: 'Đổi' },
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
