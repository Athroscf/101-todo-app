import {
  IonButton,
  IonCheckbox,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  useIonActionSheet
} from "@ionic/react";
import {
  alert,
  trash
} from 'ionicons/icons';
import { useDispatch } from "react-redux";
import { Auth } from 'aws-amplify';
import { useState } from "react";

import * as APIt from '../API';
import { deleteTodo } from '../redux/appSlice';
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
  getTodos: () => void
}

const Todos: React.FC<iTodosProps> = ({ name, todos, getTodos }) => {
  const [ user, setUser ] = useState<string>('');
  const [ presentDeleteConfirmation, dismissDeleteConfirmation ] = useIonActionSheet();
  const [ edit, setEdit ] = useState<boolean>(false);
  const dispatch = useDispatch();

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
                <IonButton
                  fill="clear"
                  onClick={(e) => {
                    presentDeleteConfirmation({
                      buttons: [
                        {
                          text: "OK",
                          role: "destructive",
                          icon: trash,
                          handler: () => {
                            dispatch(deleteTodo(todo?.id))
                            getTodos()
                          }
                        }
                      ]
                    })
                  }}>
                  <IonIcon icon={trash}/>
                </IonButton>
              </IonItem> }
          </div>
        )
      })}
    </IonList>
  );
};

export default Todos;