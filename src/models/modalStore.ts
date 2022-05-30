import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import store from "./store";

const modal = atom({
  key: "modal",
  default: {
    show: false,
    card: {
      id: "",
      text: "",
      description: "",
      dates: "",
      checkId: 0,
      checkList: [],
      activity: [],
    },
  },
});
export default () => {
  const [modalState, setModalState] = useRecoilState(modal);
  const { state, setState } = store();
  useEffect(() => {
      console.log("change");
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: any) => {
      listItem.cards.forEach((cardItem: any) => {
        if (cardItem.id === modalState.card.id) {
          cardItem = modalState.card;
        }
      });
    });
    setState(newState);
    console.log(state);
    
  }, [modalState]);
  return {
    modalState,
    setModalState,
  };
};
