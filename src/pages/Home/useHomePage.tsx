import ASSETS from '@/assets';
import {
  CalendarOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Form } from 'antd';

export const useHomePage = () => {
  interface Feature {
    title: string;
    icon: string;
    points: string[];
  }

  interface ServiceFeature {
    icon: React.ReactNode;
    title: string;
    description: string;
  }

  const [form] = Form.useForm();

  const whyChooseUsFeatures: Feature[] = [
    {
      title: 'Monitoring both maternal health and fetal development',
      icon: ASSETS.homePage.baby,
      points: [
        'Track weekly milestones for fetal growth with detailed updates',
        'Schedule and manage prenatal checkups with reminders for key appointments',
        'Access professional advice and tools tailored for every stage of pregnancy',
        'Record health metrics like weight, blood pressure, and activity levels',
      ],
    },
    {
      title: 'Schedule Management',
      icon: ASSETS.homePage.pregnant,
      points: [
        'Plan, prioritize, and allocate resources effectively to meet deadlines',
        'Use tools that integrate with calendars for streamlined scheduling',
        'Set reminders and notifications to stay on track with tasks and events',
        'Ongoing adjustments and professional scheduling tools ensure effective time management',
      ],
    },
    {
      title: 'Building connections and sharing resources',
      icon: ASSETS.homePage.note,
      points: [
        'Identify platforms where communities thrive and facilitate meaningful interactions',
        'Share knowledge, resources, and experiences to empower others',
        'Build a sense of belonging through collaboration and mutual support',
        'Professional services and tools are available to create and maintain thriving communities',
      ],
    },
  ];

  const serviceFeatures: ServiceFeature[] = [
    {
      icon: <HeartOutlined />,
      title: 'Pregnancy Tracking',
      description:
        'Track your pregnancy journey with detailed insights and personalized recommendations',
    },
    {
      icon: <CalendarOutlined />,
      title: 'Schedule Management',
      description:
        'Manage appointments and important dates with smart reminders',
    },
    {
      icon: <TeamOutlined />,
      title: 'Sharing & Community',
      description: 'Connect with other parents and share your journey',
    },
  ];

  return {
    form,
    whyChooseUsFeatures,
    serviceFeatures,
  };
};
