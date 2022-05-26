import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType) => {
  const { id = 0, text = "eeee", index } = props;
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles.body}>
              {id}+{text}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

type cardType = {
  id?: number;
  text?: string;
  index: number;
};
