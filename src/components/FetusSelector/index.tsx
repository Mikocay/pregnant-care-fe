import React from 'react';
import { Select, Typography, Space } from 'antd';
import { Baby } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { RootState } from '@/redux/store/store';
import { selectFetus } from '@/redux/features/fetus/slice';
import styles from './FetusSelector.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '@/config';

const { Option } = Select;
const { Text } = Typography;

const FetusSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetuses, selectedFetus } = useAppSelector(
    (state: RootState) => state.fetus,
  );

  const handleChange = (value: string) => {
    dispatch(selectFetus(value));

    // If on dashboard or pregnancy route, stay on current route
    // This ensures the view updates with the newly selected fetus
    if (
      location.pathname.includes('/member/dashboard') ||
      location.pathname.includes('/member/pregnancy')
    ) {
      return;
    }

    // Navigate to dashboard for the selected fetus
    navigate(config.routes.member.dashboard);
  };

  if (fetuses.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Space align="center">
        <Baby size={18} />
        <Text className={styles.label}>Current Fetus:</Text>
        <Select
          className={styles.selector}
          value={selectedFetus?.id || ''}
          onChange={handleChange}
          dropdownMatchSelectWidth={false}
        >
          {fetuses.map((fetus) => (
            <Option key={fetus.id} value={fetus.id}>
              {fetus.name}
            </Option>
          ))}
        </Select>
      </Space>
    </div>
  );
};

export default FetusSelector;
