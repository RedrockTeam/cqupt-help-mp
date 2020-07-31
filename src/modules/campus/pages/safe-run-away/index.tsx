import React from "react";
import { View, Image } from "@tarojs/components";
import PrimaryButton from "@/common/components/primary-button";
import clockIcon from "@/static/images/clock-icon.png";
import locateIcon from "@/static/images/locate-icon.png";
import connectIcon from "@/static/images/connect-icon.png";
import NavBack from "@/common/components/nav-back";
import { showActionSheet } from "@tarojs/taro";
import styles from "./index.module.scss";

const SafeRunAway = () => {
  const handleTakeBag = async () => {
    const res = await showActionSheet({
      itemList: ["确定"],
      fail(e) {
        console.log(e);
      },
    });
    if (res.tapIndex === 0) {
      // TODO: request
    }
  };
  return (
    <View className={styles.wrapper}>
      <NavBack title="天天护跑" background="#F6F6F9" />
      <View className={styles.top}>
        <View className={styles.num}>B97</View>
        <View className={styles.tip}>请务必在 9 点 30 前取出</View>
        <Image src={connectIcon} className={styles.left} />
        <Image src={connectIcon} className={styles.right} />
      </View>
      <View className={styles.bottom}>
        <View className={styles.text}>
          <Image mode="aspectFit" src={clockIcon} className={styles.icon} />
          风华操场一号点
        </View>
        <View className={styles.text}>
          <Image mode="aspectFit" src={locateIcon} className={styles.icon} />
          2020-06-17 17:30 存
        </View>
      </View>
      <PrimaryButton className={styles.btn} onClick={handleTakeBag}>
        取包
      </PrimaryButton>
    </View>
  );
};

export default SafeRunAway;
