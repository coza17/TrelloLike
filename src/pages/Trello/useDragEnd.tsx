import store from "@/models/store";
import { cardListType } from "@/models/types";

const useDragEnd =()=>{
    const { state, setState } = store();
    const handleDragEnd = (result: any) => {
      //拖拽
      console.log(result);
      const { source, destination } = result;
      if (!destination) {
        return;
      } else if (result.type === "card") {
        //卡片拖拽
        if (source.droppableId === destination.droppableId) {
          //同列表
          const newList = JSON.parse(JSON.stringify(state));
          newList.forEach((listItem: cardListType) => {
            if (listItem.id.toString() === destination.droppableId) {
              const item = listItem.cards.splice(source.index, 1);
              listItem.cards.splice(destination.index, 0, item[0]);
            }
          });
          setState(newList);
        } else if (source.droppableId !== destination.droppableId) {
          //跨列表
          const newList = JSON.parse(JSON.stringify(state));
          newList.forEach((listItem: cardListType) => {
            if (listItem.id.toString() === source.droppableId) {
              //删除、保存
              const item = listItem.cards.splice(source.index, 1);
              newList.forEach((nList: cardListType) => {
                if (nList.id.toString() === destination.droppableId) {
                  //添加
                  nList.cards.splice(destination.index, 0, item[0]);
                }
              });
            }
          });
          setState(newList);
        }
      } else if (result.type === "list") {
        // 列表拖拽
        const newList = JSON.parse(JSON.stringify(state));
        const item = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, item[0]);
        setState(newList);
      }
    };
    return {handleDragEnd};
}
export default useDragEnd;