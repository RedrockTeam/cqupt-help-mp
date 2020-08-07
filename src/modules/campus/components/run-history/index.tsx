import React from "react";
import { View, Text } from "@tarojs/components";
import { plates } from "@/common/constants";
import { ToDateString } from "@/common/helpers/date";
import Loading from "@/common/components/loading";
import styles from "./index.module.scss";

type Props = {
  ID: number;
  SaveTime: string;
  TakeTime: string;
  Location: string;
  StuNum: number;
  StuName: string;
  SportTime: number;
};

const RunHistory = ({ ID, Location, TakeTime }: Props) => {
  return (
    <View className={styles.wrapper}>
      <View className={styles.left}>
        <View className={styles.title}>
          <Text className={styles.num}>
            {Location}
            {ID}
          </Text>
          <Text className={styles.place}>
            {plates[Location]} {ID}号点
          </Text>
        </View>
        <View className={styles.time}>{ToDateString(TakeTime)}取</View>
      </View>
      {/* 后端没做 */}
      {/* <View className={`${styles.right} ${styles.taken}`}>已领取</View> */}
    </View>
  );
};

export default RunHistory;
