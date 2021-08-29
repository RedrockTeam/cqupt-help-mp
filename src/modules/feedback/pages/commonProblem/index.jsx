import { View } from "@tarojs/components";
import {navTo, resolvePage} from "@/common/helpers/utils";
import React from "react";
import NavBack from "@/common/components/nav-back";
import styles from './index.module.scss';


const CommonProblem = () => {

  return (
    <View className={styles.wrap}>
      <NavBack title="常见问题" background="#F6F6F9" />
      <View className={styles.detail}>
        <View className={styles.title}>如何查看我的志愿时长</View>
        <View className={styles.description}>
          点击“发现”界面底部的“志愿服务”，输入志愿者
          账号密码，登陆志愿者账号，即可随时查看志愿
          服务时长与参与过的志愿服务。</View>
      </View>
    </View>
  )
}

export default CommonProblem;
