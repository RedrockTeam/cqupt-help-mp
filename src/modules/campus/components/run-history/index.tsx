import React from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.scss";

type Props = {
  num: string;
  place: string;
  time: string;
  hasTaken: boolean;
};

const RunHistory = ({ num, place, time, hasTaken }: Props) => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.left}>
        <View className={styles.title}>
          <Text className={styles.num}>{num}</Text>
          <Text className={styles.place}>{place}</Text>
        </View>
        <View className={styles.time}>{time}</View>
      </View>
      <View
        className={`${styles.right} ${hasTaken ? styles.taken : styles.forget}`}
      >
        {hasTaken ? "已领取" : "未领取"}
      </View>
    </View>
  );
};

export default RunHistory;
