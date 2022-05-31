import modalStore from "@/models/modalStore";
import store from "@/models/store";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import Activity from "./components/Activity";
import CheckList from "./components/CheckList";
import Description from "./components/Description";
import Header from "./components/Header";
import styles from "./index.module.less";
export default () => {
  const { modalState, setModalState } = modalStore();
  const handleClose = () => {
    const newModal = { ...modalState };
    newModal.show = false;
    setModalState(newModal);
  };
  const handleDelete = () => {
    // const newState = JSON.parse(JSON.stringify(state));
    // newState.forEach((listItem: any) => {
    //   listItem.cards.forEach(
    //     (cardItem: { id: string; text: string }, index: number) => {
    //       if (cardItem.id === modalState.card.id) {
    //         listItem.cards.splice(index, 1);
    //       }
    //     }
    //   );
    // });
    // setState(newState);
    // setModalState({
    //   show: false,
    //   card: {
    //     id: "",
    //     text: "",
    //     description: "",
    //     dates: "",
    //     checkList: [],
    //     activity: [],
    //   },
    // });
  };
  return (
    <div className={`${styles.all} ${modalState.show ? "" : "hidden"}`}>
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
