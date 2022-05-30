import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardEmpty, cardType } from "@/models/types";
import {
  BorderOutlined,
  CheckSquareOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Radio } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  // console.log(new Date().getTime());
  // console.log(moment(new Date().getTime()).format("YYYY-MM-DD HH:mm"));
  const [inputState, setInputState] = useState("");
  const { state, setState, findCard,cardUpdate } = store();
  const { modalState } = modalStore();
  //获取卡片信息
  const [cardState, setCardState] = useState<cardType>(findCard(modalState.cardId));
  useEffect(() => {
    setCardState(findCard(modalState.cardId));
  }, [modalState,state]);

  useEffect(() => {
    setInputState(cardState.text);
  }, [cardState]);

  const handleTextChange = () => {
    const newCard={...cardState}
    newCard.text=inputState
    setCardState(newCard)

    // const newState = JSON.parse(JSON.stringify(state));
    // newState.forEach((listItem: any) => {
    //   listItem.cards.forEach((cardItem: any) => {
    //     if (cardItem.id === cardState.id) {
    //       console.log("deng");
    //       cardItem.text = inputState;
    //     }
    //   });
    // });
    // console.log(newState);
    // setState(newState);
    cardUpdate(newCard)
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
        <BorderOutlined className={styles.checkIcon} />
        <CheckSquareOutlined className={styles.checkedIcon} />
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          showNow={false}
          showTime={{
            defaultValue: moment(new Date().getTime(), "YYYY-MM-DD HH:mm"),
          }}
          // onChange={(a: any, b: any) => console.log(a, b)}
        />
      </div>
    </div>
  );
};
