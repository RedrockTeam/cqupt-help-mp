/*
 * @Author: myjdml
 * @Date: 2021-03-19 19:21:48
 * @LastEditors: myjdml
 * @LastEditTime: 2021-03-21 16:42:07
 * @FilePath: /cqupt-help-mp/src/modules/ticket/components/select-popup/index.tsx
 * @Description: nothing is everything
 */
import { View, Text, Button } from "@tarojs/components";
import React, { useState } from "react";
import styles from "./index.module.scss";

type Props = {
  isShow: boolean;
  title: string;
  detail: string;
  bottomType?: number;
  confirmFun: () => void,
  cancelFun?: () => void
};

type BottomProp = {
  bottomType?: number;
  confirmFun: () => void;
  cancelFun?: () => void;
}

const Bottom = ({
  bottomType,
  confirmFun,
}:BottomProp) => {
  if (bottomType === 1) {
    return (
      <View>
        <Button onClick={() => confirmFun()}>确定</Button>
      </View>
    )
  } else if (bottomType === 2) {
    return(
      <View>
        <Button>取消</Button>
        <Button>确定</Button>
      </View>
    )
  }
}

const SelectPopup = ({
  isShow,
  title,
  detail,
  bottomType,
  confirmFun,
}: Props) => {
  return (
    <View className={`${styles.wrapper} ${isShow?styles.show:styles.hiden}`}>
      <View className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.detail}>{detail}</Text>
        {Bottom({
          bottomType,
          confirmFun,
        })}
      </View>
    </View>
  );
};

export default SelectPopup;
