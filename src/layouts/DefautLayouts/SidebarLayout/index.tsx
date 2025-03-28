import Sidebar from '@/components/layout/Sidebar';
import { Layout } from 'antd';

type SidebarLayoutProps = {
  children: JSX.Element;
};

import {
  InfoCircleOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  HeartOutlined,
  BellOutlined,
} from '@ant-design/icons';

const sidebarBody = [
  {
    key: 'information',
    icon: <InfoCircleOutlined />,
    label: 'Information',
  },
  {
    key: 'tracking',
    icon: <FieldTimeOutlined />,
    label: 'Tracking',
  },
  {
    key: 'fetal-growth',
    icon: <LineChartOutlined />,
    label: 'Fetal growth chart',
  },
  {
    key: 'mother-status',
    icon: <HeartOutlined />,
    label: 'Mother Status',
  },
  {
    key: 'notification',
    icon: <BellOutlined />,
    label: 'Notification',
  },
];

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { Content } = Layout;

  return (
    <Layout>
      <Sidebar sidebarBody={sidebarBody} />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
