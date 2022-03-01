import gql from 'graphql-tag';
import { print } from 'graphql';

export const updateNote = print(gql`
  mutation updateNote(
    $id: ID = "",
    $title: String = "",
    $description: String = ""
    ) {
    updateNotes(input: {
      id: $id,
      title: $title,
      description: $description
    }) {
      id
    }
  }
`);