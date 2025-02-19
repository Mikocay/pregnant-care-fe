import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

const fetusSlice = createSlice({
  name: 'fetus',
  initialState,
  reducers: {
    setFetusStandards: (state) => {
      state.fetusStandardsNameAndUnit = [];
    },
  },
});

export const {
  setFetusStandards,
} = fetusSlice.actions;
export default fetusSlice.reducer;
