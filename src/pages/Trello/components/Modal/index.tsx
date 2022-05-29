import modalStore from '@/models/modalStore'
import store from '@/models/store';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.less'
export default ()=>{
    const {modalState,setModalState}=modalStore()
    const [inputState,setInputState]=useState("")
    const {state,setState}=store()
    const handleClose=()=>{
        const newModal={...modalState}
        newModal.show=false
        setModalState(newModal)
    }
    const handleClick=()=>{
        const newState=JSON.parse(JSON.stringify(state))
        newState.forEach((listItem:any)=>{
            listItem.cards.forEach((cardItem: { id: string; text: string; })=>{
                if(cardItem.id===modalState.card.id){
                    cardItem.text=inputState
                }
            })
        })
        setState(newState)
        console.log(newState);
        
    }
    const handleDelete=()=>{
        const newState=JSON.parse(JSON.stringify(state))
        newState.forEach((listItem:any)=>{
            listItem.cards.forEach((cardItem: { id: string; text: string; },index:number)=>{
                if(cardItem.id===modalState.card.id){
                    listItem.cards.splice(index,1)
                }
            })
        })
        setState(newState)
        setModalState({
            show:false,
            card:{
                id:"",
                text:""
            }
        })
    }
    useEffect(()=>{
        setInputState(modalState.card.text)
    },[modalState])
    return(
        <div className={`${styles.body} ${modalState.show?"":"hidden"}`}>
            <CloseOutlined onClick={handleClose}/>
            {modalState.card.text}
            <Input value={inputState} onChange={(e)=>setInputState(e.target.value)}/>
            <Button onClick={handleClick}>修改</Button>
            <Button onClick={handleDelete}>删除</Button>
        </div>
    )
}