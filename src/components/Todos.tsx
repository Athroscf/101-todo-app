import { IonList } from "@ionic/react";

interface iTodosProps {
  name: string;
}


const Todos: React.FC<iTodosProps> = ({ name }) => {
  return (
    <IonList>

    </IonList>
  )
};

export default Todos;