import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  const [inputState, setInputState] = useState("");
  const { cardUpdate } = store();
  const { cardState } = modalStore();

  useEffect(()=>{
    setInputState(cardState.description);
  },[cardState]);

  const handleDescChange = () => {
    //更新卡片详情
    const newCard={...cardState};
    newCard.description=inputState;
    cardUpdate(newCard,"description");
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
