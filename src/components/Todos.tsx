import {
  IonBadge,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList
} from "@ionic/react";
import {
  alert
} from 'ionicons/icons';
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { useEffect, useState } from "react";

import * as APIt from '../API';

/**
 * Notes component description.
 * Path: /page/todos
 *
 * This component renders a list of to do tasks created by the current user.
 */

/**
 * Parameters Notes component has to recieve:
 * name: string (this is the name of the page. In this case is todos)
 * todos: APIt.ListTasksQuery | undefined (list of todos. Type got from Amplify's generated shcema types.)
 */

interface iTodosProps {
  name: string;
  todos: APIt.ListTasksQuery | undefined
}

const Todos: React.FC<iTodosProps> = ({ name, todos }) => {
  const dispatch = useDispatch();

  return (
    <IonList>
      { todos?.listTasks?.items.map((todo, index) => (
        <IonItemSliding key={index}>
          <IonItemOptions>
            <IonItemOption color="danger" slot="start">
              Delete
            </IonItemOption>
            <IonItem>
              <IonBadge>{todo?.task}</IonBadge>
              { todo?.important ? <IonIcon icon={alert}  color="danger"/> : null }
            </IonItem>
            <IonItemOption color="danger" slot="end">
              Edit
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      ))}
    </IonList>
  )
};

export default Todos;