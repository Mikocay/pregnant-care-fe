import Logout from '@/components/Auth/Logout';
import config from '@/config';
import { lazy } from 'react';

//* Lazy load pages
const Login = lazy(() => import('@/pages/Auth/Login'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp'));
const ValidateEmail = lazy(
  () => import('@/pages/Auth/SignUp/ConfirmEmail/emailConfirm'),
);
const ForgetPassword = lazy(() => import('@/pages/Auth/ForgotPassword'));
const UnauthorizedPage = lazy(() => import('@/pages/Auth/Unauthorized'));

const AuthRoutes = [
  { path: config.routes.auth.login, element: <Login /> },
  { path: config.routes.auth.signUp, element: <SignUp /> },
  { path: config.routes.auth.logout, element: <Logout /> },
  { path: config.routes.auth.validateEmail, element: <ValidateEmail /> },
  { path: config.routes.auth.forgotPassword, element: <ForgetPassword /> },
  { path: config.routes.auth.unauthorized, element: <UnauthorizedPage /> },
];

export default AuthRoutes;
