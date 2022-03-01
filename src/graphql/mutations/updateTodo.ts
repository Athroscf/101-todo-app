import gql from 'graphql-tag';
import { print } from 'graphql';

export const updateTodo = print(gql`
  mutation updateTask(
    $id: ID = "",
    $title: String = ""
    ) {
    updateTask(input: {
      id: $id,
      title: $title,
    }) {
      id
    }
  }
`);