import store from "@/models/store"
import { Button, Input } from "antd"
import {  useState } from "react"
import styles from "./index.module.less"
export default ()=>{
    const {listIdState,setListIdState,setState,state}=store()
    const [editState,setEditState]=useState(false)
    const [inputState,setInputState]=useState("")
    const handleAdd=()=>{
        const newList=[...state]
        newList.push({
            title:inputState,
            id:listIdState+1,
            cards:[]
        })
        setState(newList)
        setListIdState(id=>id+1)
        setInputState("")
        setEditState(false)
        
    }
    return(
        <>
            <div className={styles.body}>
                <div className={styles.content}>
                {
                    editState?
                    <div>
                        <Input value={inputState} onChange={e=>setInputState(e.target.value)}/>
                        <Button onClick={handleAdd}>添加列表</Button>
                        <Button onClick={()=>setEditState(false)}>X</Button>
                    </div>
                    :
                    <div onClick={()=>setEditState(true)}>add list</div>
                }
                </div>
            </div>
        </>
    )
}