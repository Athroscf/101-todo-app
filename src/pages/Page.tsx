import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import {
  add, chevronDownCircleOutline
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';

import Notes from '../components/Notes';
import Todos from '../components/Todos';
import * as APIt from '../API';
import './Page.css';
import { RootState } from '../redux/store';
import { createNote, createTodo, isLoading, openModal } from '../redux/appSlice';
import { listNotes, listTasks } from '../graphql/queries';

/**
 * Page component description.
 * This component handles renders both Notes and Todos and fetches its data.
 */

const Page: React.FC = () => {
  /**
   * name: path parameter
   * todos: list of todos
   * notes: list of notes
   */
  const { name } = useParams<{ name: string; }>();
  const { isModalOpen, loading, toastMessage, showToast } = useSelector((state: RootState) => state)
  const [ todos, setTodos ] = useState({} as APIt.ListTasksQuery | undefined);
  const [ notes, setNotes ] = useState({} as APIt.ListNotesQuery | undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos();
    getNotes()
  }, [name]);

  /**
   * getTodos function fetches a list of all to do tasks created by the user.
   */

  const getTodos = async () => {
    dispatch(isLoading(true));
    try {
      const todosList = (await API.graphql(
        graphqlOperation(listTasks)
      )) as GraphQLResult<APIt.ListTasksQuery>;
      setTodos(todosList?.data);
      dispatch(isLoading(false));
    } catch (error) {}
  };

  /**
   * getNotes function fetches a list of all notes created by the user.
   */

  const getNotes = async () => {
    dispatch(isLoading(true));
    try {
      const notesList = (await API.graphql(
        graphqlOperation(listNotes)
      )) as GraphQLResult<APIt.ListNotesQuery>;
      setNotes(notesList?.data)
      dispatch(isLoading(false));
    } catch (error) {}
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
        <IonProgressBar
          type='indeterminate'
          hidden={!loading}/>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        { name === 'notes' && <Notes name={name} notes={notes}/> }
        { name === 'todos' && <Todos name={name} todos={todos}/> }
      </IonContent>
      <AddModal
        isModalOpen={isModalOpen}
        nameParam={name}
        onDismiss={() => {
          getNotes();
          getTodos();
        }}/>
      <IonFab horizontal='end' vertical='bottom'>
        <IonFabButton onClick={() => dispatch(openModal(true))}>
          <IonIcon icon={add}/>
        </IonFabButton>
      </IonFab>
      <IonToast message={toastMessage} isOpen={showToast} duration={2000}/>
    </IonPage>
  );
};

export default Page;

/**
 * Description of AddModal component.
 * This is a modal that handles the creation of a note or a to do task.
 */

/**
 * Parameters AddModal component has to recieve:
 * isModalOpen: boolean (handles when the modal will show up.)
 * nameParam: string (title of the modal to know what are we adding. It's also used for adding dynamically.)
 */
interface iAddModalProps {
  isModalOpen: boolean
  nameParam: string
  onDismiss: () => void
};

const AddModal: React.FC<iAddModalProps> = ({ isModalOpen, nameParam, onDismiss }) => {
  /**
   * title: string (Note title that will be passed for submitting.)
   * description: string (Note description that will be passed for submitting.)
   * task: string (To do task title that will be passed for submitting.)
   * important: boolean (To do task importance that will be passed for submitting.)
   */
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');
  const [ task, setTask ] = useState<string>('');
  const [ important, setImportant ] = useState<boolean>(false);
  const [ user, setUser ] = useState<string>('');

  Auth.currentAuthenticatedUser()
    .then(user => setUser(user.username));

  /**
   * handleAdd function dispatches a redux action and passes input data for adding the item.
   */

  const handleAdd = () => {
    if (nameParam === 'notes') {
      dispatch(createNote({
        title: title,
        description: description,
        user: user
      }));
    } else {
      dispatch(createTodo({
        task: task,
        important: important,
        checked: false,
        user: user
      }));
    };
  };

  return (
    <IonModal isOpen={isModalOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Add {nameParam}
          </IonTitle>
          <IonButtons slot='start'>
            <IonButton onClick={() => dispatch(openModal(false))}>
              Close
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton onClick={() => handleAdd()}>
              Add
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      { nameParam === 'notes' &&
        <AddNoteModalContent
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}/>}
      { nameParam === 'todos' &&
        <AddTodoModalContent
          task={task}
          setTask={setTask}
          important={important}
          setImportant={setImportant}/>}
    </IonModal>
  );
};

/**
 * AddNoteModalContent description.
 * AddNoteModalContent contains the fields for the Notes item that will be created.
 * 
 * Parameters AddNoteModalContent component has to recieve:
 * title: string (title field.)
 * setTitle: void function (setTitle function in useState)
 * description: string (description field.)
 * setDescription: void function (setDescription function in useState)
 */

interface iAddNoteModalContentProps {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
};

const AddNoteModalContent: React.FC<iAddNoteModalContentProps> = ({ title, setTitle, description, setDescription }) => {
  const [ popupOpen, setPopupOpen ] = useState<boolean>(false);

  return (
    <IonContent>
      <IonHeader >
        <IonToolbar>
          <IonInput
            placeholder='Title'
            value={title}
            onIonChange={e => setTitle(e.detail.value!)}/>
        </IonToolbar>
      </IonHeader>
      <IonItem lines='none'>
        <IonTextarea
          autoGrow
          autofocus
          value={description}
          onIonChange={e => setDescription(e.detail.value!)}/>
      </IonItem>
    </IonContent>
  );
};

/**
 * AddTodoModalContent description.
 * AddTodoModalContent contains the fields for the Notes item that will be created.
 *
 * Parameters AddTodoModalContent component has to recieve:
 * task: string (task field.)
 * setTask: void function (setTask function in useState)
 * important: boolean (important field.)
 * setImportant: void function (setImportant function in useState)
 */

interface iAddTodoModalContentProps {
  task: string
  setTask: (task: string) => void
  important: boolean
  setImportant: (important: boolean) => void
};

const AddTodoModalContent: React.FC<iAddTodoModalContentProps> = ({ task, setTask, important, setImportant }) => {
  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonInput
            placeholder='Todo'
            value={task}
            onIonChange={e => setTask(e.detail.value!)}/>
        </IonToolbar>
      </IonHeader>
      <IonItemDivider />
      <IonItem>
        <IonLabel position='fixed'>Important</IonLabel>
        <IonToggle slot='end' onIonChange={e => setImportant(e.detail.checked)}/>
      </IonItem>
    </IonContent>
  );
};

// const categories = [
//   {
//     category: 'Travel',
//     color: '#7e5d4e'
//   },
//   {
//     category: 'Personal',
//     color: '#009788'
//   },
//   {
//     category: 'Life',
//     color: '#4baf4f'
//   },
//   {
//     category: 'Work',
//     color: '#f44437'
//   },
//   {
//     category: 'Social',
//     color: '#3f51b5'
//   },
// ];

// const colors = [
//   {
//     name: 'Yellow',
//     color: '#ffeb3c'
//   },
//   {
//     name: 'Orange',
//     color: '#ff9900'
//   },
//   {
//     name: 'Red',
//     color: '#f44437'
//   },
//   {
//     name: 'Fucsia',
//     color: '#ea1e63'
//   },
//   {
//     name: 'Purple',
//     color: '#9c26b0'
//   },
//   {
//     name: 'Blue',
//     color: '#3f51b5'
//   },
//   {
//     name: 'Green',
//     color: '#4baf4f'
//   },
//   {
//     name: 'Brown',
//     color: '#7e5d4e'
//   }
// ];