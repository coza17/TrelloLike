export type checkType = {
  id: string;
  itemText: string;
  isCheck: boolean;
};
export type checkListType = checkType[];
export type activityType = {
  comment: string;
  time: string;
};
export type activityListType = activityType[];
export type cardType = {
  id: string;
  text: string;
  description: string;
  dates: {
    time: string | null;
    isCheck: boolean;
  };
  checkId: number;
  checkList: checkListType;
  activity: activityListType;
};
export type cardListType = {
  title: string;
  id: number;
  cards: cardType[];
};
export type trelloType = cardListType[];
export type modalType = {
  show: false;
  cardId: string;
};
export const cardEmpty: cardType = {
  id: "",
  text: "",
  description: "",
  dates: {
    time: "",
    isCheck: false,
  },
  checkId: -1,
  checkList: [],
  activity: [],
};
