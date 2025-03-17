import { Layout, Button, Input } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  HomeOutlined,
  EyeOutlined,
  BellOutlined,
  InboxOutlined,
  CalendarOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import styles from './MemberLayout.module.css';
import config from '@/config';
import { useMember } from '../hooks/useMember';
import HeaderAuth from '@/components/layout/Header/HeaderAuth/HeaderAuth';
import { useHeader } from '@/components/layout/Header/useHeader';
import { Baby } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { RootState } from '@/redux/store/store';
import { useEffect } from 'react';
import { fetchFetus } from '@/redux/features/fetus/slice';
import React from 'react';

const { Header, Content } = Layout;

const MemberLayout = () => {
  const dispatch = useAppDispatch();
  const { user, handleLogout } = useHeader();
  const { hideContent, createButton } = useMember();
  const navigate = useNavigate();
  const selectedFetus = useAppSelector(
    (state: RootState) => state.fetus.selectedFetus,
  );

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatch(fetchFetus(userId as string));
  }, [dispatch]);

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: (
        <Link
          to={config.routes.member.account}
          style={{ textDecoration: 'none' }}
        >
          Mother Information
        </Link>
      ),
    },
    {
      key: '2',
      icon: <DashboardOutlined />,
      label: (
        <Link
          to={config.routes.member.dashboard}
          style={{ textDecoration: 'none' }}
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: '3',
      icon: <CalendarOutlined />,
      label: (
        <Link
          to={config.routes.member.calendar}
          style={{ textDecoration: 'none' }}
        >
          Calendar
        </Link>
      ),
    },
    {
      key: '4',
      icon: <Baby size={16} />,
      label: (
        <Link
          to={config.routes.member.pregnancy}
          style={{ textDecoration: 'none' }}
        >
          Fetus Growth
        </Link>
      ),
    },
    { key: '5', icon: <InboxOutlined />, label: 'Fetal growth chart' },
    { key: '6', icon: <EyeOutlined />, label: 'Mother status' },
    { key: '7', icon: <BellOutlined />, label: 'Notifications' },
  ];

  return (
    <Layout className={styles.memberLayout}>
      <Sidebar sidebarBody={menuItems} />
      <Layout className={styles.mainContent}>
        <Header className={styles.header}>
          <HeaderAuth user={user} onLogout={handleLogout} />
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
