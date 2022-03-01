import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    initApp(state, action) {},
    openModal(state, action) {
      state.isModalOpen = action.payload;
    }
  }
});

export const {
  initApp,
  openModal
} = appSlice.actions;

export default appSlice.reducer;