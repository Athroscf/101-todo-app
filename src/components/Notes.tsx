import { IonHeader, IonList, IonModal, IonTitle, IonToolbar } from '@ionic/react';
import './Notes.css';

interface iNoteProps {
  name: string;
}

const Notes: React.FC<iNoteProps> = ({ name }) => {
  return (
    <IonList>

    </IonList>
  );
};

export default Notes;
