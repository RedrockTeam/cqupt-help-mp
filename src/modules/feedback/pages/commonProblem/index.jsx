import { View } from "@tarojs/components";
import {navTo, resolvePage} from "@/common/helpers/utils";
import React from "react";
import NavBack from "@/common/components/nav-back";
import Taro from "@tarojs/taro";
import styles from './index.module.scss';


const CommonProblem = () => {

  const $instance = Taro.getCurrentInstance();
  const { content, title } = $instance.router.params;
  return (
    <View className={styles.wrap}>
      <NavBack title="常见问题" background="#F6F6F9" />
      <View className={styles.detail}>
        <View className={styles.title}>{title}</View>
        <View className={styles.description}>{content}</View>
      </View>
    </View>
  )
}

export default CommonProblem;
