import { atom, useRecoilState } from "recoil";
import { cardEmpty, cardListType, cardType } from "./types";

const trello = atom({
  key: "treloState",
  default: [
    {
      title: "待办",
      id: 0,
      cards: [
        {
          id: "card-0",
          text: "1st card",
          description: "描述",
          dates: {
            time:"Thu Jun 30 2022 22:06:30 GMT+0800",
            isCheck:false
          },
          checkId: 1,
          checkList: [
            {
              id: "card-0-1",
              itemText: "清单1",
              // date:'',
              isCheck: false,
            },
          ],
          activity: [
            {
              comment: "评论2",
              time: "2022-05-30 03:25:17",
            },
            {
              comment: "评论1",
              time: "2022-05-29 17:25:17",
            },
          ],
        },
      ],
    },
  ],
});
const listId = atom({
  key: "list-id",
  default: 0,
});
const cardId = atom({
  key: "card-id",
  default: 0,
});
export default () => {
  const [state, setState] = useRecoilState(trello);
  const [listIdState, setListIdState] = useRecoilState(listId);
  const [cardIdState, setCardIdState] = useRecoilState(cardId);

  const findCard = (cardId: string) => {
    let card: cardType = cardEmpty;
    state.forEach((item) => {
      if (item.cards.find((cardItem) => cardItem.id === cardId)) {
        card =
          item.cards.find((cardItem) => cardItem.id === cardId) || cardEmpty;
      }
    });
    return card;
  };

  const cardUpdate = (cardState: cardType, action: any) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: cardListType) => {
      listItem.cards.forEach((cardItem: cardType) => {
        if (cardItem.id === cardState.id) {
          switch (action) {
            case "text": {
              cardItem.text = cardState.text;
              // cardItem=JSON.parse(JSON.stringify(cardState))
              break;
            }
            case "description": {
              cardItem.description = cardState.description;
              break;
            }
            case "checkList": {
              cardItem.checkList = cardState.checkList;
              cardItem.checkId = cardState.checkId;
              break;
            }
            case "activity": {
              
              cardItem.activity = cardState.activity;
              break;
            }
            case "dates":{
              cardItem.dates=cardState.dates;
              console.log(cardState);
              
              break;
            }
          }
        }
      });
    });
    console.log(newState);
    setState(newState);
  };

  const cardAdd = (listId:number,text:string) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach(
      (item: cardListType) => {
        if (item.id === listId) {
          item.cards.push({
            id: `card-${cardIdState + 1}`,
            text: text,
            description: "",
            dates: {
              time: null,
              isCheck: false
            },
            checkId: 0,
            checkList: [],
            activity: []
          });
          setCardIdState((id) => id + 1);
          setState(newState);
        }
      }
    );
  };

  return {
    state,
    setState,
    listIdState,
    setListIdState,
    cardIdState,
    setCardIdState,

    findCard,
    cardUpdate,
    cardAdd
  };
};
