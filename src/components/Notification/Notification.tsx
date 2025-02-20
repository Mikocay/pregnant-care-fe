import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

const showNotification = ({
  type,
  message,
  description = '',
  duration = 3,
  placement = 'topRight',
}: NotificationProps) => {
  notification[type]({
    message,
    description,
    duration,
    placement,
  });
};

export default showNotification;
