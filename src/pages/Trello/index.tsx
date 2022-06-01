import store from "@/models/store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./components/AddList";
import CardList from "./components/CardList";
import Modal from "./components/Modal";
import styles from "./index.module.less";
import useDragEnd from "./useDragEnd";
export default () => {
  const { state } = store();
  const {handleDragEnd}=useDragEnd();
  return (
    <>
      <div className={styles.all}>
        <div className={styles.header}>trello like</div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="list">
            {(provided) => {
              return (
                <>
                  <div
                    className={styles.body}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {state.map((item, index) => {
                      return <CardList {...item} key={item.id} index={index} />;
                    })}
                    {provided.placeholder}
                    <AddList />
                  </div>
                </>
              );
            }}
          </Droppable>
          <Modal />
        </DragDropContext>
      </div>
    </>
  );
};
