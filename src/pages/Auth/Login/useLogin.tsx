import { useEffect } from 'react';
import { Form } from 'antd';
import { loginRequest, logout } from '@/redux/features/auth/slice';
import { LoginFormData } from '@/redux/features/types/authType';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import showNotification from '@/components/Notification/Notification';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import { ROLE } from '@/constants';
import { isTokenExpired } from '@/utils/token/isTokenExpired';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { isLoading, error, userRole, accessToken } = useSelector(
    (state: RootState) => state.auth,
  );
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //* Handle submit & navigate after login
  const handleSubmit = (values: LoginFormData) => {
    dispatch(loginRequest(values));
  };

  useEffect(() => {
    if (userRole && accessToken && !isTokenExpired(accessToken)) {
      if (userRole === ROLE.ADMIN) {
        navigate(config.routes.admin.dashboard);
      }
      //TODO: Navigate member role
      if (userRole === ROLE.MEMBER) {
        navigate(config.routes.member.dashboard);
      }
    } else {
      dispatch(logout());
    }
  }, [userRole, accessToken, navigate, dispatch]);

  //* Cập nhật lỗi vào form nếu có
  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: 'email',
          errors:
            error.includes('email') || error.includes('User') ? [error] : [],
        },
        {
          name: 'password',
          errors: error.includes('password') ? [error] : [],
        },
      ]);
    }
  }, [error, form]);

  //* Show notification when user is not active
  const handleClick = () => {
    if (error == 'User is not active') {
      showNotification({
        type: 'warning',
        message: `${error}, please check your email to verify your account!`,
      });
    }
  };

  return {
    isLoading,
    error,
    form,
    handleSubmit,
    handleClick,
  };
};
