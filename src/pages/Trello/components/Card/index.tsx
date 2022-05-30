import modalStore from "@/models/modalStore";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType) => {
  const { id, text = "eeee", index=1 } = props;
  const {setModalState}=modalStore()
  const handleClick=()=>{
    setModalState({
      show:true,
      // card:props
      card:{
        id: "card-1111111",
        text: "11111",
        description:"描述1111",
        dates:"11111",
        checkId:11111,
        checkList:[
          {
            id:"card-0-111111",
            itemText:'清单11111',
            // date:'',
            isCheck:false
          }
        ],
        activity:[
          {
            comment:"评论1111",
            time:"1111",
            updateTime:""
          },
          {
            comment:"评论21111",
            time:"1111",
            updateTime:""
          }
        ]

      }
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
  id: string;
  text: string;
  index: number;
};
