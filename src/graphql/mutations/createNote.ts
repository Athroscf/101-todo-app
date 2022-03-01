import gql from 'graphql-tag';
import { print } from 'graphql';

export const createNote = print(gql`
  mutation createNote(
    $description: String = "",
    $title: String = ""
  ) {
    createNotes(input: {
      title: $title,
      description: $description
    }) {
      id
    }
  }
`);