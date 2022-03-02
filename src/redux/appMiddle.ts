import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import * as APIt from '../API';

import {
  getError,
  getNotes,
  getTodos,
  isLoading,
  initApp
} from './appSlice';
import { createNotes } from '../graphql/mutations';
import { createTask } from '../graphql/mutations';
import { listNotes } from '../graphql/queries';
import { listTasks } from '../graphql/queries';

export const appMiddle = (store: any) => (next: any) => async (action: any) => {
  switch (action.type) {
    case '@@INIT':
      const notesQuery = (await API.graphql(
        graphqlOperation(listNotes)
      )) as GraphQLResult<APIt.ListNotesQuery>
      if (notesQuery?.data) {
        store.dispatch(getNotes(notesQuery?.data?.listNotes));
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
      const inputData = action.payload;
      console.log(inputData)
      const createNotesMutation = (await API.graphql(
        graphqlOperation(createNotes, {
          input: action.payload
        }
      ))) as GraphQLResult<APIt.CreateNotesMutation>
      console.log(createNotesMutation);
      if (createNotesMutation?.data) {
        store.dispatch(isLoading(false));
        store.dispatch(initApp);
      } else {
        store.dispatch(getError(createNotesMutation?.errors));
      };
      break;

    case 'app/createTodo':
      store.dispatch(isLoading(true));
      const createTodosMutation = (await API.graphql(
        graphqlOperation(createTask, {
          input: action.payload
        })
      )) as GraphQLResult<APIt.CreateNotesMutation>
      if (createTodosMutation?.data) {
        store.dispatch(isLoading(false));
        store.dispatch(initApp);
      } else {
        store.dispatch(getError(createTodosMutation?.errors));
      };
      break;

    default:
      break;
  }
  return next(action);
};