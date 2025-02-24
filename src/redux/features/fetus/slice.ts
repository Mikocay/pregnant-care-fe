import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';
import { FetusStandard } from '@/types';

const fetusSlice = createSlice({
  name: 'fetus',
  initialState,
  reducers: {
    fetchFetusStandards: () => {
    },
    setFetusStandards: (state, actions: PayloadAction<FetusStandard[]>) => {
      state.fetusStandardsNameAndUnit = actions.payload;
    },
  },
});

export const {
  fetchFetusStandards,
  setFetusStandards,
} = fetusSlice.actions;
export default fetusSlice.reducer;
