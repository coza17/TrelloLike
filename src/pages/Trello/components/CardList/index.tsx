import { Container, Draggable } from "react-smooth-dnd";
import Card from "../Card";
import styles from "./index.module.less";
export default (props: cardList) => {
  const { id, title, cards } = props;
  return (
    <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        {cards.map((item) => {
          return (
            <Card {...item} key={item.id} />
          )
        })}
    </div>
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
