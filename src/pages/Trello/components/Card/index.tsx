import modalStore from "@/models/modalStore";
import { cardType } from "@/models/types";
import {
  AlignLeftOutlined,
  ClockCircleFilled,
  ClockCircleOutlined,
  MessageOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Draggable } from "react-beautiful-dnd";
import styles from "./index.module.less";

export default (props: cardType) => {
  const {
    id,
    text,
    index = 0,
    dates,
    checkList,
    activity,
    description,
  } = props;
  const { setModalState } = modalStore();
  const handleClick = () => {
    setModalState({
      show: true,
      cardId: id,
    });
  };
  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.body}
            onClick={handleClick}
          >
            <div>{text}</div>
            <div className={styles.footer}>
              {dates.time && (
                <div className={`${styles.icon} ${styles.time}`}>
                  <div className={!dates.isCheck?`${styles.check}`:`${styles.checked}`}>
                  </div>
                  {dates.isCheck ? (
                    <ClockCircleFilled className={styles.checked} />
                  ) : (
                    <ClockCircleFilled className={styles.check} />
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
