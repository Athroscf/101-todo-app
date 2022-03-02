import {
  IonBadge,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import {
  checkmarkCircle,
  checkmarkCircleOutline,
  clipboard,
  clipboardOutline,
  logOutOutline
} from 'ionicons/icons';
import { Auth } from 'aws-amplify';

import './Menu.css';
import { useEffect, useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Notes',
    url: '/page/notes',
    iosIcon: clipboard,
    mdIcon: clipboardOutline
  },
  {
    title: 'To-dos',
    url: '/page/todos',
    iosIcon: checkmarkCircle,
    mdIcon: checkmarkCircleOutline
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [ user, setUser ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setUser(user.username);
        setEmail(user.attributes.email);
      });
  }, [])

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>{user}</IonListHeader>
          <IonNote>{email}</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonList id="labels-list">
            <IonItem lines="none" button onClick={() => Auth.signOut()}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Log Out</IonLabel>
            </IonItem>
        </IonList>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
