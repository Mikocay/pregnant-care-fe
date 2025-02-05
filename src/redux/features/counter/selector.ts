import { RootState } from '@/redux/store/store';

export const selectCount = (state: RootState) => state.counter.value;
