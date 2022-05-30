import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { BorderOutlined, CheckSquareOutlined, CreditCardOutlined } from "@ant-design/icons";
import { DatePicker, Input, Radio } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  console.log(new Date().getTime());
  console.log(moment(new Date().getTime()).format("YYYY-MM-DD HH:mm"));
  const [inputState, setInputState] = useState("");
  const { state, setState } = store();
  const { modalState } = modalStore();
  useEffect(() => {
    setInputState(modalState.card.text);
  }, [modalState]);
  const handleTextChange = () => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: any) => {
      listItem.cards.forEach((cardItem: { id: string; text: string }) => {
        if (cardItem.id === modalState.card.id) {
          cardItem.text = inputState;
        }
      });
    });
    setState(newState);
    console.log(newState);
  };
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <CreditCardOutlined />
        <Input
          className={styles.input}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          onPressEnter={handleTextChange}
          onBlur={handleTextChange}
        />
      </div>
      <div className={styles.time}>
        <div className={styles.text}>到期日</div>
        <BorderOutlined className={styles.checkIcon}/>
        <CheckSquareOutlined className={styles.checkedIcon}/>
      <DatePicker
        format="YYYY-MM-DD HH:mm"
        showNow={false}
        showTime={{
          defaultValue: moment(new Date().getTime(), "YYYY-MM-DD HH:mm"),
        }}
      />
      </div>
    </div>
  );
};
