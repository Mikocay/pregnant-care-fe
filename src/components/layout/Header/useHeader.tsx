import config from '@/config';
import { RootState } from '@/redux/store/store';
import { userService } from '@/services/user.service';
import { User } from '@/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useHeader = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  //* Get user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserInfoById(userId);
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  });

  const handleLogout = () => {
    navigate(config.routes.auth.logout);
  };

  return {
    user,
    handleLogout,
  };
};
