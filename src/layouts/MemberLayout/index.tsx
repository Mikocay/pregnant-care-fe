import { Layout, Button, Input } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  HomeOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  BellOutlined,
  InboxOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import MiniAvatar from '@/components/MiniAvatar';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import styles from './MemberLayout.module.css'; // Import CSS Module
import config from '@/config';
import { useMember } from '../hooks/useMember';

const { Header, Content } = Layout;

const MemberLayout = () => {
  const { hideContent, createButton } = useMember();
  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Mother Information' },
    {
      key: '2',
      icon: <CalendarOutlined />,
      label: <Link to={config.routes.member.calendar}>Calendar</Link>,
    },
    { key: '3', icon: <ClockCircleOutlined />, label: 'Fetal growth chart' },
    { key: '4', icon: <InboxOutlined />, label: 'Fetal growth chart' },
    { key: '5', icon: <EyeOutlined />, label: 'Mother status' },
    { key: '6', icon: <BellOutlined />, label: 'Fetal growth chart' },
  ];

  return (
    <Layout className={styles.memberLayout}>
      <Sidebar sidebarBody={menuItems} />
      <Layout className={styles.mainContent}>
        <Header className={styles.header}>
          <div className={styles.headerRight}>
            <p className={styles.headerName}>
              Hello <span>UserName</span>
            </p>
            <MiniAvatar />
          </div>
        </Header>
        {/* Create Button */}
        {!hideContent && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '10px 20px',
            }}
          >
            <Button
              type="primary"
              className={styles.createButton}
              onClick={createButton}
            >
              Create <EditOutlined />
            </Button>
          </div>
        )}
        <Content className={styles.content}>
          {!hideContent && (
            <div className={styles.contentHeader}>
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                className={styles.searchInput}
              />
              <div className={styles.sortDropdown}>Sort by: Newest</div>
            </div>
          )}
          {/* Member Content */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MemberLayout;
