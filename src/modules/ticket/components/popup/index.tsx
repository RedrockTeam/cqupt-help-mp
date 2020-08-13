import React from "react";
import { View, Button, ITouchEvent } from "@tarojs/components";
import styles from "./index.module.scss";

type Props = {
  visible: boolean;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
};

const Popup = ({ visible, onCancel, onOk }: Props) => {
  return (
    <View
      className={`${styles.mask} ${
        visible ? styles.maskShow : styles.maskHide
      }`}
    >
      <View
        className={`${styles.verify} ${visible ? styles.show : styles.hide}`}
      >
        <View className={styles.Top}>
          <View className={styles.title}>确定使用该影票?</View>
          <View className={styles.tips}>请在工作人员指示下使用</View>
        </View>
        <Button className={styles.Btn1} onClick={onOk}>
          确认
        </Button>
        <Button className={styles.Btn2} onClick={onCancel}>
          取消
        </Button>
      </View>
    </View>
  );
};

export default Popup;
