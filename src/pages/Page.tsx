import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';
import { useParams } from 'react-router';

import Notes from '../components/Notes';
import Todos from '../components/Todos';
import './Page.css';

const Page: React.FC = () => {
  const { name } = useParams<{ name: string; }>();

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

      <IonFab horizontal='end' vertical='bottom'>
        <IonFabButton>
          <IonIcon icon={add}/>
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Page;
