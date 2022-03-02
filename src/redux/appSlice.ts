import { createSlice } from '@reduxjs/toolkit';
// import { Task, Notes } from '../API'

// interface iState {
//   error: {}
//   isModalOpen: boolean
//   loading: boolean
//   notes: [Notes]
//   todos: [Task]
// }

// const initialState: iState = {
//   error: {},
//   isModalOpen: false,
//   loading: false,
//   notes: [],
//   todos: []
// };

const appSlice = createSlice({
  name: 'app',
  initialState: {
    fetched: false,
    error: {},
    isModalOpen: false,
    loading: false,
    notes: [],
    todos: [],
    toastMessage: '',
    showToast: false
  },
  reducers: {
    initApp(state, action) {},
    createNote(state, action) {},
    createTodo(state, action) {},
    deleteNote(state, action) {},
    deleteTodo(state, action) {},
    getError(state, action) {
      state.error = action.payload;
    },
    getNotes(state, action) {
      state.notes = action.payload;
    },
    getTodos(state, action) {
      state.todos = action.payload;
    },
    isLoading(state, action) {
      state.loading = action.payload;
    },
    openModal(state, action) {
      state.isModalOpen = action.payload;
    },
    setToastMessage(state, action) {
      state.toastMessage = action.payload;
    },
    showToast(state, action) {
      state.showToast = !state.showToast
    },
    updateNote(state, action) {},
    updateTodo(state, action) {},
  }
});

export const {
  initApp,
  createNote,
  createTodo,
  deleteNote,
  deleteTodo,
  getError,
  getNotes,
  getTodos,
  isLoading,
  openModal,
  setToastMessage,
  showToast,
  updateNote,
  updateTodo
} = appSlice.actions;

export default appSlice.reducer;