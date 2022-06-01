import store from "@/models/store";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./components/AddList";
import CardList from "./components/CardList";
import Modal from "./components/Modal";
import styles from "./index.module.less";
export default () => {
  const { state, setState } = store();
  const handleDragEnd = (result: any) => {
    //拖拽
    console.log(result);
    const { source, destination } = result;
    if (!destination) {
      return;
    } else if (result.type === "card") {
      //卡片拖拽
      if (source.droppableId === destination.droppableId) {
        //同列表
        const newList = JSON.parse(JSON.stringify(state));
        newList.forEach((listItem: any) => {
          if (listItem.id.toString() === destination.droppableId) {
            const item = listItem.cards.splice(source.index, 1);
            listItem.cards.splice(destination.index, 0, item[0]);
          }
        });
        setState(newList);
      } else if (source.droppableId !== destination.droppableId) {
        //跨列表
        const newList = JSON.parse(JSON.stringify(state));
        newList.forEach((listItem: any) => {
          if (listItem.id.toString() === source.droppableId) {
            //删除、保存
            const item = listItem.cards.splice(source.index, 1);
            newList.forEach((nList: any) => {
              if (nList.id.toString() === destination.droppableId) {
                //添加
                nList.cards.splice(destination.index, 0, item[0]);
              }
            });
          }
        });
        setState(newList);
      }
    } else if (result.type === "list") {
      // 列表拖拽
      const newList = JSON.parse(JSON.stringify(state));
      const item = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, item[0]);
      setState(newList);
    }
  };

  return (
    <>
      <div className={styles.all}>
        <div className={styles.header}>trello like</div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="list">
            {(provided) => {
              return (
                <>
                  <div
                    className={styles.body}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {state.map((item, index) => {
                      return <CardList {...item} key={item.id} index={index} />;
                    })}
                    {provided.placeholder}
                    <AddList />
                  </div>
                </>
              );
            }}
          </Droppable>
          <Modal />
        </DragDropContext>
      </div>
    </>
  );
};
