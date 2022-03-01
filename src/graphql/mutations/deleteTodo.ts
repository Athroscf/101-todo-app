import gql from 'graphql-tag';
import { print } from 'graphql';

export const deleteTodo = print(gql`
  mutation deleteTask($id: ID = "") {
    deleteTask(input: {id: $id}) {
      id
    }
  }
`);