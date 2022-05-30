import store from "@/models/store";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useRef, useState } from "react";
import styles from "./index.module.less";
export default (props: { listId: number }) => {
  const { cardIdState, setCardIdState, setState, state } = store();
  const [editState, setEditState] = useState(false);
  const [inputState, setInputState] = useState("");

  const handleEdit = () => {
    setEditState(true);
  };
  const handleAdd = () => {
    if(inputState===""){
      setEditState(false);
      return
    }
    const newList = JSON.parse(JSON.stringify(state));
    newList.forEach(
      (item: { id: number; cards: { id: string; text: string }[] }) => {
        if (item.id === props.listId) {
          item.cards.push({
            id: `cards-${cardIdState + 1}`,
            text: inputState,
          });
          console.log("item", item);
          setCardIdState((id) => id + 1);
          setState(newList);
          setInputState("");
          setEditState(false);
        }
      }
    );
  };
  const handleCancel = () => {
    setInputState("");
    setEditState(false);
  };
  return (
    <>
      <div className={styles.body}>
        <div className={styles.content}>
          {editState ? (
            <div className={styles.addCard}>
              <Input.TextArea
                onChange={(e) => setInputState(e.target.value)}
                value={inputState}
                // autoSize={true}
                placeholder="为这张卡片输入标题..."
                className={styles.input}
                // bordered={false}
              />
              <div className={styles.button}>
                <Button  onClick={handleAdd} type="primary">添加卡片</Button>
                <div onClick={handleCancel} className={styles.icon}><CloseOutlined /></div>
              </div>
            </div>
          ) : (
            <div onClick={handleEdit} className={styles.addText}><PlusOutlined /> add card</div>
          )}
        </div>
      </div>
    </>
  );
};
