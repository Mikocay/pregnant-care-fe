import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useState } from 'react'
import logo from '../../assets/logo.png';
import './index.css'
import { Outlet } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

function AdminLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Layout className="layout">
      <header className="header">
        <div className={`logo ${collapsed ? 'fold' : ''}`}>
          <img src={logo} alt="Logo" />
        </div>
        <div className="nav">
          <div className="left">
            <Button
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className="right">
            {/* <MiniNotify user={user} /> */}
          </div>
        </div>
      </header>
      <Layout className={`main ${collapsed ? "fold" : ""}`}>
        <Sider
          className="sider"
          collapsed={collapsed}
          breakpoint='lg'
          onBreakpoint={(broken: boolean) => setCollapsed(broken)}
          theme='light'
          style={{ 'backgroundColor': '#fff !important' }}
        >
          {/* <MenuSider /> */}
        </Sider>
        <Content className="content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout