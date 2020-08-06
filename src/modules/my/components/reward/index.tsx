/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { View, Text, Button, ITouchEvent } from "@tarojs/components";
import { timestampToDateString, now } from "@/common/helpers/date";
import styles from "./index.module.scss";

type Props = {
  activity_name: string;
  name: string;
  level: number;
  location: string;
  time_begin: number;
  time_end: number;
  organizers: string;
  activity_id: number;
  is_received: number;
  index: number;
  apply: (event: ITouchEvent) => unknown;
};

const Reward = ({
  level,
  name,
  organizers,
  activity_name,
  location,
  is_received,
  time_begin,
  time_end,
  apply,
}: Props) => {
  const renderBtn = () => {
    if (now() > time_end)
      return (
        <Button disabled className={`${styles.btn} ${styles.btn_disabled}`}>
          已过期
        </Button>
      );
    if (is_received)
      return (
        <Button className={`${styles.btn} ${styles.btn_disabled}`}>
          已领取
        </Button>
      );
    return (
      <Button className={styles.btn} onClick={apply}>
        领取奖品
      </Button>
    );
  };

  return (
    <View className={styles.wrapper}>
      <View className={styles.header}>
        <Text className={styles.title}>
          {level}等奖：{name}
        </Text>
        <Text className={styles.organizer}>{organizers}</Text>
      </View>
      <View className={styles.content}>
        <View className={styles.info}>
          <View className={styles.infoKey}>参与活动：</View>
          <View className={styles.infoValue}>{activity_name}</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoKey}>领取地点：</View>
          <View className={styles.infoValue}>{location}</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoKey}>领取时间：</View>
          <View className={styles.infoValue}>
            {timestampToDateString(time_begin)} -{" "}
            {timestampToDateString(time_end)}
          </View>
        </View>
      </View>
      <View className={styles.btnWrapper}>{renderBtn()}</View>
    </View>
  );
};

export default Reward;
