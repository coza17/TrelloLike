import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType } from "@/models/types";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  const [inputState, setInputState] = useState("");
  const { state, setState, findCard } = store();
  const { modalState } = modalStore();
  const [cardState, setCardState] = useState<cardType>();
  useEffect(() => {
    console.log(findCard(modalState.cardId));
  }, [modalState]);
  const handleDescChange = () => {
    // const newState = JSON.parse(JSON.stringify(state));
    // newState.forEach((listItem: any) => {
    //   listItem.cards.forEach((cardItem: any) => {
    //     if (cardItem.id === modalState.card.id) {
    //       cardItem.activity.push({
    //           comment:inputState,
    //           time:moment().format('YYYY-MM-DD HH:mm:ss')
    //       })
    //     }
    //   });
    // });
    // setState(newState);
    // setInputState("")
    // console.log(newState);
  };
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <UnorderedListOutlined />
        <span className={styles.text}>活动</span>
      </div>
      <div className={styles.input}>
        <Input.TextArea
          autoSize={true}
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
        />
        <Button
          type="primary"
          className={styles.button}
          onClick={handleDescChange}
        >
          保存
        </Button>
      </div>
      <div className={styles.commentList}>
        {/* {[...cardState.activity].reverse().map((item: any, index) => {
          return (
            <div className={styles.commentItem} key={index}>
              <span className={styles.commentTime}>2022/05/31 00:33</span>
              <div className={styles.commentText}>{item.comment}</div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};
