import { Layout, Button, Input } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  HomeOutlined,
  EyeOutlined,
  BellOutlined,
  InboxOutlined,
  CalendarOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import styles from './MemberLayout.module.css'; // Import CSS Module
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
import { Fetus } from '@/types';

const { Header, Content } = Layout;

const MemberLayout = () => {
  const dispatch = useAppDispatch();
  const fetuses = useAppSelector((state: RootState) => state.fetus.fetuses);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    dispatch(fetchFetus(userId as string));
  }, [dispatch]);

  // Create children for the Fetus menu item
  const fetusChildren = [
    // Add all the baby names first
    ...fetuses.map((fetus: Fetus) => ({
      key: fetus._id, // Ensure unique key
      label: (
        <Link
          to={`${config.routes.member.pregnancy}/${fetus._id}`}
          style={{ textDecoration: 'none' }}
        >
          {fetus.name}
        </Link>
      ),
    })),
    // Add the "Add New Baby" button at the end
    {
      key: 'add-new-baby',
      label: (
        <Link
          to={`${config.routes.member.account}`}
          style={{ textDecoration: 'none' }}
        >
          <PlusOutlined /> Add new fetus
        </Link>
      ),
      className: 'add-new-baby-item',
    },
  ];
  const { user, handleLogout } = useHeader();
  const { hideContent, createButton } = useMember();
  const menuItems = [
    {
      key: '1',
      icon: <Baby size={16} />,
      label: 'Fetus',
      children: fetusChildren,
    },
    { key: '2', icon: <HomeOutlined />, label: 'Mother Information' },
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
    { key: '4', icon: <InboxOutlined />, label: 'Fetal growth chart' },
    { key: '5', icon: <EyeOutlined />, label: 'Mother status' },
    { key: '6', icon: <BellOutlined />, label: 'Fetal growth chart' },
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
