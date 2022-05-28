import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType) => {
  const { id = 0, text = "eeee", index=1 } = props;
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.body}
          >
            <div>
              {id}+{text}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

type cardType = {
  id?: string;
  text?: string;
  index: number;
};
