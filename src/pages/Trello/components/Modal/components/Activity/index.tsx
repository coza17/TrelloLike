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
  const { state, setState, findCard,cardUpdate } = store();
  const { modalState } = modalStore();
  const [cardState, setCardState] = useState<cardType>(findCard(modalState.cardId));
  useEffect(() => {
    setCardState(findCard(modalState.cardId));
  }, [modalState,state]);
  useEffect(()=>{
    setInputState("")
  },[modalState])
  const handleActivityChange = () => {
    const newCard={...cardState};
    const newList=[...newCard.activity];
    if(inputState!==""){
      newList.unshift({
        comment: inputState,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
      });
      newCard.activity=newList;
      cardUpdate(newCard,"activity")
      setInputState("")
    }
  };
  const handleDelete=(index:number)=>{
    console.log(index);
    const newCard:cardType=JSON.parse(JSON.stringify(cardState))
    newCard.activity.splice(index,1)
    cardUpdate(newCard,"activity")
  }
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
          onClick={handleActivityChange}
        >
          保存
        </Button>
      </div>
      <div className={styles.commentList}>
        {cardState.activity.map((item: any, index) => {
          return (
            <div className={styles.commentItem} key={index}>
              <span className={styles.commentTime}>2022/05/31 00:33</span>
              <div className={styles.commentText}>{item.comment}</div>
              <span onClick={()=>handleDelete(index)}>删除</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
