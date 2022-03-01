import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {},
  reducers: {
    initApp(state, action) {},
  }
});

export const { initApp } = appSlice.actions;

export default appSlice.reducer;