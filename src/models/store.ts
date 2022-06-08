import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { cardEmpty, cardListType, cardType, trelloType } from "./types";
const { persistAtom } = recoilPersist()
const trello = atom({
  key: "trelloState",
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
            time: "Thu Jun 30 2022 22:06:30 GMT+0800",
            isCheck: false,
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
        {
          id: "card-1",
          text: "2 card",
          description: "",
          dates: {
            time: null,
            isCheck: false,
          },
          checkId: 0,
          checkList: [],
          activity: [],
        },
      ],
    },
    {
      title: "办理",
      id: 1,
      cards: [
        {
          id: "card-2",
          text: "3 card",
          description: "",
          dates: {
            time: null,
            isCheck: false,
          },
          checkId: 0,
          checkList: [],
          activity: [],
        },
      ],
    },
  ],
  effects_UNSTABLE: [persistAtom]
});
const listId = atom({
  key: "list-id",
  default: 1,
});
const cardId = atom({
  key: "card-id",
  default: 2,
});
export default () => {
  const [state, setState] = useRecoilState<trelloType>(trello);
  const [listIdState, setListIdState] = useRecoilState(listId);
  const [cardIdState, setCardIdState] = useRecoilState(cardId);

  const findCard = (cardId: string) => {
    //根据cardId查找卡片
    let card: cardType = cardEmpty;
    state.forEach((item) => {
      if (item.cards.find((cardItem) => cardItem.id === cardId)) {
      card = item.cards.find((cardItem) => cardItem.id === cardId) || cardEmpty;
      }
    });
    return card;
  };

  const cardUpdate = (
    cardState: cardType,
    action: "text" | "description" | "checkList" | "activity" | "dates"
  ) => {
    //更新卡片信息
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: cardListType) => {
      listItem.cards.forEach((cardItem: cardType) => {
        if (cardItem.id === cardState.id) {
          switch (action) {
            case "text": {
              //标题
              cardItem.text = cardState.text;
              break;
            }
            case "description": {
              //描述
              cardItem.description = cardState.description;
              break;
            }
            case "checkList": {
              //清单
              cardItem.checkList = cardState.checkList;
              cardItem.checkId = cardState.checkId;
              break;
            }
            case "activity": {
              //评论
              cardItem.activity = cardState.activity;
              break;
            }
            case "dates": {
              //日期
              cardItem.dates = cardState.dates;
              break;
            }
          }
        }
      });
    });
    setState(newState);
  };

  const cardAdd = (listId: number, text: string) => {
    //增加新卡片
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((item: cardListType) => {
      if (item.id === listId) {
        item.cards.push({
          id: `card-${cardIdState + 1}`,
          text: text,
          description: "",
          dates: {
            time: null,
            isCheck: false,
          },
          checkId: 0,
          checkList: [],
          activity: [],
        });
        setCardIdState((id) => id + 1);
        setState(newState);
      }
    });
  };

  const cardDelete = (cardId: string) => {
    //删除卡片
    const newState=JSON.parse(JSON.stringify(state))
    newState.forEach((listItem:cardListType) => {
      listItem.cards.forEach((cardItem,index)=>{
        if(cardItem.id===cardId){
          listItem.cards.splice(index,1)
        }
      })
    });
    setState(newState)
  };

  const listAdd = (title:string) => {
    //增加新列表
    const newList = [...state];
    newList.push({
      title: title,
      id: listIdState + 1,
      cards: [],
    });
    setState(newList);
    setListIdState((id) => id + 1);
  };
  
  const listDelete = (id:number) => {
    //删除列表
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: cardListType, index: number) => {
      if (listItem.id === id) {
        newState.splice(index, 1);
      }
    });
    setState(newState);
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
    cardAdd,
    cardDelete,
    listAdd,
    listDelete
  };
};
