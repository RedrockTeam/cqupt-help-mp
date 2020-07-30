import React from "react";
import { View, Image, Text } from "@tarojs/components";
import emptyImg from "@/static/images/empty.png";
import PrimaryButton from "@/common/components/primary-button";
import styles from "./index.module.scss";

const Apply = () => {
  return (
    <View className={styles.emptyWrapper}>
      <Image src={emptyImg} className={styles.img} />
      <Text className={styles.text}>证件空空如也哦~</Text>
      <Text className={styles.text}>快去申请新的会员证吧</Text>
      <PrimaryButton className={styles.btn}>申请证件</PrimaryButton>
    </View>
  );
};

export default Apply;
