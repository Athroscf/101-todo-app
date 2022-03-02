import {
  IonBadge,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {
  alert
} from 'ionicons/icons';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as APIt from '../API';
import './Notes.css';
import { RootState } from '../redux/store';

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

  return (
    <IonList>
      { notes?.listNotes?.items.map((note, index) => (
        <IonItemSliding key={index}>
          <IonItemOptions>
            <IonItemOption color="danger" slot="start">
              Delete
            </IonItemOption>
            <IonItem>
              <IonBadge>{note?.title}</IonBadge>
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

export default Notes;
