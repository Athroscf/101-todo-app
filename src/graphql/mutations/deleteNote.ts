import gql from 'graphql-tag';
import { print } from 'graphql';

export const deleteNote = print(gql`
  mutation deleteNote($id: ID = "") {
    deleteNotes(input: {id: $id}) {
      id
    }
  }
`);