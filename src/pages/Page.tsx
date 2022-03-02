import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonPopover,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar
} from '@ionic/react';
import {
  add
} from 'ionicons/icons';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Notes from '../components/Notes';
import Todos from '../components/Todos';
import './Page.css';
import { RootState } from '../redux/store';
import { createNote, createTodo, openModal } from '../redux/appSlice';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  const { isModalOpen } = useSelector((state: RootState) => state)
  const dispatch = useDispatch();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        { name === "notes" && <Notes name={name} /> }
        { name === "todos" && <Todos name={name} /> }
      </IonContent>
      <AddModal
        isModalOpen={isModalOpen}
        nameParam={name}/>
      <IonFab horizontal='end' vertical='bottom'>
        <IonFabButton onClick={() => dispatch(openModal(true))}>
          <IonIcon icon={add}/>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Page;

interface iAddModalProps {
  isModalOpen: boolean
  nameParam: string
};

const AddModal: React.FC<iAddModalProps> = ({ isModalOpen, nameParam }) => {
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');
  const [ task, setTask ] = useState<string>('');

  const handleAdd = () => {
    if (nameParam === 'notes') {
      dispatch(createNote({
        title: title,
        description: description
      }));
    } else {
      dispatch(createTodo({
        task: task
      }));
    };
  };

  return (
    <IonModal isOpen={isModalOpen}>
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
        <AddNoteModalContentProps
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}/>}
      { nameParam === 'todos' &&
        <AddTodoModalContentProps
          task={task}
          setTask={setTask}/>}
    </IonModal>
  );
};

interface iAddNoteModalContentProps {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
};

const AddNoteModalContentProps: React.FC<iAddNoteModalContentProps> = ({ title, setTitle, description, setDescription }) => {
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

interface iAddTodoModalContentProps {
  task: string
  setTask: (task: string) => void
}

const AddTodoModalContentProps: React.FC<iAddTodoModalContentProps> = ({ task, setTask }) => {
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
        <IonToggle slot='end'/>
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