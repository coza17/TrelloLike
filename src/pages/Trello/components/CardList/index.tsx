import { Droppable } from "react-beautiful-dnd";
import Card from "../Card";
import styles from "./index.module.less";
export default (props: cardList) => {
  const { id, title, cards } = props;
  return (
    <Droppable droppableId={id.toString()}>
      {(provided) => {
        return (
          <div
            className={styles.body}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className={styles.title}>{title}</div>
            {cards.map((item, index) => {
              return <Card {...item} key={item.id} index={index} id={item.id}/>;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

type cardList = {
  id: number;
  title: string;
  cards: {
    id: number;
    text: string;
  }[];
};
