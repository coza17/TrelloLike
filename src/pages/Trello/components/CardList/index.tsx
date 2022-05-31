import store from "@/models/store";
import { DashOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Popconfirm } from "antd";
import { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCard from "../AddCard";
import Card from "../Card";
import styles from "./index.module.less";
export default (props: cardList) => {
  const { id, title, cards, index } = props;
  const { state, setState } = store();
  const handleDelete = () => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: any, index: number) => {
      if (listItem.id === id) {
        newState.splice(index, 1);
      }
    });
    setState(newState);
    message.success("删除成功");
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
            >
              <div className={styles.delete}>删除</div>
            </Popconfirm>
          ),
        },
      ]}
    />
  );
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(dragProvided) => {
        return (
          <div
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            // className="list"
          >
            <Droppable droppableId={id.toString()} type="card">
              {(provided) => {
                return (
                  <div className={styles.body}>
                    <div className={styles.content}>
                      <div
                        {...dragProvided.dragHandleProps}
                        className={styles.header}
                      >
                        <div className={styles.title}>{title}</div>
                          <div className={styles.delete}>
                            <Dropdown overlay={menu}>
                              <DashOutlined />
                            </Dropdown>
                          </div>
                      </div>
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
                        <AddCard listId={id} />
                      </div>
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
