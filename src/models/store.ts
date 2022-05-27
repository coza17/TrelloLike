import { atom, useRecoilState } from "recoil"

const trello=atom({
    key:"state",
    default:[
        {
            title:"待办",
            id:"list-0",
            cards:[
                {
                    id:"card-0",
                    text:"1st card"
                },
                {
                    id:"card-1",
                    text:"2ed card"
                }
            ]
        },
        {
            title:"办理",
            id:"list-1",
            cards:[
                {
                    id:"card-2",
                    text:"1 card"
                },
                {
                    id:"card-3",
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