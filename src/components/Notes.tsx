import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonList,
} from '@ionic/react';
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as APIt from '../API';
import './Notes.css';

/**
 * Notes component description.
 * Path: /page/notes
 *
 * This component renders a list of notes created by the current user.
 */

/**
 * Parameters Notes component has to recieve:
 * name: string (this is the name of the page. In this case is notes)
 * notes: APIt.ListNotesQuery | undefined (list of notes. Type got from Amplify's generated shcema types.)
 */

interface iNoteProps {
  name: string;
  notes: APIt.ListNotesQuery | undefined
}

const Notes: React.FC<iNoteProps> = ({ name, notes }) => {
  const dispatch = useDispatch();
  const [ user, setUser ] = useState<string>('');

  Auth.currentAuthenticatedUser()
    .then(user => setUser(user.username));

  return (
    <IonList>
      { notes?.listNotes?.items.map((note, index) => {
        return (
          <div key={note?.id}>
            { note?.user === user &&
              <IonItem>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{note?.title}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonCardSubtitle>{note?.description?.slice(0, 20)}...</IonCardSubtitle>
                  </IonCardContent>
                </IonCard>
              </IonItem> }
          </div>
        )
      })}
    </IonList>
  )
};

export default Notes;
