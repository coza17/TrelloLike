import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType, checkType } from "@/models/types";
import {
  BorderOutlined,
  CheckSquareOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Input, Progress } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  const { state, setState, findCard, cardUpdate } = store();
  const { modalState } = modalStore();
  const [inputState, setInputState] = useState("");
  const [showState, setShowState] = useState(false);
  //获取卡片信息
  const [cardState, setCardState] = useState<cardType>(
    findCard(modalState.cardId)
  );
  useEffect(() => {
    setCardState(findCard(modalState.cardId));
  }, [modalState, state]);
  const handleAdd = () => {
    if (inputState !== "") {
      const newCard = { ...cardState };
      const newList = [...newCard.checkList];
      newList.push({
        id: `${newCard.id}-${newCard.checkId + 1}`,
        itemText: inputState,
        isCheck: false,
      });
      newCard.checkList = newList;
      newCard.checkId++;
      cardUpdate(newCard, "checkList");
      setInputState("");
    }
  };
  const handleCheck = (id: string) => {
    const newCard: cardType = JSON.parse(JSON.stringify(cardState));
    newCard.checkList.forEach((item) => {
      if (item.id === id) {
        item.isCheck = !item.isCheck;
      }
    });
    cardUpdate(newCard, "checkList");
  };
  const handleDelete = (id: string) => {
    const newCard: cardType = JSON.parse(JSON.stringify(cardState));
    newCard.checkList = newCard.checkList.filter((item) => item.id !== id);
    cardUpdate(newCard, "checkList");
  };
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <OrderedListOutlined />
        <span className={styles.text}>清单</span>
        <Progress
          percent={Math.floor(
            (cardState.checkList.filter((item) => item.isCheck).length /
              cardState.checkList.length) *
              100
          )}
        />
      </div>
      <div className={styles.content}>
        {cardState.checkList.map((item: checkType, index) => {
          return (
            <div className={styles.checkItem} key={item.id}>
              {item.isCheck ? (
                <CheckSquareOutlined
                  onClick={() => handleCheck(item.id)}
                  className={styles.checkedIcon}
                />
              ) : (
                <BorderOutlined
                  onClick={() => handleCheck(item.id)}
                  className={styles.checkIcon}
                />
              )}
              <div key={index}>{item.itemText}</div>
              <span onClick={() => handleDelete(item.id)}>删除</span>
            </div>
          );
        })}
        <div className={styles.add}>
          {showState ? (
            <div className={styles.addItem}>
              <Input
                value={inputState}
                onChange={(e) => setInputState(e.target.value)}
                onPressEnter={handleAdd}
              />
              <Button onClick={handleAdd}>保存</Button>
              <Button onClick={() => setShowState(false)}>取消</Button>
            </div>
          ) : (
            <Button
              onClick={() => setShowState(true)}
              className={styles.button}
            >
              添加项目
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
