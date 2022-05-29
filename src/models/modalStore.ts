import { atom, useRecoilState } from "recoil";

const modal=atom({
    key:'modal',
    default:{
        show:false,
        card:{
            id:"",
            text:""
        }
    }
})
export default ()=>{
    const [modalState,setModalState]=useRecoilState(modal)
    return{
        modalState,
        setModalState
    }
}