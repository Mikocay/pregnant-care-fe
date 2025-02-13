import { loginRequest } from '@/redux/features/auth/slice';
import { LoginFormData } from '@/redux/features/types/authType';
import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useLogin = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (values: LoginFormData) => {
    dispatch(loginRequest(values));
  };

  return {
    isLoading,
    error,
    handleSubmit,
  };
};
