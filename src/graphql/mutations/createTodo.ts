import gql from 'graphql-tag';
import { print } from 'graphql';

export const createTodo = print(gql`
  mutation createTask($task: String = "") {
    createTask(input: {task: $task}) {
      id
    }
  }
`);