import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import store from "./store";
import { cardEmpty, cardType } from "./types";

const modal = atom({
  key: "modal",
  default: false,
});
const cardId=atom({
  key:"modalCardId",
  default:"card-0"
})
const card=atom({
  key:"modalCard",
  default:cardEmpty
})
export default () => {
  const { findCard,state } = store();
  const [modalState, setModalState] = useRecoilState(modal);
  const [cardState, setCardState] = useRecoilState(card);
  const [cardIdState,setCardIdState]=useRecoilState(cardId)
  useEffect(()=>{
    setCardState(findCard(cardIdState))
  },[cardIdState,state])

  return {
    modalState,
    setModalState,
    cardState,
    setCardIdState
  };
};
