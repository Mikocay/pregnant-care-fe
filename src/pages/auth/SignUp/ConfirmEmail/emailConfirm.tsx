import config from '@/config';
import { confirmEmailRequest } from '@/redux/features/auth/slice';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ValidateEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token:', token);

    if (!token) {
      return;
    }

    // Gửi request xác nhận email lên server
    const confirmEmail = async () => {
      try {
        // Gọi API xác nhận email
        dispatch(confirmEmailRequest(token));
        navigate(config.routes.auth.login);
      } catch (error: unknown) {
        let errorMessage = 'Confirm failed';

        if (error instanceof AxiosError) {
          errorMessage = error.response?.data.message
            ? error.response?.data.message
            : error.message;

          console.log('error:', errorMessage);
        }
      }
    };

    confirmEmail();
  }, [token, navigate, dispatch]);

  return null;
};

export default ValidateEmail;
