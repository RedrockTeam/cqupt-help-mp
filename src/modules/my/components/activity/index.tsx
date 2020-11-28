import React from "react";
import { View, Text } from "@tarojs/components";
import { now, timestampToDateString } from "@/common/helpers/date";
import styles from "./index.module.scss";

type Props = {
  name: string;
  teamName: string;
  timeDone: number;
  time: string;
  myregistration: number;
};

const Activity = ({
  time,
  name,
  teamName,
  timeDone,
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
          {now() > timeDone ? (
            <Text className={styles.passed}>已结束</Text>
          ) : (
            <Text className={styles.doing}>进行中</Text>
          )}
        </View>
        <Text className={styles.info}>
          活动组织：
          {teamName}
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
