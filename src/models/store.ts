import { atom, useRecoilState } from "recoil"

const trello=atom({
    key:"state",
    default:[
        {
            title:"待办",
            id:0,
            cards:[
                {
                    id:0,
                    text:"1st card"
                },
                {
                    id:1,
                    text:"2ed card"
                }
            ]
        },
        {
            title:"办理",
            id:1,
            cards:[
                {
                    id:0,
                    text:"1 card"
                },
                {
                    id:1,
                    text:"2 card"
                }
            ]
        }
    ]
})

export default ()=>{
    const [state,setState]=useRecoilState(trello)
    return {
        state,setState
    }
}