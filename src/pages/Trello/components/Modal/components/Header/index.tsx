import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { cardType } from "@/models/types";
import {
  BorderOutlined,
  CheckSquareOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { DatePicker, Input } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
export default () => {
  const [inputState, setInputState] = useState("");
  const { state, setState, findCard, cardUpdate,cardDelete } = store();
  const { modalState,setModalState,cardState } = modalStore();

  useEffect(() => {
    setInputState(cardState.text);
  }, [cardState]);
  const handleDelete=()=>{
    cardDelete(cardState.id)
    const newModal={...modalState}
    newModal.show=false
    setModalState(newModal)
  }
  const handleTextChange = () => {
    const newCard = { ...cardState };
    newCard.text = inputState;
    cardUpdate(newCard, "text");
    // console.log("时间",moment(new Date()).isBefore(moment(cardState.dates.time)))
  };
  const handleDatesChange=(action:"time"|"check",data?:moment.Moment | null)=>{
    // console.log("data",data.toString());
    // console.log("change",moment(new Date (cardState.dates.time).getTime()).format("YYYY-MM-DD HH:mm"));
    const newCard:cardType=JSON.parse(JSON.stringify(cardState));
    switch (action){
      case "time":{
        newCard.dates.time=data?data.toString():null;
        break;
      }
      case "check":{
        newCard.dates.isCheck=!newCard.dates.isCheck;
        break;
      }
    }
    cardUpdate(newCard,"dates")
  }
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
        <a onClick={handleDelete} className={styles.delete}>删除卡片</a>
      <div className={styles.time}>
        <div className={styles.text}>到期日</div>
        {cardState.dates.time!==null && (cardState.dates.isCheck ? (
          <CheckSquareOutlined onClick={()=>handleDatesChange("check")} className={styles.checkedIcon}/>
        ) : (
          <BorderOutlined onClick={()=>handleDatesChange("check")} className={styles.checkIcon} />
        ))}
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          showToday={false}
          allowClear={true}
          value={cardState.dates.time?moment(new Date (cardState.dates.time).getTime()):null}
          // defaultValue={moment(new Date (cardState.dates.time).getTime())}
          onChange={(data) => handleDatesChange("time",data)}
        />
      </div>
    </div>
  );
};
