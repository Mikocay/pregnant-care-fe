import { UserState } from '../types/userType';

export const initialState: UserState = {
  //For Fetching
  isPending: false,
  isError: false,

  //For Create
  isCreating: false,
  isCreateSuccess: false,

  //For Edit
  isEditing: false,
  isEditSuccess: false,

  //For Delete
  isDeleting: false,
  isDeleteSuccess: false,

  data: [],
  errors: false,
  message: "",

  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
};
