import { registerRequest } from '@/redux/features/auth/slice';
import { RegisterFormData } from '@/redux/features/types/authType';
import { useDispatch } from 'react-redux';
import { Omit } from 'lodash';
import { useAppSelector } from '@/redux/store/hooks';
import { selectRegistrationStatus } from '@/redux/features/auth/selector';
import showNotification from '@/components/Notification';
import { useEffect } from 'react';
import { Form } from 'antd';

export const useSignup = () => {
  const dispatch = useDispatch();
  const registerStatus = useAppSelector(selectRegistrationStatus);
  const { error } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm(); // Quản lý form trong hook

  useEffect(() => {
    if (error) {
      form.setFields([
        {
          name: 'email',
          errors: error.includes('Email') ? [error] : [],
        },
        {
          name: 'password',
          errors: error.includes('password') ? [error] : [],
        },
      ]);
    }
  }, [error, form]);

  const handleSubmit = (values: RegisterFormData) => {
    const postValue: Omit<RegisterFormData, 'confirmPassword' | 'fullName'> = {
      email: values.email,
      password: values.password,
    };
    dispatch(registerRequest(postValue));
  };

  const handleClick = () => {
    if (registerStatus === 'pending_confirmation') {
      showNotification({
        type: 'warning',
        message: 'Please check your email to verify your account!',
      });
    }
  };

  return { handleSubmit, handleClick, error, form };
};
