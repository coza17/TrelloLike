import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { message } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import AddList from "./components/AddList";
import CardList from "./components/CardList";
import Modal from "./components/Modal";
import styles from "./index.module.less";
import useDragEnd from "./useDragEnd";
import modalChidren from '@/pages/Trello/components/components'
export default () => {
  const { state, listDelete } = store();
  const { modalState, setModalState,setCardIdState } = modalStore();
  const { handleDragEnd } = useDragEnd();
  const handleDelete = (id: number) => {
    //删除列表
    listDelete(id);
    message.success("删除成功");
  };

  const cardClick=(id:string)=>{
    //卡片点击弹窗
    setCardIdState(id)
    setModalState(true)
  }
  return (
    <>
      <div className={styles.all}>
        <div className={styles.header}>trello</div>
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
                      return (
                        <CardList
                          {...item}
                          key={item.id}
                          index={index}
                          handleDelete={() => handleDelete(item.id)}
                          cardClick={cardClick}
                        />
                      );
                    })}
                    {provided.placeholder}
                    <AddList />
                  </div>
                </>
              );
            }}
          </Droppable>
          <Modal
            modalState={modalState}
            handleClose={()=>setModalState(false)}
            Children={modalChidren()}
          />
        </DragDropContext>
      </div>
    </>
  );
};
