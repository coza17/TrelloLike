import styles from './index.module.less'

export default (props:cardType)=>{
    const {id=0,text="eeee"}=props
    return (
        <div className={styles.body}>
            {id}+{text}
        </div>
    )
}

type cardType={
    id?:number,
    text?:string
}