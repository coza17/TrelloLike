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
          text: "2 card",
        },
        {
          id: "card-3",
          text: "3 card",
        },
        {
          id: "card-4",
          text: "4 card",
        },
        {
          id: "card-5",
          text: "5 card",
        },
        {
            id: "card-6",
            text: "2 card",
          },
          {
            id: "card-7",
            text: "3 card",
          },
          {
            id: "card-8",
            text: "4 card",
          },
          {
            id: "card-9",
            text: "5 card",
          },
          {
            id: "card-10",
            text: "2 card",
          },
          {
            id: "card-11",
            text: "3 card",
          },
          {
            id: "card-12",
            text: "4 card",
          },
          {
            id: "card-13",
            text: "5 card",
          },
          {
            id: "card-14",
            text: "2 card",
          },
          {
            id: "card-15",
            text: "3 card",
          },
          {
            id: "card-16",
            text: "4 card",
          },
          {
            id: "card-17",
            text: "5 card",
          },
          {
            id: "card-18",
            text: "2 card",
          },
          {
            id: "card-19",
            text: "3 card",
          },
          {
            id: "card-20",
            text: "4 card",
          },
          {
            id: "card-21",
            text: "5 card",
          },
          {
            id: "card-22",
            text: "3 card",
          },
          {
            id: "card-23",
            text: "4 card",
          },
          {
            id: "card-24",
            text: "5 card",
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
