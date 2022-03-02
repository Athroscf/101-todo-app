import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    error: {},
    isModalOpen: false,
    loading: false,
    notes: [],
    todos: []
  },
  reducers: {
    initApp(state, action) {},
    createNote(state, action) {},
    createTodo(state, action) {},
    getError(state, action) {
      state.error = action.payload
    },
    getNotes(state, action) {
      state.notes = action.payload
    },
    getTodos(state, action) {
      state.todos = action.payload
    },
    isLoading(state, action) {
      state.loading = action.payload
    },
    openModal(state, action) {
      state.isModalOpen = action.payload;
    }
  }
});

export const {
  initApp,
  createNote,
  createTodo,
  getError,
  getNotes,
  getTodos,
  isLoading,
  openModal
} = appSlice.actions;

export default appSlice.reducer;