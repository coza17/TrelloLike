import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType, checkType } from "@/models/types";
import {
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, Input, Progress } from "antd";
import {  useState } from "react";
import CheckItem from "./CheckItem";
import styles from "./index.module.less";
export default () => {
  const { cardUpdate } = store();
  const { cardState} = modalStore();
  const [inputState, setInputState] = useState("");
  const [showState, setShowState] = useState(false);

  const handleAdd = () => {
    //增加单项
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

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <OrderedListOutlined />
        <span className={styles.text}>清单</span>
        {cardState.checkList.length!=0 &&
        <Progress
          percent={Math.floor(
            (cardState.checkList.filter((item) => item.isCheck).length /
              cardState.checkList.length) *
              100
          )}
        />}
      </div>
      <div className={styles.content} >
        <div>
        {cardState.checkList.map((item: checkType, index) => {
          return (
            <CheckItem {...item} key={item.id}/>
          );
        })}
        </div>
        <div className={styles.add}>
          {showState ? (
            <div className={styles.addItem}>
              <Input
                value={inputState}
                onChange={(e) => setInputState(e.target.value)}
                onPressEnter={handleAdd}
              />
              <Button onClick={handleAdd} type="primary" className={styles.button}>保存</Button>
              <Button onClick={() => setShowState(false)} className={styles.button}>取消</Button>
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
