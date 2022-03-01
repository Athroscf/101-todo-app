import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Notes from '../components/Notes';
import Todos from '../components/Todos';
import './Page.css';
import { RootState } from '../redux/store';
import { openModal } from '../redux/appSlice';

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
        { name === "todos" && <Notes name={name} /> }
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
  const [ title, setTitle ] = useState<any>();
  const [ description, setDescription ] = useState<any>();

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
            <IonButton>
              Add
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonInput
              placeholder='Title'
              value={title}
              onIonChange={(e) => setTitle(e.detail.value)}/>
          </IonToolbar>
        </IonHeader>
        <IonTextarea
          autoGrow
          autofocus
          value={description}
          onIonChange={(e) => setDescription(e.detail.value)}/>
      </IonContent>
    </IonModal>
  );
};