import { UserToken } from '@/types';
import { jwtDecode } from 'jwt-decode';

//* Check if token is expired
export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode<UserToken>(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
