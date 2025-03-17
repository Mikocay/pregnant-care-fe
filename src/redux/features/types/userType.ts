interface Membership {
  dueDate: string | null;
  plan: string;
}

export interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  avatarUrl: string | null;
  bloodType: string;
  nationality: string;
  membership: Membership;
  transactions: any[];
  fetuses: any[];
}

export interface UserState {
  //For Fetching
  isPending: boolean,
  isError: boolean,

  //For Create
  isCreating: boolean,
  isCreateSuccess: boolean,

  //For Edit
  isEditing: boolean,
  isEditSuccess: boolean,

  //For Delete
  isDeleting: boolean,
  isDeleteSuccess: boolean,

  errors: boolean;
  message: string;
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}