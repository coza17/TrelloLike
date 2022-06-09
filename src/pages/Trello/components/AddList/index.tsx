import store from "@/models/store";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import styles from "./index.module.less";
export default () => {
  const { listAdd } = store();
  const [editState, setEditState] = useState(false);
  const [inputState, setInputState] = useState("");
  const handleAdd = () => {
    //增加新列表
    if (inputState === "") {
      setEditState(false);
      return;
    }

    listAdd(inputState);
    setInputState("");
    setEditState(false);
  };
  const handleCancel = () => {
    setEditState(false);
    setInputState("");
  };
  return (
    <>
      <div className={styles.body}>
        <div className={styles.content}>
          {editState ? (
            <div className={styles.addList}>
              <Input
                value={inputState}
                placeholder="输入列表标题..."
                onChange={(e) => setInputState(e.target.value)}
                className={styles.input}
                onPressEnter={handleAdd}
              />
              <div className={styles.button}>
                <Button onClick={handleAdd} type="primary">
                  添加列表
                </Button>
                <div onClick={handleCancel} className={styles.icon}>
                  <CloseOutlined />
                </div>
              </div>
            </div>
          ) : (
            <div onClick={() => setEditState(true)} className={styles.addText}>
              <PlusOutlined /> add list
            </div>
          )}
        </div>
      </div>
    </>
  );
};
