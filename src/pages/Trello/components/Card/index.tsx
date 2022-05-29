import modalStore from "@/models/modalStore";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType) => {
  const { id, text = "eeee", index=1 } = props;
  const {setModalState}=modalStore()
  const handleClick=()=>{
    setModalState({
      show:true,
      card:props
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
              {id}+{text}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

type cardType = {
  id: string;
  text: string;
  index: number;
};
