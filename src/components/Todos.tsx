import {
  IonCheckbox,
  IonIcon,
  IonItem,
  IonLabel,
  IonList
} from "@ionic/react";
import {
  alert
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { Auth } from 'aws-amplify';
import { useState } from "react";

import * as APIt from '../API';
import './Todos.css'

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
  const [ user, setUser ] = useState<string>('');

  Auth.currentAuthenticatedUser()
    .then(user => setUser(user.username));

  return (
    <IonList>
      { todos?.listTasks?.items.map((todo, index) => {
        return (
          <div key={todo?.id}>
            { todo?.user === user &&
              <IonItem>
                <IonCheckbox slot="start" checked={todo?.checked}/>
                <IonLabel>{todo?.task}</IonLabel>
                { todo?.important ? <IonIcon icon={alert} color='danger'/> : null }
              </IonItem> }
          </div>
        )
      })}
    </IonList>
  )
};

export default Todos;