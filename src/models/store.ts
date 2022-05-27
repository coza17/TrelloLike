import { atom, useRecoilState } from "recoil";

const trello = atom({
  key: "state",
  default: [
    {
      title: "待办",
      id: 0,
      cards: [
        {
          id: "card-0",
          text: "1st card",
        },
        {
          id: "card-1",
          text: "2ed card",
        },
      ],
    },
    {
      title: "办理",
      id: 1,
      cards: [
        {
          id: "card-2",
          text: "1 card",
        },
        {
          id: "card-3",
          text: "2 card",
        },
      ],
    },
  ],
});
const listId = atom({
  key: "listId",
  default: 1,
});
const cardId = atom({
  key: "cardId",
  default: 3,
});
export default () => {
  const [state, setState] = useRecoilState(trello);
  const [listIdState, setListIdState] = useRecoilState(listId);
  const [cardIdState, setCardIdState] = useRecoilState(cardId);
  return {
    state,
    setState,
    listIdState,
    setListIdState,
    cardIdState,
    setCardIdState,
  };
};
