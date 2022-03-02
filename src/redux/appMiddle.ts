import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import * as APIt from '../API';

import {
  getError,
  getNotes,
  getTodos,
  isLoading,
  initApp,
  openModal,
  setToastMessage,
  showToast
} from './appSlice';
import { createNotes, deleteNotes, updateNotes } from '../graphql/mutations';
import { createTask, deleteTask, updateTask } from '../graphql/mutations';
import { listNotes } from '../graphql/queries';
import { listTasks } from '../graphql/queries';

export const appMiddle = (store: any) => (next: any) => async (action: any) => {
  switch (action.type) {
    case 'app/initApp':
      const notesQuery = (await API.graphql(
        graphqlOperation(listNotes)
      )) as GraphQLResult<APIt.ListNotesQuery>
      if (notesQuery?.data) {
        store.dispatch(getNotes(notesQuery?.data));
      } else {
        store.dispatch(getError(notesQuery?.errors));
      };

      const todosQuery = (await API.graphql(
        graphqlOperation(listTasks)
      )) as GraphQLResult<APIt.ListTasksQuery>
      if (todosQuery?.data) {
        store.dispatch(getTodos(todosQuery?.data?.listTasks));
      } else {
        store.dispatch(getError(todosQuery?.errors));
      };
      break;

    case 'app/createNote':
      store.dispatch(isLoading(true));
      try {
        (await API.graphql(
          graphqlOperation(createNotes, {
            input: action.payload
          }
        )))
        store.dispatch(isLoading(false));
        store.dispatch(openModal(false));
        store.dispatch(setToastMessage('Item added!'));
        store.dispatch(showToast(true));
      } catch (error) {}
      break;

    case 'app/createTodo':
      store.dispatch(isLoading(true));
      try {
        (await API.graphql(
          graphqlOperation(createTask, {
            input: action.payload
          })
        ))
        store.dispatch(isLoading(false));
        store.dispatch(openModal(false));
        store.dispatch(setToastMessage('Item added!'));
        store.dispatch(showToast(true));
      } catch (error) {}
      break;
    case 'app/deleteNote':
      store.dispatch(isLoading(true));
      try {
        (await API.graphql(
          graphqlOperation(deleteNotes, {
            input: action.payload
          })
        ))
        store.dispatch(isLoading(false));
        store.dispatch(setToastMessage('Item deleted!'));
        store.dispatch(showToast(true));
      } catch (error) {}
      break;
    case 'app/deleteTodo':
      store.dispatch(isLoading(true));
      try {
        (await API.graphql(
          graphqlOperation(deleteTask, {
            input: action.payload
          })
        ))
        store.dispatch(isLoading(false));
        store.dispatch(setToastMessage('Item deleted!'));
        store.dispatch(showToast(true));
      } catch (error) {}
      break;
    case 'app/updateNote':
      store.dispatch(isLoading(true));
      try {
        (await API.graphql(
          graphqlOperation(updateNotes, {
            input: action.payload
          })
        ))
        store.dispatch(isLoading(false));
        store.dispatch(setToastMessage('Item edited!'));
        store.dispatch(showToast(true));
      } catch (error) {}
      break;
    case 'app/updateTask':
      store.dispatch(isLoading(true));
      try {
        (await API.graphql(
          graphqlOperation(updateTask, {
            input: action.payload
          })
        ))
        store.dispatch(isLoading(false));
        store.dispatch(setToastMessage('Item edited!'));
        store.dispatch(showToast(true));
      } catch (error) {}
      break;

    default:
      break;
  }
  return next(action);
};