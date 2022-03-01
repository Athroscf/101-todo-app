import gql from 'graphql-tag';
import { print} from 'graphql';

export const listNotes = print(gql`
  query listNotes {
    listNotes {
      items {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`);