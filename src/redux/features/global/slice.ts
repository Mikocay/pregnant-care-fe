import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './state';

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

export const {} = globalSlice.actions;
export default globalSlice.reducer;
