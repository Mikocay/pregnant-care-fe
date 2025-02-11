// config/roles.ts
import { Role, Permission } from './type';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.CREATE_USER,
    Permission.EDIT_USER,
    Permission.DELETE_USER,
    Permission.VIEW_REPORTS,
    Permission.MANAGE_TEAM,
    Permission.VIEW_DASHBOARD,
  ],
  [Role.MANAGER]: [
    Permission.VIEW_REPORTS,
    Permission.MANAGE_TEAM,
    Permission.VIEW_DASHBOARD,
  ],
  [Role.USER]: [Permission.VIEW_DASHBOARD],
};

export const hasPermission = (
  userRole: Role,
  permission: Permission,
): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) ?? false;
};
