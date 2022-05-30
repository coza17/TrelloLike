import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { OrderedListOutlined } from "@ant-design/icons";
import { Button, Input, Progress } from "antd";
import { useState } from "react";
import styles from "./index.module.less";
export default () => {
  const { state, setState } = store();
  const { modalState } = modalStore();
  const [inputState,setInputState]=useState("")
  const [showState,setShowState]=useState(false)

  const handleAdd=()=>{
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: any) => {
      listItem.cards.forEach((cardItem: any) => {
        if (cardItem.id === modalState.card.id) {
          cardItem.checkList.push({
            id:`${cardItem.id}-${cardItem.checkId+1}`,
            itemText:inputState,
            isCheck:false
          });
          cardItem.checkId++;
        }
      });
    });
    setInputState("")
    setState(newState);
    console.log(newState);
  }
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <OrderedListOutlined />
        <span className={styles.text}>清单</span>
        <Progress percent={30} />
      </div>
      <div className={styles.content}>
          {
              modalState.card.checkList.map((item:any,index)=>{
                  return(
                      <div key={index}>
                          {item.itemText}
                      </div>
                  )
              })
          }
          <div className={styles.add}>
          {
              showState?
              <div className={styles.addItem}>
                  <Input value={inputState} onChange={(e)=>setInputState(e.target.value)} onPressEnter={handleAdd}/>
                  <Button onClick={()=>setShowState(false)}>取消</Button>
              </div>
              :
              <Button onClick={()=>setShowState(true)} className={styles.button}>添加项目</Button>
          }
          </div>
      </div>
    </div>
  );
};
