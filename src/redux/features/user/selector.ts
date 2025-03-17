import { RootState } from '@/redux/store/store';

export const selectUser = (state: RootState) => state.users;