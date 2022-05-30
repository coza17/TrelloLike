import modalStore from "@/models/modalStore";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType) => {
  const { id, text = "eeee", index=0 } = props;
  const {setModalState}=modalStore()
  const handleClick=()=>{
    setModalState({
      show:true,
      cardId:id
    })
  }
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.body}
            onClick={handleClick}
          >
            <div>
              {text}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

type cardType = {
  index?: number;
  id: string;
  text: string;
};
