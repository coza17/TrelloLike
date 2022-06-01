import modalStore from "@/models/modalStore";
import { CloseOutlined } from "@ant-design/icons";
import Activity from "./components/Activity";
import CheckList from "./components/CheckList";
import Description from "./components/Description";
import Header from "./components/Header";
import styles from "./index.module.less";
export default () => {
  const { modalState, setModalState } = modalStore();

  const handleClose = () => {
    //关闭弹窗
    const newModal = { ...modalState };
    newModal.show = false;
    setModalState(newModal);
  };
  
  return (
    <div className={`${styles.all} ${modalState.show ? "" : "hidden"}`}>
      <div onClick={handleClose} className={styles.mask}></div>
    <div className={`${styles.body}`}>
      <CloseOutlined onClick={handleClose} className={styles.close} />
      <div className={styles.content}>
        <Header />
        <Description />
        <CheckList />
        <Activity />
      </div>
    </div>
    </div>
  );
};
