import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Space } from 'antd';
import { Link } from 'react-router-dom';
import './MiniAvatar.css';
import config from '@/config';

function MiniAvatar() {
  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <Link to={config.routes.auth.logout}>
          <Space className="logoutItem">
            <LogoutOutlined />
            Logout
          </Space>
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        dropdownRender={(menus) => (
          <>
            <div>{menus}</div>
          </>
        )}
      >
        <Space style={{ cursor: 'pointer' }}>
          <Avatar size={40} icon={<UserOutlined />} />
        </Space>
      </Dropdown>
    </div>
  );
}

export default MiniAvatar;
