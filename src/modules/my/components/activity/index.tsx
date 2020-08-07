/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
import { View, Text } from "@tarojs/components";
import { now, timestampToDateString } from "@/common/helpers/date";
import styles from "./index.module.scss";

type Props = {
  id: number;
  name: string;
  team_name: string;
  time_done: number;
  time: string;
  introduction: string;
  location: string;
  rule: string;
  registration: string;
  myregistration: number;
  type: number;
  image: string;
};

const Activity = ({
  time,
  name,
  team_name,
  time_done,
  myregistration,
}: Props) => {
  const [mounth, date] = timestampToDateString(myregistration)
    .split(".")
    .slice(1);

  return (
    <View className={styles.wrapper}>
      <View className={styles.left}>
        <Text className={styles.big}>{date}</Text>
        <Text className={styles.small}>{mounth}</Text>
      </View>
      <View className={styles.right}>
        <View className={styles.header}>
          <Text>{name}</Text>
          {now() > time_done ? (
            <Text className={styles.passed}>已结束</Text>
          ) : (
            <Text className={styles.doing}>进行中</Text>
          )}
        </View>
        <Text className={styles.info}>
          活动组织：
          {team_name}
        </Text>
        <Text className={styles.info}>
          活动时间：
          {time}
        </Text>
      </View>
    </View>
  );
};

export default Activity;
