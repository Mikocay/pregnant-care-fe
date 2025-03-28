import { RootState } from '@/redux/store/store';

export const selectRegistrationStatus = (state: RootState) =>
  state.auth.registrationStatus;
