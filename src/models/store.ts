import { atom, useRecoilState } from "recoil";
import { cardEmpty, cardListType, cardType } from "./types";

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
          description:"描述",
          dates:"",
          checkId:1,
          checkList:[
            {
              id:"card-0-1",
              itemText:'清单1',
              // date:'',
              isCheck:false
            }
          ],
          activity:[
            {
              comment:"评论",
              time:""
            },
            {
              comment:"评论2",
              time:""
            }
          ]

        }
      ],
    }
  ],
});
const listId = atom({
  key: "listId",
  default: 0,
});
const cardId = atom({
  key: "cardId",
  default: 0,
});
export default () => {
  const [state, setState] = useRecoilState(trello);
  const [listIdState, setListIdState] = useRecoilState(listId);
  const [cardIdState, setCardIdState] = useRecoilState(cardId);

  const findCard=(cardId:string)=>{
    let card:cardType=cardEmpty;
    state.forEach((item)=>{
      if(item.cards.find((cardItem)=>cardItem.id===cardId)){
        card=item.cards.find((cardItem)=>cardItem.id===cardId)||cardEmpty
      }
    })
    return card
  }

  const cardUpdate=(cardState:cardType,action:any)=>{
    const newState = JSON.parse(JSON.stringify(state));
    newState.forEach((listItem: cardListType) => {
      listItem.cards.forEach((cardItem: any) => {
        if (cardItem.id === cardState.id) {
          console.log("deng");
          console.log("cardState",cardState);
          
          cardItem.text = cardState.text;
          // cardItem = JSON.parse(JSON.stringify(cardState));
          console.log("cardItem",cardItem);
          console.log(newState);
        }
        console.log("cardItem",cardItem);
      });
    });
    setState(newState);
  }

  return {
    state,
    setState,
    listIdState,
    setListIdState,
    cardIdState,
    setCardIdState,

    findCard,
    cardUpdate
  };
};
