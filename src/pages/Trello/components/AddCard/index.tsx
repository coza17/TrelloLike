import store from "@/models/store"
import { Button, Input } from "antd"
import {  useState } from "react"
import styles from "./index.module.less"
export default (props:{listId:number})=>{
    const {cardIdState,setCardIdState,setState,state}=store()
    const [editState,setEditState]=useState(false)
    const [inputState,setInputState]=useState("")
    const handleEdit=()=>{
        setEditState(state=>!state)
    }
    const handleAdd=()=>{
        const newList=JSON.parse(JSON.stringify(state))
        newList.forEach((item: { id: number; cards: { id: string; text: string }[] })=>{
            if(item.id===props.listId){
                item.cards.push({
                    id:`cards-${cardIdState+1}`,
                    text:inputState
                })
                console.log("item",item);
                setCardIdState(id=>id+1)
                setState(newList)
                setInputState("")
                setEditState(false)
            }
        })
        console.log(state);
        
    }
    return(
        <>
            <div className={styles.body}>
                <div className={styles.content}>
                {
                    editState?
                    <div>
                        <Input onChange={e=>setInputState(e.target.value)}/>
                        <Button onClick={handleAdd}>添加卡片</Button>
                        <Button>X</Button>
                    </div>
                    :
                    <div onClick={handleEdit}>add card</div>
                }
                </div>
            </div>
        </>
    )
}