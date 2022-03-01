import gql from 'graphql-tag';
import { print} from 'graphql';

export const listTodos = print(gql`
  query listTasks {
    listTasks {
      items {
        id
        task
        createdAt
        updatedAt
      }
    }
  }
`);