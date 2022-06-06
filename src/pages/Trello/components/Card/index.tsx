import modalStore from "@/models/modalStore";
import { cardType } from "@/models/types";
import {
  AlignLeftOutlined,
  ClockCircleOutlined,
  MessageOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType&{index:number;handleClick:(id:any)=>void}) => {
  const {
    id,
    text,
    index,
    dates,
    checkList,
    activity,
    description,
    handleClick
  } = props;

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.body}
            onClick={()=>handleClick(id)}
          >
            <div>{text}</div>
            <div className={styles.footer}>
              {/* 根据卡片相关信息显示 */}
              {dates.time && (
                // 到期日是否完成
                <div className={`${styles.icon} ${styles.time}`}>
                  {dates.isCheck ? (
                    <div className={styles.checked} >
                      <ClockCircleOutlined className={styles.timeIcon}/>
                      {moment(dates.time).format("YY-MM-DD")}
                    </div>
                  ) : (
                    <div className={!moment(new Date()).isBefore(moment(dates.time))?`${styles.out}`:`${styles.check}`}>
                    <ClockCircleOutlined className={styles.timeIcon}/>
                    {moment(dates.time).format("YY-MM-DD")}
                    </div>
                  )}
                </div>
              )}
              {description != "" && (
                <div className={`${styles.icon} ${styles.description}`}>
                  <AlignLeftOutlined />
                </div>
              )}
              {checkList.length != 0 && (
                <div className={`${styles.icon} ${styles.checkList}`}>
                  <div className={checkList.filter((item) => item.isCheck).length/
                  checkList.length!==1?`${styles.check}`:`${styles.checked}`}>
                  <OrderedListOutlined className={styles.checkIcon}/>
                  {checkList.filter((item) => item.isCheck).length}/
                  {checkList.length}
                  </div>
                </div>
              )}
              {activity.length != 0 && (
                <div className={`${styles.icon} ${styles.activity}`}>
                  <MessageOutlined className={styles.activityIcon}/>
                  {activity.length}
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
