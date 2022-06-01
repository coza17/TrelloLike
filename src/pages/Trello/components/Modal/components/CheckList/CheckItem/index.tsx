import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType, checkType } from "@/models/types";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import styles from "./index.module.less";
export default (checkItem: checkType) => {
  const [inputState, setInputState] = useState(checkItem.itemText);
  const { state, setState, findCard, cardUpdate } = store();
  const { modalState, cardState } = modalStore();
  const [editState, setEditState] = useState(false);
  // const [cardState, setCardState] = useState<cardType>(
  //     findCard(modalState.cardId)
  //   );
  const handleEdit = () => {
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
    const newCard: cardType = JSON.parse(JSON.stringify(cardState));
    newCard.checkList.forEach((item) => {
      if (item.id === id) {
        item.isCheck = !item.isCheck;
      }
    });
    console.log("cardState", cardState);

    cardUpdate(newCard, "checkList");
  };
  const handleDelete = (id: string) => {
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
        <Input
        value={inputState}
        onChange={(e)=>setInputState(e.target.value)}
          onBlur={handleEdit}
          onPressEnter={handleEdit}
        />
      ) : (
        <div className={styles.itemText} onClick={() => setEditState(true)}>
          {checkItem.itemText}
        </div>
      )}
      <a onClick={() => handleDelete(checkItem.id)} className={styles.delete}>
        删除
      </a>
    </div>
  );
};
