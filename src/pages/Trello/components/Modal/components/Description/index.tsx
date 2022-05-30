import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { AlignLeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import styles from "./index.module.less";
export default () => {
  const [inputState, setInputState] = useState("");
  const { state, setState } = store();
  const { modalState } = modalStore();
  const handleDescChange = () => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: any) => {
      listItem.cards.forEach((cardItem: any) => {
        if (cardItem.id === modalState.card.id) {
          cardItem.description = inputState;
        }
      });
    });
    setState(newState);
    console.log(newState);
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
