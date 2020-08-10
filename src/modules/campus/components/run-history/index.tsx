import React from "react";
import { View, Text } from "@tarojs/components";
import { plates } from "@/common/constants";
import { timestampToTimeString } from "@/common/helpers/date";
import dayjs from "dayjs";
import styles from "./index.module.scss";

type Props = {
  num: number;
  takeTime: number;
  location: string;
};

const RunHistory = ({ num, location, takeTime }: Props) => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.left}>
        <View className={styles.title}>
          <Text className={styles.num}>
            {location}
            {num}
          </Text>
          <Text className={styles.place}>
            {plates[location]} {num}号点
          </Text>
        </View>
        <View className={styles.time}>
          {timestampToTimeString(takeTime)} 取
        </View>
      </View>
      {/* 后端没做 */}
      {/* <View className={`${styles.right} ${styles.taken}`}>已领取</View> */}
    </View>
  );
};

export default RunHistory;
