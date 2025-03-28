import { AUTH } from '../api/auth';
import { USERS } from '../api/users';
import { ADMIN } from './admin';
import { MEMBERS } from './member';
import { MEMBERSHIP } from './membership';

export const API_ENDPOINTS = {
  auth: AUTH,
  users: USERS,
  members: MEMBERS,
  admin: ADMIN,
  membership: MEMBERSHIP,
};
