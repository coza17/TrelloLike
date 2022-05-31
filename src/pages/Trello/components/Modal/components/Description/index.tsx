import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType } from "@/models/types";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  const [inputState, setInputState] = useState("");
  const { state, setState, findCard,cardUpdate } = store();
  const { modalState } = modalStore();
  //获取卡片信息
  const [cardState, setCardState] = useState<cardType>(findCard(modalState.cardId));
  useEffect(() => {
    setCardState(findCard(modalState.cardId));
  }, [modalState,state]);
  useEffect(()=>{
    setInputState(cardState.description)
  },[cardState])
  const handleDescChange = () => {
    const newCard={...cardState}
    newCard.description=inputState
    cardUpdate(newCard,"description")
  };
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <AlignLeftOutlined />
        <span className={styles.text}>描述</span>
      </div>
      <Input.TextArea
        autoSize={{ minRows: 3 }}
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
        onPressEnter={handleDescChange}
        onBlur={handleDescChange}
      />
    </div>
  );
};
