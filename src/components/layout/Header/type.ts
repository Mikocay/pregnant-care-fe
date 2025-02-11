// types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export enum Permission {
  CREATE_USER = 'CREATE_USER',
  EDIT_USER = 'EDIT_USER',
  DELETE_USER = 'DELETE_USER',
  VIEW_REPORTS = 'VIEW_REPORTS',
  MANAGE_TEAM = 'MANAGE_TEAM',
  VIEW_DASHBOARD = 'VIEW_DASHBOARD',
}

export interface MenuItem {
  label: string;
  path: string;
  icon?: React.ComponentType;
  children?: MenuItem[];
}

export interface MenuConfig {
  [key in Role]: MenuItem[];
}
