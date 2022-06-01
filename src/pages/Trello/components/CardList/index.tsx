import store from "@/models/store";
import { cardListType } from "@/models/types";
import { DashOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Popconfirm } from "antd";
import { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCard from "../AddCard";
import Card from "../Card";
import styles from "./index.module.less";
export default (props: cardListType) => {
  const { id, title, cards, index=0 } = props;
  const { state, setState } = store();
  const handleDelete = () => {
    //删除列表
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
              title="是否删除该列表?"
              onConfirm={handleDelete}
              okText="是"
              cancelText="否"
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
          <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
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
                        <Dropdown overlay={menu}>
                          <div className={styles.delete}>
                            <DashOutlined />
                          </div>
                        </Dropdown>
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
