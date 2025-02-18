import { useEffect } from 'react';
import { Form } from 'antd';
import { loginRequest } from '@/redux/features/auth/slice';
import { LoginFormData } from '@/redux/features/types/authType';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import showNotification from '@/components/Notification';
import { useNavigate } from 'react-router-dom';
import config from '@/config';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isUser } = useSelector(
    (state: RootState) => state.auth,
  );
  const [form] = Form.useForm();
  const navigate = useNavigate();

  console.log(isUser);

  const handleSubmit = (values: LoginFormData) => {
    dispatch(loginRequest(values));
  };

  // Cập nhật lỗi vào form nếu có
  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: 'email',
          errors: error.includes('email') ? [error] : [],
        },
        {
          name: 'password',
          errors: error.includes('password') ? [error] : [],
        },
      ]);
    }
  }, [error, form]);

  const handleClick = () => {
    if (error == 'User is not active') {
      showNotification({
        type: 'warning',
        message: `${error}, please check your email to verify your account!`,
      });
    }
  };

  //* Navigate after login
  //! Navigate based on user role
  useEffect(() => {
    if (isUser) {
      navigate(config.routes.public.home);
    }
  });

  return {
    isLoading,
    error,
    form,
    handleSubmit,
    handleClick,
  };
};
