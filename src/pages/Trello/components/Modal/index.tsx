import { CloseOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
export default (props: { modalState: boolean; handleClose: ()=>void;Children: any}) => {
  const { modalState, handleClose,Children} = props;

  return (
    <div className={`${styles.all} ${modalState ? "" : "hidden"}`}>
      <div onClick={handleClose} className={styles.mask}></div>
    <div className={`${styles.body}`}>
      <CloseOutlined onClick={handleClose} className={styles.close} />
      <div className={styles.content}>
        {
          Children.map((Child:any,index:number)=>{
            return(
              <Child key={index}/>
            )
          })
        }
      </div>
    </div>
    </div>
  );
};
