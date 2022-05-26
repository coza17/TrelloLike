import store from "@/models/store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import CardList from "./components/CardList";
import styles from "./index.module.less";
export default () => {
  const { state } = store();
  return (
    <DragDropContext onDragEnd={(result) => console.log(result)}>
      <div className={styles.body}>
        {state.map((item) => {
          return <CardList {...item} key={item.id}/>;
        })}
      </div>
    </DragDropContext>
  );
};
