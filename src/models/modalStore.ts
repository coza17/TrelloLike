import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import store from "./store";
import { cardEmpty, cardType } from "./types";

const modal = atom({
  key: "modal",
  default: {
    show: false,
    cardId: "card-0",
  },
});
const card=atom({
  key:"modalCard",
  default:cardEmpty
})
export default () => {
  const { findCard,state } = store();
  const [modalState, setModalState] = useRecoilState(modal);
  const [cardState, setCardState] = useRecoilState(card);
  useEffect(()=>{
    setCardState(findCard(modalState.cardId))
  },[modalState,state])
  // const { state, setState } = store();
  // useEffect(() => {
  //   console.log("change");
  // const newState = JSON.parse(JSON.stringify(state));
  // newState.forEach((listItem: any) => {
  //   listItem.cards.forEach((cardItem: any) => {
  //     if (cardItem.id === modalState.card.id) {
  //       cardItem = modalState.card;
  //     }
  //   });
  // });
  // setState(newState);
  // console.log(state);
  //   console.log(modalState)
  // }, [modalState]);
  return {
    modalState,
    setModalState,
    cardState
  };
};
