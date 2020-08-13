import React from "react";
import { View, Text, Button, ITouchEvent } from "@tarojs/components";
import { getString } from "@/common/helpers/utils";
import { timestampToDateString, now } from "@/common/helpers/date";
import styles from "./index.module.scss";

type Props = {
  activityName: string;
  name: string;
  level: number;
  location: string;
  beginTime: number;
  endTime: number;
  organizer: string;
  isReceived: number;
  apply: (event: ITouchEvent) => unknown;
};

const Reward = ({
  level,
  name,
  organizer,
  activityName,
  location,
  isReceived,
  beginTime,
  endTime,
  apply,
}: Props) => {
  const renderBtn = () => {
    if (now() > endTime)
      return (
        <Button disabled className={`${styles.btn} ${styles.btn_disabled}`}>
          已过期
        </Button>
      );
    if (isReceived)
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
        <Text className={styles.organizer}>{getString(organizer)}</Text>
      </View>
      <View className={styles.content}>
        <View className={styles.info}>
          <View className={styles.infoKey}>参与活动：</View>
          <View className={styles.infoValue}>{activityName}</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoKey}>领取地点：</View>
          <View className={styles.infoValue}>{location}</View>
        </View>
        <View className={styles.info}>
          <View className={styles.infoKey}>领取时间：</View>
          <View className={styles.infoValue}>
            {timestampToDateString(beginTime)} -{" "}
            {timestampToDateString(endTime)}
          </View>
        </View>
      </View>
      <View className={styles.btnWrapper}>{renderBtn()}</View>
    </View>
  );
};

export default Reward;
