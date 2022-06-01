import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType, checkType } from "@/models/types";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import styles from "./index.module.less";
export default (checkItem: checkType) => {
  const [inputState, setInputState] = useState(checkItem.itemText);
  const { cardUpdate } = store();
  const { cardState } = modalStore();
  const [editState, setEditState] = useState(false);

  const handleEdit = () => {
    //修改点击的单项
    const newCard: cardType = JSON.parse(JSON.stringify(cardState));
    newCard.checkList.forEach((item) => {
      if (item.id === checkItem.id) {
        console.log("find");
        item.itemText = inputState;
      }
    });
    console.log(newCard);
    cardUpdate(newCard, "checkList");
    setEditState(false);
  };

  const handleCheck = (id: string) => {
    //修改单项状态
    const newCard: cardType = JSON.parse(JSON.stringify(cardState));
    newCard.checkList.forEach((item) => {
      if (item.id === id) {
        item.isCheck = !item.isCheck;
      }
    });
    cardUpdate(newCard, "checkList");
  };
  const handleDelete = (id: string) => {
    //删除单项
    const newCard: cardType = JSON.parse(JSON.stringify(cardState));
    newCard.checkList = newCard.checkList.filter((item) => item.id !== id);
    cardUpdate(newCard, "checkList");
  };
  return (
    <div className={styles.checkItem} key={checkItem.id}>
      {checkItem.isCheck ? (
        <CheckSquareOutlined
          onClick={() => handleCheck(checkItem.id)}
          className={styles.checkedIcon}
        />
      ) : (
        <BorderOutlined
          onClick={() => handleCheck(checkItem.id)}
          className={styles.checkIcon}
        />
      )}
      {editState ? (
        <div className={styles.add}>
          <Input
            value={inputState}
            onChange={(e) => setInputState(e.target.value)}
            onBlur={handleEdit}
            onPressEnter={handleEdit}
          />
          <Button onClick={handleEdit} type="primary" className={styles.button}>
            保存
          </Button>
        </div>
      ) : (
        <div className={styles.itemText} onClick={() => setEditState(true)}>
          <span className={styles.text}>{checkItem.itemText}</span>
          <a
            onClick={() => handleDelete(checkItem.id)}
            className={styles.delete}
          >
            删除
          </a>
        </div>
      )}
    </div>
  );
};
