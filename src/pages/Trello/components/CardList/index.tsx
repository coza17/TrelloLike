import store from "@/models/store";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCard from "../AddCard";
import Card from "../Card";
import styles from "./index.module.less";
export default (props: cardList) => {
  const { id, title, cards, index } = props;
  const {state,setState}=store()
  const handleDelete=()=>{
    const newState=JSON.parse(JSON.stringify(state))
    newState.forEach((listItem:any,index:number)=>{
      if(listItem.id===id){
        newState.splice(index,1)
      }
    })
    setState(newState)
  }
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(dragProvided) => {
        return (
          <div
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            className="list"
          >
            <Droppable droppableId={id.toString()} type="card">
              {(provided) => {
                return (
                  <div className={`${styles.body}`}>
                    <div className={styles.content}>
                      <div className={styles.title} {...dragProvided.dragHandleProps}>{title}</div>
                      <div onClick={handleDelete}>删除</div>
                      <div
                        className={styles.center}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {cards.map((item, index) => {
                          return (
                            <Card
                              {...item}
                              key={item.id}
                              index={index}
                              id={item.id}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                      <AddCard listId={id}/>
                      {/* <div className={styles.add}>add</div> */}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};

type cardList = {
  id: number;
  title: string;
  index: number;
  cards: {
    id: string;
    text: string;
  }[];
};
