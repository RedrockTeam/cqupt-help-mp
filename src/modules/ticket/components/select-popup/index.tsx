/*
 * @Author: myjdml
 * @Date: 2021-03-19 19:21:48
 * @LastEditors: myjdml
 * @LastEditTime: 2021-04-10 15:30:01
 * @FilePath: /cqupt-help-mp/src/modules/ticket/components/select-popup/index.tsx
 * @Description: nothing is everything
 */
import { View, Text, Button } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

/**
 * @description: 
 * @param {*}
 * isShow: 是否展示
 * title: 弹窗标题
 * detail: 弹窗正文
 * bottomType?: 按钮类型 0-一个 1-两个
 * confirmFun: 确定函数
 * cancelFun?: 取消函数
 * @return {*}
 */
type Props = {
  isShow: boolean;
  title: string;
  detail: string;
  bottomType?: number;
  confirmFun: () => void,
  cancelFun: () => void
};

type BottomProp = {
  bottomType?: number;
  confirmFun: () => void;
  cancelFun: () => void;
  isShow?: boolean;
}

const Bottom = ({
  bottomType,
  confirmFun,
  cancelFun,
  isShow
}:BottomProp) => {
  const [ closeCount, setCloseCount ] = useState(5);
  useEffect(() => {
    if (closeCount > 0 && isShow) {
      setTimeout(() => {
        setCloseCount(closeCount -1)
      }, 1000)
    }
  })
  // let timer = setInterval(() => {
  //   if (closeCount > 0) {
  //     setCloseCount(closeCount - 1);
  //   }
  // }, 1000)
  
  if (bottomType === 1) {
    return (
      <View>
        <View className={styles.line}></View>
        {(closeCount <= 0)?
        (
          <Button 
            onClick={() => confirmFun()}
            className={`${styles.bottomOne} ${styles.confirm}`}
          >我知道了（{closeCount}）</Button>
        ):
        (
          <Button 
            className={`${styles.bottomOne} ${styles.unConfirm}`}
          >我知道了（{closeCount}）</Button>
        )}
        
      </View>
    )
  } else if (bottomType === 2) {
    return(
      <View className={styles.bottomTwo}>
        <View className={styles.lineRow}></View>
        <View className={styles.wrapperBtn}>
          <Button
            className={`${styles.btn} ${styles.unConfirm}`}
            onClick={() => cancelFun()}
          >取消</Button>
          <View className={styles.lineColumn}></View>
          <Button
            className={`${styles.btn} ${styles.confirm}`}
            onClick={() => confirmFun()}
          >确定</Button>
        </View>
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
  cancelFun,
}: Props) => {
  return (
    <View className={`${styles.wrapper} ${isShow?styles.show:styles.hiden}`}>
      <View className={styles.content}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.detail}>{detail}</Text>
        {Bottom({
          bottomType,
          confirmFun,
          cancelFun,
          isShow,
        })}
      </View>
    </View>
  );
};

export default SelectPopup;
