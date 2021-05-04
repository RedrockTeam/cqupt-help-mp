import React from "react";
import { View, Button, ITouchEvent } from "@tarojs/components";
import styles from "./index.module.scss";

export type Props = {
  isShow: boolean;
  img?: string;
  title?: string;
  detail?: string;
  bottom?: React.ReactNode;
  className?: string;
  onCancel: (event: ITouchEvent) => unknown;
  onOk: (event: ITouchEvent) => unknown;
};

const BottomPop = ({ isShow, onOk, onCancel, title }: Props) => {
  return (
    <View
      className={`${styles.mask} ${isShow ? styles.maskShow : styles.maskHide}`}
    >
      <View
        className={`${styles.verify} ${isShow ? styles.show : styles.hide}`}
      >
        <View className={styles.Top}>
          <View className={styles.title}>{title}</View>
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

export default BottomPop;
