/*
 * @Author: myjdml
 * @Date: 2021-03-22 14:57:20
 * @LastEditors: myjdml
 * @LastEditTime: 2021-04-18 15:37:24
 * @FilePath: \cqupt-help-mp\src\modules\ticket\components\type-header\index.tsx
 * @Description: nothing is everything
 */
import { View, Image } from '@tarojs/components';
import React, { useState } from 'react';
import styles from './index.module.scss';
import underLine from '@/static/images/underline.png';


type Props = {
  MovieFun: () => void;
  LectureFun: () => void;
}

const TypeHeader = ({
  MovieFun,
  LectureFun,
}: Props) => {
  // typeState ===0 表示讲座 ===1 表示影票
  const [ typeState, setTypeState ] = useState(0);

  const changeTypeMovie = (click: Function) => {
    click();
    setTypeState(0)
  }
  const changeTypeLecture = (click: Function) => {
    click();
    setTypeState(1)
  }

  return (
    <View className={styles.typeHeader}>
      <View 
        className={`${styles.button} ${styles.flexRow}`}
        onClick={() => changeTypeMovie(MovieFun)}
      >
        <View className={typeState === 0?styles.titleSelect:styles.titleSelectOff}>讲座</View>
        {
          typeState === 0?(<Image className={styles.underLine} src={underLine}></Image>):""
        }
      </View>
      <View 
        className={`${styles.button} ${styles.flexRow}`}
        onClick={() => changeTypeLecture(LectureFun)}
      >
        <View className={typeState === 1?styles.titleSelect:styles.titleSelectOff}>影票</View>
        {
          typeState === 1?(<Image className={styles.underLine} src={underLine}></Image>):""
        }
      </View>
    </View>
  )
}

export default TypeHeader;