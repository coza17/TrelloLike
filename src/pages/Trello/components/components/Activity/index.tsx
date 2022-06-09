import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { activityType, cardType } from "@/models/types";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  const [inputState, setInputState] = useState("");
  const { cardUpdate } = store();
  const { modalState,cardState } = modalStore();
  useEffect(()=>{
    setInputState("");
  },[modalState]);
  const handleActivityChange = () => {
    const newCard={...cardState};
    const newList=[...newCard.activity];
    if(inputState!==""){
      newList.unshift({
        comment: inputState,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
      });
      newCard.activity=newList;
      cardUpdate(newCard,"activity");
      setInputState("");
    }
  };
  const handleDelete=(index:number)=>{
    console.log(index);
    const newCard:cardType=JSON.parse(JSON.stringify(cardState));
    newCard.activity.splice(index,1);
    cardUpdate(newCard,"activity");
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
        {cardState.activity.map((item: activityType, index) => {
          return (
            <div className={styles.commentItem} key={index}>
              <span className={styles.commentTime}>{item.time}</span>
              <div className={styles.commentText}>{item.comment}</div>
              <a onClick={()=>handleDelete(index)} className={styles.delete}>删除</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
