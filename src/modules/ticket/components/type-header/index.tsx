/*
 * @Author: myjdml
 * @Date: 2021-03-22 14:57:20
 * @LastEditors: myjdml
 * @LastEditTime: 2021-03-23 18:40:58
 * @FilePath: /cqupt-help-mp/src/modules/ticket/components/type-header/index.tsx
 * @Description: nothing is everything
 */
import { View } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.module.scss';

type Props = {
  MovieFun: () => void;
  LectureFun: () => void;
}

const TypeHeader = ({
  MovieFun,
  LectureFun,
}: Props) => {
  return (
    <View className={styles.typeHeader}>
      <View 
        className={styles.button}
        onClick={MovieFun}
      >影票</View>
      <View 
        className={styles.button}
        onClick={LectureFun}
      >剧场</View>
    </View>
  )
}

export default TypeHeader;